from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

import models
import schemas
from database import get_db
from routers.auth import get_current_user
from brain.master_brain import process_user_request

router = APIRouter(prefix="/analysis", tags=["analysis"])

@router.post("/query", response_model=schemas.QueryResponse)
def query_dataset(
    req: schemas.QueryRequest,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    dataset = db.query(models.Dataset).filter(
        models.Dataset.id == req.dataset_id,
        models.Dataset.user_id == current_user.id
    ).first()
    
    if not dataset:
        raise HTTPException(status_code=404, detail="Dataset not found")
        
    try:
        # Convert Pydantic chat history models to plain dicts if provided
        history_list = [msg.model_dump() for msg in req.chat_history] if req.chat_history else []
        
        result = process_user_request(
            dataset_id=dataset.id,
            file_path=dataset.file_path,
            query=req.query,
            chat_history=history_list
        )
        return result
    except HTTPException as he:
        raise he
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error analyzing dataset: {str(e)}")
