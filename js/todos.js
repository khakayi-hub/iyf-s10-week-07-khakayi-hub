import { generateId } from "./utils.js";

export function createTodo(text) {
    return {
        id: generateId(),
        text,
        completed: false,
        createdAt: new Date()
    };
}

export function toggleTodo(todos, id) {
    return todos.map(todo =>
        todo.id === id
            ? { ...todo, completed: !todo.completed }
            : todo
    );
}

export function deleteTodo(todos, id) {
    return todos.filter(todo => todo.id !== id);
}

export function clearCompleted(todos) {
    return todos.filter(todo => !todo.completed);
}