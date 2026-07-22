from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import List, Optional, Dict, Any

class UserBase(BaseModel):
    name: str
    email: EmailStr

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class DatasetResponse(BaseModel):
    id: int
    file_name: str
    row_count: int
    column_count: int
    upload_date: datetime

    class Config:
        from_attributes = True

class ChatMessage(BaseModel):
    sender: str
    text: str

class QueryRequest(BaseModel):
    dataset_id: int
    query: str
    chat_history: Optional[List[ChatMessage]] = []

class QueryResponse(BaseModel):
    answer: str
    sources: Optional[List[Dict[str, Any]]] = []
    agent_used: Optional[str] = "NEXUS Brain"
    execution_plan: Optional[str] = None
