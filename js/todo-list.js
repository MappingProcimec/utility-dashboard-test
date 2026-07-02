document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');
    const clearCompletedBtn = document.getElementById('clear-completed');
    
    loadTodos();
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        addTodo();
    });
    
    clearCompletedBtn.addEventListener('click', function() {
        clearCompleted();
    });
    
    function addTodo() {
        clearError('todo-error');
        
        const text = todoInput.value.trim();
        
        if (text === '') {
            showError('todo-error', 'Por favor ingrese una tarea');
            return;
        }
        
        if (text.length > 100) {
            showError('todo-error', 'La tarea no puede exceder 100 caracteres');
            return;
        }
        
        const todo = {
            id: Date.now(),
            text: text,
            completed: false
        };
        
        const todos = getTodos();
        todos.push(todo);
        saveTodos(todos);
        
        todoInput.value = '';
        renderTodos();
    }
    
    function toggleTodo(id) {
        const todos = getTodos();
        const todo = todos.find(t => t.id === id);
        
        if (todo) {
            todo.completed = !todo.completed;
            saveTodos(todos);
            renderTodos();
        }
    }
    
    function deleteTodo(id) {
        const todos = getTodos();
        const filteredTodos = todos.filter(t => t.id !== id);
        saveTodos(filteredTodos);
        renderTodos();
    }
    
    function clearCompleted() {
        const todos = getTodos();
        const activeTodos = todos.filter(t => !t.completed);
        saveTodos(activeTodos);
        renderTodos();
    }
    
    function getTodos() {
        const todos = localStorage.getItem('todos');
        return todos ? JSON.parse(todos) : [];
    }
    
    function saveTodos(todos) {
        localStorage.setItem('todos', JSON.stringify(todos));
    }
    
    function loadTodos() {
        renderTodos();
    }
    
    function renderTodos() {
        const todos = getTodos();
        todoList.innerHTML = '';
        
        if (todos.length === 0) {
            todoList.innerHTML = '<li style="text-align: center; color: var(--text-secondary); padding: 20px;">No hay tareas. ¡Agrega una!</li>';
            return;
        }
        
        todos.forEach(todo => {
            const li = document.createElement('li');
            li.className = 'todo-item' + (todo.completed ? ' completed' : '');
            
            li.innerHTML = `
                <input type="checkbox" ${todo.completed ? 'checked' : ''} data-id="${todo.id}">
                <span>${escapeHtml(todo.text)}</span>
                <button class="delete-btn" data-id="${todo.id}">Eliminar</button>
            `;
            
            todoList.appendChild(li);
        });
        
        todoList.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                toggleTodo(parseInt(this.dataset.id));
            });
        });
        
        todoList.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', function() {
                deleteTodo(parseInt(this.dataset.id));
            });
        });
    }
    
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
});
