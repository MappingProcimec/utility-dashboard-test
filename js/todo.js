const STORAGE_KEY = 'utility-dashboard-todos';

function loadTodos() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveTodos(todos) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function generateId() {
  return `todo-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export function initTodo() {
  const form = document.getElementById('todo-form');
  const input = document.getElementById('todo-input');
  const inputError = document.getElementById('todo-input-error');
  const list = document.getElementById('todo-list');
  const emptyMsg = document.getElementById('todo-empty');
  const clearBtn = document.getElementById('todo-clear-completed');

  let todos = loadTodos();

  function render() {
    list.innerHTML = '';
    const hasTodos = todos.length > 0;
    emptyMsg.hidden = hasTodos;
    clearBtn.hidden = !todos.some((t) => t.completed);

    todos.forEach((todo) => {
      const li = document.createElement('li');
      li.className = `todo-item${todo.completed ? ' todo-item--completed' : ''}`;
      li.dataset.id = todo.id;

      li.innerHTML = `
        <input type="checkbox" class="todo-item__checkbox" ${todo.completed ? 'checked' : ''} aria-label="Marcar como completada">
        <span class="todo-item__text">${escapeHtml(todo.text)}</span>
        <button type="button" class="todo-item__delete" aria-label="Eliminar tarea">✕</button>
      `;

      const checkbox = li.querySelector('.todo-item__checkbox');
      const deleteBtn = li.querySelector('.todo-item__delete');

      checkbox.addEventListener('change', () => {
        todo.completed = checkbox.checked;
        saveTodos(todos);
        render();
      });

      deleteBtn.addEventListener('click', () => {
        todos = todos.filter((t) => t.id !== todo.id);
        saveTodos(todos);
        render();
      });

      list.appendChild(li);
    });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    input.classList.remove('input--error');
    inputError.textContent = '';

    const text = input.value.trim();
    if (!text) {
      input.classList.add('input--error');
      inputError.textContent = 'Escribe una tarea antes de agregar.';
      return;
    }
    if (text.length > 200) {
      input.classList.add('input--error');
      inputError.textContent = 'La tarea no puede superar 200 caracteres.';
      return;
    }

    todos.unshift({ id: generateId(), text, completed: false });
    saveTodos(todos);
    input.value = '';
    render();
  });

  clearBtn.addEventListener('click', () => {
    todos = todos.filter((t) => !t.completed);
    saveTodos(todos);
    render();
  });

  render();
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
