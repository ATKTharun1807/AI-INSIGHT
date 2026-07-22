import os
import numpy as np
from typing import List, Optional, Any
from langchain_core.embeddings import Embeddings
from sklearn.feature_extraction.text import TfidfVectorizer
from dotenv import load_dotenv

load_dotenv()

_cached_embeddings_engine = None

class FastLocalEmbeddings(Embeddings):
    """
    Fast, reliable local TF-IDF embedding fallback generator using scikit-learn.
    Operates 100% locally in Python without external server dependencies.
    """
    def __init__(self, max_features: int = 512):
        self.max_features = max_features
        self.vectorizer = TfidfVectorizer(max_features=max_features, stop_words='english')
        self.is_fitted = False

    def fit(self, texts: List[str]):
        if texts:
            self.vectorizer.fit(texts)
            self.is_fitted = True

    def embed_documents(self, texts: List[str]) -> List[List[float]]:
        if not texts:
            return []
        if not self.is_fitted:
            self.fit(texts)
        matrix = self.vectorizer.transform(texts)
        return matrix.toarray().astype(np.float32).tolist()

    def embed_query(self, text: str) -> List[float]:
        if not self.is_fitted:
            self.fit([text])
        matrix = self.vectorizer.transform([text])
        return matrix.toarray().astype(np.float32)[0].tolist()


def get_embeddings_engine(documents: Optional[List[Any]] = None) -> Embeddings:
    """
    Returns cached high-performance embeddings. Uses OpenAIEmbeddings if OPENAI_API_KEY is present,
    otherwise uses BAAI/bge-small-en-v1.5 or FastLocalEmbeddings.
    """
    global _cached_embeddings_engine
    if _cached_embeddings_engine is not None:
        return _cached_embeddings_engine

    api_key = os.getenv("OPENAI_API_KEY")
    if api_key and api_key.startswith("sk-"):
        try:
            from langchain_openai import OpenAIEmbeddings
            embeddings = OpenAIEmbeddings(model="text-embedding-3-small")
            embeddings.embed_query("test")
            _cached_embeddings_engine = embeddings
            return _cached_embeddings_engine
        except Exception:
            pass

    try:
        from langchain_huggingface import HuggingFaceEmbeddings
        _cached_embeddings_engine = HuggingFaceEmbeddings(
            model_name="BAAI/bge-small-en-v1.5",
            model_kwargs={'device': 'cpu'},
            encode_kwargs={'normalize_embeddings': True}
        )
        return _cached_embeddings_engine
    except Exception:
        embeddings = FastLocalEmbeddings()
        if documents:
            texts = [doc.page_content for doc in documents if hasattr(doc, 'page_content') and doc.page_content]
            embeddings.fit(texts)
        _cached_embeddings_engine = embeddings
        return _cached_embeddings_engine
