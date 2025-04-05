from fastapi import FastAPI
from app.database import engine, Base
from app.auth import router as auth_router
from app.info import router as info_router
from app.tasks import router as tasks_router
from app.admin import router as admin_router

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(auth_router, prefix="/auth", tags=["auth"])
app.include_router(info_router, prefix="/info", tags=["info"])
app.include_router(tasks_router, prefix="/tasks", tags=["tasks"])
app.include_router(admin_router, prefix="/admin", tags=["admin"])