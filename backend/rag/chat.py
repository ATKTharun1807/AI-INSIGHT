import os
from typing import List, Dict, Any, Optional
from langchain_ollama import OllamaLLM, ChatOllama
from dotenv import load_dotenv

from .vectorstore import get_or_create_vector_store
from .prompt import PROMPT_TEMPLATE

load_dotenv()

_cached_llm = None

def get_ollama_llm():
    try:
        return ChatOllama(model="llama3.2", temperature=0)
    except Exception:
        return OllamaLLM(model="llama3.2", temperature=0)

def get_llm():
    """
    Returns configured LLM instance. Tries ChatOpenAI if OPENAI_API_KEY is valid and active,
    immediately defaulting to local ChatOllama/OllamaLLM (llama3.2) if quota is exceeded.
    """
    global _cached_llm
    if _cached_llm is not None:
        return _cached_llm

    ollama_fallback = get_ollama_llm()

    api_key = os.getenv("OPENAI_API_KEY")
    if api_key and api_key.startswith("sk-"):
        try:
            from langchain_openai import ChatOpenAI
            openai_llm = ChatOpenAI(model="gpt-4o-mini", temperature=0, max_retries=0, request_timeout=3.0)
            openai_llm.invoke("hi")
            _cached_llm = openai_llm.with_fallbacks([ollama_fallback])
            return _cached_llm
        except Exception:
            _cached_llm = ollama_fallback
            return _cached_llm

    _cached_llm = ollama_fallback
    return _cached_llm

def rag_analyze_document(
    dataset_id: int,
    file_path: str,
    query: str,
    chat_history: Optional[List[Dict[str, str]]] = None
) -> Dict[str, Any]:
    """
    Executes fast RAG query workflow: Top similarity retrieval, concise context formatting, citation extraction, and rapid LLM synthesis.
    """
    try:
        vector_store = get_or_create_vector_store(dataset_id, file_path)

        # Determine query type (summary/analysis vs specific lookup)
        lower_query = query.lower()
        is_summary_query = any(w in lower_query for w in ["summary", "summarize", "overview", "book", "main topic", "theme", "explain", "chapter", "analyze"])
        target_k = 4 if is_summary_query else 2

        # Use Max Marginal Relevance (MMR) search for diverse passage retrieval across the document
        try:
            retrieved_docs = vector_store.max_marginal_relevance_search(query, k=target_k, fetch_k=target_k * 3)
        except Exception:
            retrieved_docs = vector_store.similarity_search(query, k=target_k)

        context_blocks = []
        sources_list = []

        for idx, doc in enumerate(retrieved_docs):
            meta = doc.metadata
            source_tag = ""
            if "page" in meta:
                source_tag = f"[Page {meta['page']}]"
            elif "slide" in meta:
                source_tag = f"[Slide {meta['slide']}]"
            elif "rows" in meta:
                source_tag = f"[Rows {meta['rows']}]"
            elif "section" in meta:
                source_tag = f"[{meta['section']}]"

            chunk_content = doc.page_content[:1500]
            context_blocks.append(f"--- Chunk {idx+1} {source_tag} ---\n{chunk_content}")
            sources_list.append({
                "chunk": idx + 1,
                "source_tag": source_tag,
                "page": meta.get("page") or meta.get("slide") or meta.get("rows") or meta.get("section"),
                "snippet": chunk_content[:150] + "..."
            })

        formatted_context = "\n\n".join(context_blocks)

        history_str = ""
        if chat_history and len(chat_history) > 0:
            formatted_history = []
            for msg in chat_history[-4:]:
                sender = "User" if msg.get("sender") == "user" else "Assistant"
                formatted_history.append(f"{sender}: {msg.get('text', '')}")
            history_str = "Previous Conversation History:\n" + "\n".join(formatted_history)

        llm = get_llm()
        chain = PROMPT_TEMPLATE | llm

        try:
            raw_response = chain.invoke({
                "context": formatted_context,
                "history_context": history_str,
                "question": query
            })
        except Exception:
            ollama_llm = get_ollama_llm()
            fallback_chain = PROMPT_TEMPLATE | ollama_llm
            raw_response = fallback_chain.invoke({
                "context": formatted_context,
                "history_context": history_str,
                "question": query
            })

        raw_answer = raw_response.content if hasattr(raw_response, 'content') else str(raw_response)

        return {
            "answer": raw_answer,
            "sources": sources_list
        }

    except Exception as e:
        return {
            "answer": f"Error running RAG analysis: {str(e)}",
            "sources": []
        }
