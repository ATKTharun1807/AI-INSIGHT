from typing import List, Dict, Any, Optional
from rag.chat import rag_analyze_document

def execute_document_rag(
    dataset_id: int,
    file_path: str,
    query: str,
    chat_history: Optional[List[Dict[str, str]]] = None
) -> Dict[str, Any]:
    """
    Document RAG Specialized Agent: Performs FAISS vector similarity retrieval over document chunks and page metadata.
    """
    result = rag_analyze_document(dataset_id, file_path, query, chat_history)
    result["agent_used"] = "Document RAG Agent"
    return result
