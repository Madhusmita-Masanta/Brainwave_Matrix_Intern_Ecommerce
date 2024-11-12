document.addEventListener('DOMContentLoaded', () => {
    const cartContainer = document.getElementById('cart-container');
    const totalPriceElement = document.getElementById('total-price');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function renderCart() {
        cartContainer.innerHTML = '';
        let totalPrice = 0;

        cart.forEach((product, index) => {
            const price = parseFloat(product.price) || 0;
            const quantity = parseInt(product.quantity) || 1;

            const productTotal = price * quantity;
            totalPrice += productTotal;

            const cartItem = document.createElement('div');
            cartItem.classList.add('p-4', 'bg-white', 'rounded', 'shadow', 'flex', 'justify-between', 'items-center');

            cartItem.innerHTML = `
                <div>
                    <h3 class="text-xl font-semibold">${product.name || 'Unnamed Product'}</h3>
                    <p class="text-gray-700">$${price.toFixed(2)} x ${quantity}</p>
                </div>
                <div class="flex items-center">
                    <button class="px-2 py-1 bg-red-500 text-white rounded mr-4" onclick="removeFromCart(${index})">Remove</button>
                    <button class="px-2 py-1 bg-gray-300 rounded mr-2" onclick="decreaseQuantity(${index})">-</button>
                    <span class="text-lg">${quantity}</span>
                    <button class="px-2 py-1 bg-gray-300 rounded ml-2" onclick="increaseQuantity(${index})">+</button>
                </div>
                <p class="text-gray-900 font-bold">$${productTotal.toFixed(2)}</p>
            `;

            cartContainer.appendChild(cartItem);
        });

        totalPriceElement.textContent = totalPrice.toFixed(2);
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    function addToCart(product) {
        const existingProduct = cart.find(item => item.name === product.name);

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        renderCart();
    }

    window.increaseQuantity = (index) => {
        cart[index].quantity = (cart[index].quantity || 1) + 1;
        renderCart();
    };

    window.decreaseQuantity = (index) => {
        if (cart[index].quantity > 1) {
            cart[index].quantity -= 1;
        } else {
            cart.splice(index, 1); 
        }
        renderCart();
    };

    window.removeFromCart = (index) => {
        cart.splice(index, 1);
        renderCart();
    };

    window.completeOrder = () => {
        if (cart.length === 0) {
            alert('Your cart is empty');
        } else {
            alert('Your order is successful!');
            localStorage.removeItem('cart');
            cart = [];
            renderCart(); 
        }
    };

    renderCart();
});

