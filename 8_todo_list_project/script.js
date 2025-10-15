document.addEventListener('DOMContentLoaded', () => {
    const newTaskInput = document.getElementById('new-todo-input');
    const addTaskButton = document.getElementById('add-todo-btn');
    const todoList = document.getElementById('todo-list');

    // Function to create a new todo item
    function createTodoItem(taskText, isCompleted = false) {
        const todoItem = document.createElement('li'); // Changed to li tag
        todoItem.classList.add('todo-item');

        const itemLeft = document.createElement('div');
        itemLeft.classList.add('item-left');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('task-checkbox');
        checkbox.checked = isCompleted;

        const span = document.createElement('span');
        span.textContent = taskText;
        if (isCompleted) {
            span.style.textDecoration = 'line-through';
        }

        itemLeft.appendChild(checkbox);
        itemLeft.appendChild(span);

        const itemRight = document.createElement('div');
        itemRight.classList.add('item-right');

        const deleteIcon = document.createElement('img');
        deleteIcon.src = 'images/delete_icon.png';
        deleteIcon.alt = 'Delete';
        deleteIcon.classList.add('delete-icon');
        // Removed individual event listener, will use event delegation

        itemRight.appendChild(deleteIcon);

        todoItem.appendChild(itemLeft);
        todoItem.appendChild(itemRight);

        return todoItem;
    }

    // Add existing tasks from HTML (convert static divs to dynamic li elements)
    document.querySelectorAll('.todo-list .todo-item').forEach(item => {
        const text = item.querySelector('span').textContent;
        const isChecked = item.querySelector('input[type="checkbox"]').checked;
        const newItem = createTodoItem(text, isChecked);
        todoList.appendChild(newItem);
        item.remove(); // Remove the original static div item
    });

    // Event delegation for checkbox toggle and delete button
    todoList.addEventListener('click', (event) => {
        if (event.target.classList.contains('task-checkbox')) {
            const span = event.target.nextElementSibling; // Get the sibling span element
            if (event.target.checked) {
                span.style.textDecoration = 'line-through';
            } else {
                span.style.textDecoration = 'none';
            }
        } else if (event.target.classList.contains('delete-icon')) {
            const todoItem = event.target.closest('.todo-item'); // Find the parent li.todo-item
            if (todoItem) {
                todoItem.remove();
            }
        }
    });

    // Add new task
    addTaskButton.addEventListener('click', () => {
        const taskText = newTaskInput.value.trim();
        if (taskText !== '') {
            const newTodo = createTodoItem(taskText);
            todoList.appendChild(newTodo);
            newTaskInput.value = '';
        }
    });

    // Allow adding task with Enter key
    newTaskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTaskButton.click();
        }
    });
});
