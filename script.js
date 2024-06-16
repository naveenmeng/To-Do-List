document.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementById('todoInput');
    const addButton = document.getElementById('addButton');
    const todoList = document.getElementById('todoList');

    // Load existing todos from localStorage
    const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    savedTodos.forEach(todo => {
        addTodoToDOM(todo);
    });

    // Add button click event
    addButton.addEventListener('click', function() {
        const todoText = input.value.trim();
        if (todoText) {
            addTodoToDOM(todoText);
            saveTodoToLocalStorage(todoText);
            input.value = '';  // Clear the input box
        }
    });

    // Add a new todo item to the DOM
    function addTodoToDOM(todo) {
        const li = document.createElement('li');
        li.textContent = todo;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'deleteButton';
        deleteButton.addEventListener('click', function() {
            todoList.removeChild(li);
            deleteTodoFromLocalStorage(todo);
        });

        li.appendChild(deleteButton);
        todoList.appendChild(li);
    }

    // Save a new todo item to localStorage
    function saveTodoToLocalStorage(todo) {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos.push(todo);
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    // Delete a todo item from localStorage
    function deleteTodoFromLocalStorage(todo) {
        let todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos = todos.filter(item => item !== todo);
        localStorage.setItem('todos', JSON.stringify(todos));
    }
});
