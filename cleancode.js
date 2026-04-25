const MIN_TODO_LENGTH = 3;
const STORAGE_KEY = "todos";

// Add todo controller
function handleAddTodo(todoText) {
    if (!isValidTodo(todoText)) {
        showError("Task must be at least 3 characters long");
        return;
    }

    const newTodo = createTodo(todoText);

    saveTodo(newTodo);
    renderTodoList();
}

// Validation
function isValidTodo(todoText) {
    return todoText.trim().length >= MIN_TODO_LENGTH;
}

// Create todo object
function createTodo(todoText) {
    return {
        id: Date.now(),
        text: todoText.trim(),
        completed: false
    };
}

// Save todo
function saveTodo(todo) {
    todos.push(todo);

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(todos)
    );
}

// Render UI
function renderTodoList() {
    const todoList = document.getElementById("list");

    todoList.innerHTML = "";

    todos.forEach(todo => {
        todoList.innerHTML += `
            <li>${todo.text}</li>
        `;
    });
}

// Error handling
function showError(message) {
    alert(message);
}

//Debugging
function calculateOrderTotal(items) {
    let total = 0;

    for (let i = 0; i < items.length; i++) {
        const item = items[i];

        console.log(`Processing: ${item.name}`);
        console.log(`Price: ${item.price}`);
        console.log(`Quantity: ${item.quantity}`);

        total += item.price * item.quantity;
    }

    console.log("Total before discount:", total);

    if (total > 100) {
        console.log("Applying 10% discount...");
        total = total * 0.9;
    }

    return total;
}

const order = [
    { name: "Book", price: 15, quantity: 2 },
    { name: "Pen", price: 3, quantity: 5 },
    { name: "Notebook", price: 8, quantity: 3 }
];

console.log("Final Total:", calculateOrderTotal(order));