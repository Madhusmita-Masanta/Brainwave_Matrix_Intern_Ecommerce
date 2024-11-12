let cart = JSON.parse(localStorage.getItem("cart")) || [];
let allProducts = [];

document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("product-list")) {
        loadProducts();
    }
    if (document.getElementById("cart-items")) {
        loadCart();
    }
});

async function loadProducts() {
    const response = await fetch("products.json");
    allProducts = await response.json();
    displayProducts(allProducts);
}

function displayProducts(products) {
    const productList = document.getElementById("product-list");
    productList.innerHTML = ""; 
    products.forEach(product => {
        const productCard = document.createElement("div");
        productCard.classList.add("bg-white", "p-4", "rounded-lg", "shadow-lg", "hover:shadow-xl", "transition-shadow", "duration-300", "flex", "flex-col", "items-center");

        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="w-full h-70 object-cover rounded-md mb-4">
            <h3 class="text-lg font-semibold text-gray-800 mb-2">${product.name}</h3>
            <p class="text-sm text-gray-600 mb-4">Price: $${product.price}</p>
            <button onclick="addToCart(${product.id})" class="bg-blue-500 text-white text-sm py-2 px-4 rounded-md w-full hover:bg-blue-400 transition duration-300">
                Add to Cart
            </button>
        `;
        productList.appendChild(productCard);
    });
}


function filterProducts() {
    const filterValue = document.getElementById("price-filter").value;
    let filteredProducts = allProducts;

    if (filterValue !== "all") {
        const [min, max] = filterValue.split("-").map(Number);
        filteredProducts = allProducts.filter(
            product => product.price >= min && product.price <= max
        );
    }

    displayProducts(filteredProducts);
}


function addToCart(productId) {
    const product = allProducts.find(p => p.id === productId);
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} added to cart!`);
}

