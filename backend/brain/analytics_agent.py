from typing import List, Dict, Any, Optional
from rag.vectorstore import get_or_create_vector_store
from rag.prompt import PROMPT_TEMPLATE
from rag.chat import get_llm

def execute_analytics_and_predictions(
    dataset_id: int,
    file_path: str,
    query: str,
    chat_history: Optional[List[Dict[str, str]]] = None
) -> Dict[str, Any]:
    """
    Analytics & ATS Predictor Specialized Agent: Computes ATS scoring, evaluations, strengths/weaknesses, and tabular predictions.
    """
    try:
        vector_store = get_or_create_vector_store(dataset_id, file_path)
        lower_query = query.lower()
        is_summary = any(w in lower_query for w in ["summary", "overview", "score", "evaluate", "ats", "predict", "book", "analyze"])
        target_k = 8 if is_summary else 6

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

            chunk_content = doc.page_content[:3000]
            context_blocks.append(f"--- Document Section {idx+1} {source_tag} ---\n{chunk_content}")
            sources_list.append({
                "chunk": idx + 1,
                "source_tag": source_tag,
                "page": meta.get("page") or meta.get("slide") or meta.get("rows") or meta.get("section"),
                "snippet": doc.page_content[:150] + "..."
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
                "question": f"Perform a comprehensive prediction and analysis: {query}"
            })
        except Exception:
            from rag.chat import get_ollama_llm
            ollama_llm = get_ollama_llm()
            fallback_chain = PROMPT_TEMPLATE | ollama_llm
            raw_response = fallback_chain.invoke({
                "context": formatted_context,
                "history_context": history_str,
                "question": f"Perform a comprehensive prediction and analysis: {query}"
            })

        raw_answer = raw_response.content if hasattr(raw_response, 'content') else str(raw_response)

        return {
            "answer": raw_answer,
            "sources": sources_list,
            "agent_used": "Analytics & ATS Predictor Agent"
        }

    except Exception as e:
        return {
            "answer": f"Error in Analytics Agent: {str(e)}",
            "sources": [],
            "agent_used": "Analytics & ATS Predictor Agent"
        }
