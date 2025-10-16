document.addEventListener('DOMContentLoaded', () => {
    const API_BASE_URL = 'http://localhost:3001/api/todos';
    const newTodoForm = document.getElementById('new-todo-form');
    const newTodoInput = document.getElementById('new-todo-input');
    const todoList = document.getElementById('todo-list');

    // Function to render all todos
    async function renderTodos(todos) {
        todoList.innerHTML = ''; // Clear existing list items
        todos.forEach(todo => {
            const li = document.createElement('li');
            li.setAttribute('data-id', todo.id);
            if (todo.is_completed) {
                li.classList.add('completed');
            }

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = todo.is_completed;
            checkbox.classList.add('checkbox');

            const taskText = document.createElement('span');
            taskText.classList.add('task-text');
            taskText.textContent = todo.task;

            const deleteButton = document.createElement('button');
            deleteButton.classList.add('delete-button');
            deleteButton.textContent = '삭제';

            li.appendChild(checkbox);
            li.appendChild(taskText);
            li.appendChild(deleteButton);
            todoList.appendChild(li);
        });
    }

    // Initial data load
    async function loadTodos() {
        try {
            const response = await fetch(API_BASE_URL);
            const todos = await response.json();
            renderTodos(todos);
        } catch (error) {
            console.error('Error loading todos:', error);
            todoList.innerHTML = '<li>할 일을 불러오는 데 실패했습니다.</li>';
        }
    }

    // Add todo functionality
    newTodoForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const task = newTodoInput.value.trim();
        if (!task) return;

        try {
            const response = await fetch(API_BASE_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ task }),
            });
            const newTodo = await response.json();
            
            // Add new todo to the top of the list
            const li = document.createElement('li');
            li.setAttribute('data-id', newTodo.id);

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = newTodo.is_completed;
            checkbox.classList.add('checkbox');

            const taskText = document.createElement('span');
            taskText.classList.add('task-text');
            taskText.textContent = newTodo.task;

            const deleteButton = document.createElement('button');
            deleteButton.classList.add('delete-button');
            deleteButton.textContent = '삭제';

            li.appendChild(checkbox);
            li.appendChild(taskText);
            li.appendChild(deleteButton);
            
            // Prepend to the list
            if (todoList.firstChild && todoList.firstChild.textContent === 'Loading...') {
                todoList.innerHTML = ''; // Clear "Loading..." if it's the only item
            }
            todoList.prepend(li);

            newTodoInput.value = ''; // Clear input field
        } catch (error) {
            console.error('Error adding todo:', error);
        }
    });

    // Complete/Delete todo functionality using event delegation
    todoList.addEventListener('click', async (event) => {
        const target = event.target;
        const li = target.closest('li');
        if (!li) return;

        const todoId = li.getAttribute('data-id');

        // Complete/Uncomplete todo
        if (target.classList.contains('checkbox')) {
            const isCompleted = target.checked;
            try {
                const response = await fetch(`${API_BASE_URL}/${todoId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ is_completed: isCompleted }),
                });
                if (response.ok) {
                    li.classList.toggle('completed', isCompleted);
                } else {
                    // Revert checkbox state if API call fails
                    target.checked = !isCompleted;
                    console.error('Failed to update todo status');
                }
            } catch (error) {
                target.checked = !isCompleted; // Revert checkbox state on network error
                console.error('Error updating todo status:', error);
            }
        }

        // Delete todo
        if (target.classList.contains('delete-button')) {
            try {
                const response = await fetch(`${API_BASE_URL}/${todoId}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    li.remove(); // Remove from DOM
                } else {
                    console.error('Failed to delete todo');
                }
            } catch (error) {
                console.error('Error deleting todo:', error);
            }
        }
    });

    // Load todos when the page loads
    loadTodos();
});
