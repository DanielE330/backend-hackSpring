from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Dict, Optional
from datetime import datetime

app = FastAPI()

# Модель данных для пользователя
class User(BaseModel):
    username: str
    full_name: str
    password: str
    registration_date: str

# Модель данных для входа
class LoginData(BaseModel):
    username: str
    password: str

# Модель данных для регистрации
class RegisterData(BaseModel):
    username: str
    full_name: str
    password: str
    confirm_password: str

# Временное хранилище данных (в реальном проекте используйте базу данных)
users_db: Dict[str, User] = {}

# Роут для входа
@app.post("/login")
async def login(data: LoginData):
    user = users_db.get(data.username)
    if not user or user.password != data.password:
        raise HTTPException(status_code=401, detail="Неверный логин или пароль")
    return {"message": f"Вход выполнен как {data.username}"}

# Роут для регистрации
@app.post("/register")
async def register(data: RegisterData):
    if data.password != data.confirm_password:
        raise HTTPException(status_code=400, detail="Пароли не совпадают")
    
    if data.username in users_db:
        raise HTTPException(status_code=400, detail="Пользователь с таким логином уже существует")
    
    # Сохраняем пользователя
    new_user = User(
        username=data.username,
        full_name=data.full_name,
        password=data.password,
        registration_date=datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    )
    users_db[data.username] = new_user
    
    return {"message": f"Регистрация успешна для {data.username}"}