// Centralized State
const state = {
    products: [
        {
            id: 1,
            name: "Laptop",
            price: 999,
            image: "https://via.placeholder.com/200?text=Laptop"
        },
        {
            id: 2,
            name: "Phone",
            price: 699,
            image: "https://via.placeholder.com/200?text=Phone"
        },
        {
            id: 3,
            name: "Headphones",
            price: 199,
            image: "https://via.placeholder.com/200?text=Headphones"
        }
    ],
    cart: JSON.parse(localStorage.getItem("cart")) || []
};

// DOM Elements
const productList = document.getElementById("productList");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartCount = document.getElementById("cartCount");
const clearCartBtn = document.getElementById("clearCartBtn");

// Save cart to localStorage
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(state.cart));
}

// Add to cart
function addToCart(productId) {
    const existing = state.cart.find(item => item.productId === productId);

    if (existing) {
        existing.quantity++;
    } else {
        state.cart.push({
            productId,
            quantity: 1
        });
    }

    saveCart();
    renderCart();
}

// Update quantity
function updateQuantity(productId, quantity) {
    const item = state.cart.find(item => item.productId === productId);

    if (item) {
        item.quantity = quantity;

        if (item.quantity <= 0) {
            removeFromCart(productId);
            return;
        }
    }

    saveCart();
    renderCart();
}

// Remove item
function removeFromCart(productId) {
    state.cart = state.cart.filter(
        item => item.productId !== productId
    );

    saveCart();
    renderCart();
}

// Get total
function getCartTotal() {
    return state.cart.reduce((total, item) => {
        const product = state.products.find(
            p => p.id === item.productId
        );

        return total + (product.price * item.quantity);
    }, 0);
}

// Get cart count
function getCartCount() {
    return state.cart.reduce(
        (count, item) => count + item.quantity,
        0
    );
}

// Render Products
function renderProducts() {
    productList.innerHTML = "";

    state.products.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");

        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price}</p>
            <button onclick="addToCart(${product.id})">
                Add to Cart
            </button>
        `;

        productList.appendChild(productDiv);
    });
}

// Render Cart
function renderCart() {
    cartItems.innerHTML = "";

    state.cart.forEach(item => {
        const product = state.products.find(
            p => p.id === item.productId
        );

        const cartDiv = document.createElement("div");

        cartDiv.innerHTML = `
            <h4>${product.name}</h4>
            <p>$${product.price}</p>

            <button onclick="updateQuantity(${product.id}, ${item.quantity - 1})">-</button>

            ${item.quantity}

            <button onclick="updateQuantity(${product.id}, ${item.quantity + 1})">+</button>

            <button onclick="removeFromCart(${product.id})">
                Remove
            </button>
        `;

        cartItems.appendChild(cartDiv);
    });

    cartTotal.textContent = getCartTotal();
    cartCount.textContent = getCartCount();
}

// Clear cart
clearCartBtn.addEventListener("click", () => {
    state.cart = [];
    saveCart();
    renderCart();
});

// Initial render
renderProducts();
renderCart();