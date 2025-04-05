from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models import Article
from app.schemas import ArticleCreate, ArticleResponse

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/articles", response_model=ArticleResponse)
def create_article(article: ArticleCreate, db: Session = Depends(get_db)):
    new_article = Article(title=article.title, content=article.content)
    db.add(new_article)
    db.commit()
    db.refresh(new_article)
    return new_article

@router.get("/articles", response_model=list[ArticleResponse])
def read_articles(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    articles = db.query(Article).offset(skip).limit(limit).all()
    return articles
