from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

app = FastAPI()

# Модель данных для пользователя
class User(BaseModel):
    id: int
    login: str
    full_name: str
    role: str
    registration_date: str

# Модель данных для запроса поиска
class UserSearch(BaseModel):
    login: Optional[str] = None
    full_name: Optional[str] = None
    role: Optional[str] = None
    registration_date: Optional[str] = None

# Временное хранилище данных (в реальном проекте используйте базу данных)
users_db = [
    {"id": 1, "login": "admin", "full_name": "Администратор Системы", "role": "administrator", "registration_date": "2023-01-01"},
    {"id": 2, "login": "user1", "full_name": "Иван Иванов", "role": "user", "registration_date": "2023-02-15"},
    {"id": 3, "login": "user2", "full_name": "Михайлов Роман", "role": "user", "registration_date": "2023-03-20"},
]

# Преобразуем данные в формат модели User
users_db = [User(**user) for user in users_db]

# Роут для поиска пользователей
@app.post("/search-users", response_model=List[User])
async def search_users(search_params: UserSearch):
    filtered_users = users_db

    if search_params.login:
        filtered_users = [user for user in filtered_users if search_params.login.lower() in user.login.lower()]
    
    if search_params.full_name:
        filtered_users = [user for user in filtered_users if search_params.full_name.lower() in user.full_name.lower()]
    
    if search_params.role:
        filtered_users = [user for user in filtered_users if user.role == search_params.role]
    
    if search_params.registration_date:
        filtered_users = [user for user in filtered_users if user.registration_date == search_params.registration_date]

    return filtered_users