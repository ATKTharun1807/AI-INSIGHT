import re

class IntentType:
    DOCUMENT_RAG = "DOCUMENT_RAG"
    PREDICTIVE_ANALYSIS = "PREDICTIVE_ANALYSIS"
    DATASET_OVERVIEW = "DATASET_OVERVIEW"
    GENERAL_KNOWLEDGE = "GENERAL_KNOWLEDGE"

def classify_intent(query: str) -> str:
    """
    Classifies the user query intent to route to the appropriate NEXUS Brain specialized agent.
    """
    lower_query = query.lower()

    # Predictive analysis & ATS Scoring intent patterns
    predictive_keywords = [
        "predict", "ats", "score", "evaluate", "rate", "resume score",
        "calculate", "percentage", "ranking", "assessment", "recommendation",
        "match score", "strengths", "weaknesses", "improve"
    ]
    if any(keyword in lower_query for keyword in predictive_keywords):
        return IntentType.PREDICTIVE_ANALYSIS

    # Dataset metadata / summary intent patterns
    dataset_keywords = [
        "dataset summary", "how many rows", "columns", "structure",
        "file details", "data overview", "headers"
    ]
    if any(keyword in lower_query for keyword in dataset_keywords):
        return IntentType.DATASET_OVERVIEW

    # General off-document questions
    general_greetings = ["hello", "hi", "who are you", "what can you do", "help"]
    if lower_query in general_greetings:
        return IntentType.GENERAL_KNOWLEDGE

    # Default to Document RAG search
    return IntentType.DOCUMENT_RAG
