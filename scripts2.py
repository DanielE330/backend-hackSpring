from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

app = FastAPI()

# Модель данных для статьи
class Article(BaseModel):
    id: int
    title: str
    image: Optional[str] = None
    content: str
    date: str
    editor: str

# Модель данных для создания/обновления статьи
class ArticleCreate(BaseModel):
    title: str
    image: Optional[str] = None
    content: str

# Временное хранилище данных (в реальном проекте используйте базу данных)
articles_db = []
history_db = []

# Получить все статьи
@app.get("/articles", response_model=List[Article])
async def get_articles():
    return articles_db

# Получить статью по ID
@app.get("/articles/{article_id}", response_model=Article)
async def get_article(article_id: int):
    article = next((a for a in articles_db if a.id == article_id), None)
    if not article:
        raise HTTPException(status_code=404, detail="Статья не найдена")
    return article

# Создать новую статью
@app.post("/articles", response_model=Article)
async def create_article(article: ArticleCreate):
    new_id = len(articles_db) + 1
    new_article = Article(
        id=new_id,
        title=article.title,
        image=article.image,
        content=article.content,
        date=datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        editor="Пользователь"  # В реальном проекте используйте аутентификацию
    )
    articles_db.append(new_article)
    history_db.append({
        "date": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "user": "Пользователь",
        "title": article.title,
        "event": "Создание"
    })
    return new_article

# Обновить существующую статью
@app.put("/articles/{article_id}", response_model=Article)
async def update_article(article_id: int, article_data: ArticleCreate):
    article = next((a for a in articles_db if a.id == article_id), None)
    if not article:
        raise HTTPException(status_code=404, detail="Статья не найдена")
    
    article.title = article_data.title
    article.image = article_data.image
    article.content = article_data.content
    article.date = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    history_db.append({
        "date": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "user": "Пользователь",
        "title": article.title,
        "event": "Изменение"
    })
    return article

# Удалить статью
@app.delete("/articles/{article_id}", response_model=dict)
async def delete_article(article_id: int):
    global articles_db
    article = next((a for a in articles_db if a.id == article_id), None)
    if not article:
        raise HTTPException(status_code=404, detail="Статья не найдена")
    
    articles_db = [a for a in articles_db if a.id != article_id]

    history_db.append({
        "date": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "user": "Пользователь",
        "title": article.title,
        "event": "Удаление"
    })
    return {"message": "Статья успешно удалена"}

# Получить историю изменений
@app.get("/history", response_model=List[dict])
async def get_history():
    return history_db