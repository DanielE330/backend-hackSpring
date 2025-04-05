from pydantic import BaseModel
from datetime import datetime

class UserCreate(BaseModel):
    username: str
    password: str

class UserLogin(BaseModel):
    username: str
    password: str

class UserResponse(BaseModel):
    id: int
    username: str

    class Config:
        orm_mode = True

class ArticleCreate(BaseModel):
    title: str
    content: str

class ArticleResponse(BaseModel):
    id: int
    title: str
    content: str
    created_at: datetime

    class Config:
        orm_mode = True

class TaskCreate(BaseModel):
    title: str
    description: str
    due_date: datetime
    assigned_to: int

class TaskResponse(BaseModel):
    id: int
    title: str
    description: str
    due_date: datetime
    assigned_to: int
    completed: bool

    class Config:
        orm_mode = True