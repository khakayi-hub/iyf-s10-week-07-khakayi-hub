// Generate unique IDs
export function generateId() {
    return Date.now().toString(36) + 
           Math.random().toString(36).slice(2);
}

// Format date
export function formatDate(date) {
    return new Date(date).toLocaleDateString();
}

// Debounce function
export function debounce(func, wait) {
    let timeout;

    return function (...args) {
        clearTimeout(timeout);

        timeout = setTimeout(() => {
            func.apply(this, args);
        }, wait);
    };
}