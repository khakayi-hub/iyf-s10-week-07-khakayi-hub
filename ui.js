export function renderTodos(todos, filter, todoList) {
    todoList.innerHTML = "";

    let filteredTodos = todos;

    if (filter === "active") {
        filteredTodos = todos.filter(todo => !todo.completed);
    }

    if (filter === "completed") {
        filteredTodos = todos.filter(todo => todo.completed);
    }

    filteredTodos.forEach(todo => {
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

        todoList.appendChild(li);
    });
}

export function updateStats(todos, itemsLeft) {
    const activeTodos = todos.filter(todo => !todo.completed).length;
    itemsLeft.textContent = `${activeTodos} items left`;
}

export function updateActiveFilter(filters, currentFilter) {
    filters.forEach(btn => btn.classList.remove("active"));

    document
        .querySelector(`[data-filter="${currentFilter}"]`)
        .classList.add("active");
}