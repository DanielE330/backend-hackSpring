document.addEventListener('DOMContentLoaded', () => {
  const articles = [];
  const history = [];

  const articlesGrid = document.getElementById('articlesGrid');
  const createArticleBtn = document.getElementById('createArticleBtn');
  const articleModal = new bootstrap.Modal(document.getElementById('articleModal'));
  const articleForm = document.getElementById('articleForm');
  const saveArticleBtn = document.getElementById('saveArticleBtn');
  const historyModal = new bootstrap.Modal(document.getElementById('historyModal'));
  const historyBody = document.getElementById('historyBody');

  let currentArticleIndex = null;

  // Функция для отображения статей
  function renderArticles() {
    articlesGrid.innerHTML = '';
    articles.forEach((article, index) => {
      const card = `
        <div class="col-md-4 mb-4">
          <div class="card article-card" data-index="${index}" oncontextmenu="openContextMenu(event, ${index})">
            <img src="${article.image || 'https://via.placeholder.com/300'}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${article.title}</h5>
              <p class="card-text"><small class="text-muted">Создано: ${article.date}, Редактор: ${article.editor}</small></p>
            </div>
          </div>
        </div>
      `;
      articlesGrid.innerHTML += card;
    });

    // Добавление обработчиков кликов на плитки
    document.querySelectorAll('.article-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (!e.target.closest('.dropdown-menu')) {
          const index = card.dataset.index;
          viewArticle(index);
        }
      });
    });
  }

  // Функция для просмотра статьи
  function viewArticle(index) {
    const article = articles[index];
    alert(`Содержимое статьи:\n\n${article.content}`);
  }

  // Функция для открытия контекстного меню
  window.openContextMenu = (event, index) => {
    event.preventDefault();
    const menu = `
      <div class="dropdown-menu show" style="position: absolute; top: ${event.clientY}px; left: ${event.clientX}px;">
        <a class="dropdown-item" href="#" onclick="editArticle(${index})">Редактировать</a>
        <a class="dropdown-item" href="#" onclick="deleteArticle(${index})">Удалить</a>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', menu);

    // Закрытие меню при клике вне его
    document.addEventListener('click', () => {
      document.querySelector('.dropdown-menu.show')?.remove();
    }, { once: true });
  };

  // Функция для создания новой статьи
  createArticleBtn.addEventListener('click', () => {
    currentArticleIndex = null;
    articleForm.reset();
    articleModal.show();
  });

  // Функция для сохранения статьи
  saveArticleBtn.addEventListener('click', () => {
    const title = document.getElementById('articleTitle').value;
    const image = document.getElementById('articleImage').value;
    const content = document.getElementById('articleContent').value;

    if (!title) {
      alert('Введите название статьи!');
      return;
    }

    if (currentArticleIndex !== null) {
      articles[currentArticleIndex] = { title, image, content, date: new Date().toLocaleDateString(), editor: 'Пользователь' };
      history.push({ date: new Date().toLocaleString(), user: 'Пользователь', title, event: 'Изменение' });
    } else {
      articles.push({ title, image, content, date: new Date().toLocaleDateString(), editor: 'Пользователь' });
      history.push({ date: new Date().toLocaleString(), user: 'Пользователь', title, event: 'Создание' });
    }

    articleModal.hide();
    renderArticles();
  });

  // Функция для редактирования статьи
  window.editArticle = (index) => {
    const article = articles[index];
    document.getElementById('articleTitle').value = article.title;
    document.getElementById('articleImage').value = article.image;
    document.getElementById('articleContent').value = article.content;
    currentArticleIndex = index;
    articleModal.show();
  };

  // Функция для удаления статьи
  window.deleteArticle = (index) => {
    if (confirm('Вы уверены, что хотите удалить статью?')) {
      articles.splice(index, 1);
      history.push({ date: new Date().toLocaleString(), user: 'Пользователь', title: articles[index]?.title || '', event: 'Удаление' });
      renderArticles();
    }
  };

  // Функция для просмотра истории
  document.querySelector('.nav-link[href="#"]').addEventListener('click', (e) => {
    e.preventDefault();
    historyBody.innerHTML = '';
    history.forEach(item => {
      historyBody.innerHTML += `
        <div class="history-item">
          <strong>${item.date}</strong>: ${item.user} - ${item.title} (${item.event})
        </div>
      `;
    });
    historyModal.show();
  });

  // Инициализация
  renderArticles();
});
document.addEventListener('DOMContentLoaded', () => {
  const articleModal = new bootstrap.Modal(document.getElementById('articleModal'));

  // Обработчик кнопки "Создать статью"
  document.getElementById('createArticleBtn').addEventListener('click', () => {
    // Сброс формы
    document.getElementById('articleForm').reset();
    // Открытие модального окна
    articleModal.show();
  });

  // Дополнительно: Обработчик кнопки "Сохранить" в модальном окне
  document.getElementById('saveArticleBtn').addEventListener('click', () => {
    const title = document.getElementById('articleTitle').value;
    const image = document.getElementById('articleImage').value;
    const content = document.getElementById('articleContent').value;

    if (!title) {
      alert('Введите название статьи!');
      return;
    }

    // Логика сохранения статьи (пример)
    console.log('Статья сохранена:', { title, image, content });

    // Закрытие модального окна
    articleModal.hide();
  });
});