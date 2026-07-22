from typing import List, Dict, Any, Optional
from .intent import classify_intent, IntentType
from .document_agent import execute_document_rag
from .analytics_agent import execute_analytics_and_predictions

def process_user_request(
    dataset_id: int,
    file_path: str,
    query: str,
    chat_history: Optional[List[Dict[str, str]]] = None
) -> Dict[str, Any]:
    """
    NEXUS Brain Master AI Agent Orchestrator:
    1. Analyzes user intent
    2. Constructs an execution plan
    3. Routes the request to specialized AI agents
    4. Synthesizes and returns the final answer with agent metadata.
    """
    intent = classify_intent(query)

    if intent == IntentType.PREDICTIVE_ANALYSIS:
        result = execute_analytics_and_predictions(dataset_id, file_path, query, chat_history)
        result["execution_plan"] = "NEXUS Brain -> Analytics & ATS Predictor Agent -> Result Synthesis"
        return result

    elif intent == IntentType.GENERAL_KNOWLEDGE:
        return {
            "answer": "Hello! I am **NEXUS Brain**, your Master AI Agent. I control document analysis, vector RAG search, tabular analytics, and ATS resume score predictions for your files. How can I assist you with your document today?",
            "sources": [],
            "agent_used": "NEXUS Brain Assistant",
            "execution_plan": "NEXUS Brain -> General Assistant"
        }

    else:
        # Default: Route to Document RAG Agent
        result = execute_document_rag(dataset_id, file_path, query, chat_history)
        result["execution_plan"] = "NEXUS Brain -> Document RAG Agent -> FAISS Vector Store -> Context Grounding"
        return result
