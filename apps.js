import { save, load } from "./storage.js";
import {
    createTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted
} from "./todo.js";

import {
    renderTodos,
    updateStats,
    updateActiveFilter
} from "./ui.js";

// DOM Elements
const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const itemsLeft = document.getElementById("items-left");
const filters = document.querySelectorAll(".filter");
const clearCompletedBtn = document.getElementById("clear-completed");

// App State
let todos = load("todos", []);
let currentFilter = load("filter", "all");

// Save App State
function saveState() {
    save("todos", todos);
    save("filter", currentFilter);
}

// Render App
function renderApp() {
    renderTodos(todos, currentFilter, todoList);
    updateStats(todos, itemsLeft);
    updateActiveFilter(filters, currentFilter);
}

// Add Todo
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const text = input.value.trim();

    if (!text) return;

    todos.push(createTodo(text));

    saveState();
    renderApp();

    input.value = "";
});

// Handle Todo Actions
todoList.addEventListener("click", (e) => {
    const li = e.target.closest("li");
    if (!li) return;

    const id = li.dataset.id;

    if (e.target.classList.contains("toggle-btn")) {
        todos = toggleTodo(todos, id);
    }

    if (e.target.classList.contains("delete-btn")) {
        todos = deleteTodo(todos, id);
    }

    saveState();
    renderApp();
});

// Filter Buttons
filters.forEach(button => {
    button.addEventListener("click", () => {
        currentFilter = button.dataset.filter;

        saveState();
        renderApp();
    });
});

// Clear Completed
clearCompletedBtn.addEventListener("click", () => {
    todos = clearCompleted(todos);

    saveState();
    renderApp();
});

// Initialize App
renderApp();