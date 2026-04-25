// DOM Elements
const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const itemsLeft = document.getElementById("items-left");
const filters = document.querySelectorAll(".filter");
const clearCompletedBtn = document.getElementById("clear-completed");

// Load saved data
let todos = JSON.parse(localStorage.getItem("todos")) || [];
let currentFilter = localStorage.getItem("filter") || "all";

// Save data
function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

function saveFilter() {
    localStorage.setItem("filter", currentFilter);
}

// Create Todo Element
function createTodoElement(todo) {
    const li = document.createElement("li");
    li.dataset.id = todo.id;

    li.innerHTML = `
        <span class="${todo.completed ? "completed" : ""}">
            ${todo.text}
        </span>
        <div>
            <button class="toggle-btn">✔</button>
            <button class="delete-btn">Delete</button>
        </div>
    `;

    return li;
}

// Render Todos
function renderTodos() {
    todoList.innerHTML = "";

    let filteredTodos = todos;

    if (currentFilter === "active") {
        filteredTodos = todos.filter(todo => !todo.completed);
    }

    if (currentFilter === "completed") {
        filteredTodos = todos.filter(todo => todo.completed);
    }

    filteredTodos.forEach(todo => {
        todoList.appendChild(createTodoElement(todo));
    });

    updateStats();
    updateActiveFilterButton();
}

// Add Todo
function addTodo(text) {
    if (!text.trim()) return;

    todos.push({
        id: Date.now(),
        text,
        completed: false
    });

    saveTodos();
    renderTodos();
}

// Toggle Todo
function toggleTodo(id) {
    todos = todos.map(todo =>
        todo.id == id
            ? { ...todo, completed: !todo.completed }
            : todo
    );

    saveTodos();
    renderTodos();
}

// Delete Todo
function deleteTodo(id) {
    todos = todos.filter(todo => todo.id != id);

    saveTodos();
    renderTodos();
}

// Update Stats
function updateStats() {
    const activeCount = todos.filter(todo => !todo.completed).length;
    itemsLeft.textContent = `${activeCount} items left`;
}

// Filter Todos
function filterTodos(filter) {
    currentFilter = filter;
    saveFilter();
    renderTodos();
}

// Update Active Filter Button
function updateActiveFilterButton() {
    filters.forEach(btn => btn.classList.remove("active"));

    document
        .querySelector(`[data-filter="${currentFilter}"]`)
        .classList.add("active");
}

// Clear Completed
function clearCompleted() {
    todos = todos.filter(todo => !todo.completed);

    saveTodos();
    renderTodos();
}

// Event Listeners
form.addEventListener("submit", (e) => {
    e.preventDefault();

    addTodo(input.value);
    input.value = "";
});

todoList.addEventListener("click", (e) => {
    const li = e.target.closest("li");
    if (!li) return;

    const id = li.dataset.id;

    if (e.target.classList.contains("delete-btn")) {
        deleteTodo(id);
    }

    if (e.target.classList.contains("toggle-btn")) {
        toggleTodo(id);
    }
});

filters.forEach(button => {
    button.addEventListener("click", () => {
        filterTodos(button.dataset.filter);
    });
});

clearCompletedBtn.addEventListener("click", clearCompleted);

// Initialize app
renderTodos();