from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Dict

app = FastAPI()

# Временное хранилище данных пользователей (в реальном проекте используйте базу данных)
users_db: Dict[str, dict] = {}

# Модели данных для валидации
class UserRegistration(BaseModel):
    username: str
    full_name: str
    password: str
    confirm_password: str

class UserLogin(BaseModel):
    username: str
    password: str

@app.post("/register", response_model=dict)
async def register(user: UserRegistration):
    # Проверка данных
    if user.password != user.confirm_password:
        raise HTTPException(status_code=400, detail="Пароли не совпадают")

    if user.username in users_db:
        raise HTTPException(status_code=400, detail="Пользователь с таким логином уже существует")

    # Сохранение пользователя
    users_db[user.username] = {
        "full_name": user.full_name,
        "password": user.password  # В реальном проекте храните хешированный пароль
    }

    return {"message": "Регистрация успешна"}

@app.post("/login", response_model=dict)
async def login(user: UserLogin):
    # Проверка данных
    stored_user = users_db.get(user.username)

    if not stored_user or stored_user["password"] != user.password:
        raise HTTPException(status_code=401, detail="Неверный логин или пароль")

    return {"message": "Вход выполнен успешно"}