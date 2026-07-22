import os
from typing import Optional
from langchain_community.vectorstores import FAISS
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_core.documents import Document

from .loader import extract_documents_from_file
from .embeddings import get_embeddings_engine

VECTOR_STORE_DIR = os.path.join(os.path.dirname(__file__), "..", "vector_stores")
os.makedirs(VECTOR_STORE_DIR, exist_ok=True)

def get_or_create_vector_store(dataset_id: int, file_path: str) -> FAISS:
    """
    Creates or loads a persistent FAISS vector store for a given dataset using high quality embeddings.
    Checks for an existing index on disk before chunking to accelerate retrieval.
    """
    dataset_store_path = os.path.join(VECTOR_STORE_DIR, f"dataset_{dataset_id}")
    embeddings = get_embeddings_engine()

    if os.path.exists(dataset_store_path):
        try:
            vs = FAISS.load_local(
                dataset_store_path,
                embeddings,
                allow_dangerous_deserialization=True
            )
            # Verify embedding dimension compatibility
            vs.similarity_search("test", k=1)
            return vs
        except Exception:
            pass

    raw_docs = extract_documents_from_file(file_path)
    if not raw_docs:
        raw_docs = [Document(page_content="Empty document", metadata={"source": os.path.basename(file_path)})]

    # Split into optimal text chunks for deep book & document analysis
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1200, chunk_overlap=200)
    chunked_docs = text_splitter.split_documents(raw_docs)

    # Build and persist FAISS index locally
    vector_store = FAISS.from_documents(chunked_docs, embeddings)
    vector_store.save_local(dataset_store_path)
    return vector_store
