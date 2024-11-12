const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

fetch('products.json')  
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(products => {
      
        const mainProductContainer = document.getElementById('product-container');

        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('rounded-xl', 'overflow-hidden', 'shadow-lg', 'transform', 'transition', 'duration-300', 'hover:scale-105', 'hover:shadow-2xl');

            const productImage = document.createElement('img');
            productImage.src = product.image;
            productImage.alt = product.name;
            productImage.classList.add('w-full', 'h-64', 'object-cover');

            const productDetails = document.createElement('div');
            productDetails.classList.add('p-4');

            const productName = document.createElement('h3');
            productName.classList.add('text-xl', 'font-semibold', 'text-gray-900');
            productName.textContent = product.name;

            const productPrice = document.createElement('p');
            productPrice.classList.add('text-lg', 'text-gray-700', 'mt-2');
            productPrice.textContent = `$${product.price}`;

            const addToCartButton = document.createElement('button');
            addToCartButton.classList.add('bg-blue-500', 'text-white', 'py-2', 'px-6', 'mt-4', 'rounded-full', 'hover:bg-blue-600', 'transition', 'duration-300');
            addToCartButton.textContent = 'Add to Cart';
            addToCartButton.setAttribute('data-product', JSON.stringify(product));
            addToCartButton.classList.add('add-to-cart');  

            productDetails.appendChild(productName);
            productDetails.appendChild(productPrice);
            productDetails.appendChild(addToCartButton);

            productCard.appendChild(productImage);
            productCard.appendChild(productDetails);

            mainProductContainer.appendChild(productCard);
        });
    })
    .catch(error => {
        console.error('Error fetching the product data:', error);
    });

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (event) => {
            const product = JSON.parse(event.target.getAttribute('data-product')); 
            let cart = JSON.parse(localStorage.getItem('cart')) || []; 
            
            const productIndex = cart.findIndex(item => item.id === product.id);
            if (productIndex === -1) {
                cart.push(product); 
            }

            localStorage.setItem('cart', JSON.stringify(cart));

            alert('Product added to cart!');
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (event) => {
            const product = JSON.parse(event.target.getAttribute('data-product'));
            let cart = JSON.parse(localStorage.getItem('cart')) || [];

            const productIndex = cart.findIndex(item => item.id === product.id);
            if (productIndex !== -1) {
                cart[productIndex].quantity += 1; 
            } else {
                product.quantity = 1; 
                cart.push(product);
            }

            localStorage.setItem('cart', JSON.stringify(cart)); 
            alert('Product added to cart!');
        });
    });
});
