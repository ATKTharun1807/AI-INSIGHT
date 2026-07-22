from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File, BackgroundTasks
from sqlalchemy.orm import Session
from typing import List
import os
import pandas as pd
import uuid

import models, schemas
from database import get_db
from routers.auth import get_current_user
from agent.chat_agent import get_or_create_vector_store

router = APIRouter(prefix="/datasets", tags=["datasets"])

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/upload", response_model=schemas.DatasetResponse)
async def upload_dataset(
    background_tasks: BackgroundTasks,
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    if not file.filename.endswith(('.csv', '.xlsx', '.pdf', '.pptx')):
        raise HTTPException(status_code=400, detail="Only CSV, Excel, PDF, and PPTX files are supported")
    
    file_ext = os.path.splitext(file.filename)[1]
    unique_filename = f"{uuid.uuid4()}{file_ext}"
    file_path = os.path.join(UPLOAD_DIR, unique_filename)
    
    with open(file_path, "wb") as f:
        content = await file.read()
        f.write(content)
        
    try:
        if file_ext == '.csv':
            df = pd.read_csv(file_path)
            row_count, column_count = df.shape
        elif file_ext == '.xlsx':
            df = pd.read_excel(file_path)
            row_count, column_count = df.shape
        else:
            row_count, column_count = 0, 0
    except Exception as e:
        if os.path.exists(file_path):
            os.remove(file_path)
        raise HTTPException(status_code=400, detail=f"Error processing file: {str(e)}")
        
    dataset = models.Dataset(
        user_id=current_user.id,
        file_name=file.filename,
        file_path=file_path,
        row_count=row_count,
        column_count=column_count
    )
    
    db.add(dataset)
    db.commit()
    db.refresh(dataset)
    
    # Pre-index vector store in background
    background_tasks.add_task(get_or_create_vector_store, dataset.id, dataset.file_path)
    
    return dataset

@router.get("/", response_model=List[schemas.DatasetResponse])
def get_datasets(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    return db.query(models.Dataset).filter(models.Dataset.user_id == current_user.id).all()
