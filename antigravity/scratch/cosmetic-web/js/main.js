document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Real Shopping Cart Implementation ---
    let cart = [];
    const cartIcon = document.getElementById('cart-icon');
    const cartBadge = document.getElementById('cart-badge');
    const cartDrawer = document.getElementById('cart-drawer');
    const cartOverlay = document.getElementById('cart-overlay');
    const closeCart = document.getElementById('close-cart');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalPrice = document.getElementById('cart-total-price');

    // Toggle Cart
    cartIcon.addEventListener('click', () => {
        cartDrawer.classList.add('open');
        cartOverlay.classList.add('open');
        renderCart();
    });

    closeCart.addEventListener('click', () => {
        cartDrawer.classList.remove('open');
        cartOverlay.classList.remove('open');
    });

    cartOverlay.addEventListener('click', () => {
        cartDrawer.classList.remove('open');
        cartOverlay.classList.remove('open');
    });

    // Add to Cart
    const addButtons = document.querySelectorAll('.add-to-cart');
    
    addButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Get product details
            const card = button.closest('.product-card');
            const id = card.getAttribute('data-id');
            const title = card.querySelector('.product-title').textContent;
            let rawPrice = card.querySelector('.product-price').textContent;
            const price = parseInt(rawPrice.replace(/\./g, ''));
            const img = card.querySelector('.product-img-wrapper img').src;

            // Check if exists
            const existingItem = cart.find(item => item.id === id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ id, title, price, img, quantity: 1 });
            }

            // Update badge
            cartBadge.textContent = cart.reduce((total, item) => total + item.quantity, 0);

            // Pop cart open slightly or show feedback
            const originalText = button.textContent;
            button.textContent = 'ĐÃ LƯU ✓';
            button.style.backgroundColor = '#2c3e50';
            setTimeout(() => {
                button.textContent = originalText;
                button.style.backgroundColor = '';
            }, 1000);

            // Auto open cart to view
            cartDrawer.classList.add('open');
            cartOverlay.classList.add('open');
            renderCart();
        });
    });

    // Render Cart
    window.renderCart = function() {
        cartItemsContainer.innerHTML = '';
        let total = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<div class="cart-empty">Giỏ hàng đang trống. Hãy mua sắm nhé!</div>';
        } else {
            cart.forEach(item => {
                total += item.price * item.quantity;
                const formattedPrice = new Intl.NumberFormat('vi-VN').format(item.price) + ' ₫';
                
                const itemDiv = document.createElement('div');
                itemDiv.className = 'cart-item';
                itemDiv.innerHTML = `
                    <img src="${item.img}" alt="${item.title}">
                    <div class="cart-item-info">
                        <div class="cart-item-title">${item.title}</div>
                        <div class="cart-item-price">${formattedPrice}</div>
                        <div class="cart-item-quantity">
                            <button onclick="updateQty('${item.id}', -1)">-</button>
                            <span>${item.quantity}</span>
                            <button onclick="updateQty('${item.id}', 1)">+</button>
                        </div>
                    </div>
                    <span class="material-icons cart-item-remove" onclick="removeItem('${item.id}')">delete</span>
                `;
                cartItemsContainer.appendChild(itemDiv);
            });
        }

        cartTotalPrice.textContent = new Intl.NumberFormat('vi-VN').format(total) + ' ₫';
    }

    // Window global functions for onclick attributes
    window.updateQty = function(id, change) {
        const item = cart.find(i => i.id === id);
        if (item) {
            item.quantity += change;
            if (item.quantity <= 0) {
                cart = cart.filter(i => i.id !== id);
            }
        }
        cartBadge.textContent = cart.reduce((total, i) => total + i.quantity, 0);
        renderCart();
    }

    window.removeItem = function(id) {
        cart = cart.filter(i => i.id !== id);
        cartBadge.textContent = cart.reduce((total, i) => total + i.quantity, 0);
        renderCart();
    }


    // --- 2. Image Slider (Hero Section) ---
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;

    if(slides.length > 0) {
        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 4000); 
    }

    // --- 3. Product Filter ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');

            productCards.forEach(card => {
                if(filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // --- Smooth Scrolling for Navigation ---
    document.querySelectorAll('.nav-links a, .btn').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetAttr = this.getAttribute('href');
            if(targetAttr.startsWith('#')) {
                e.preventDefault();
                const targetId = targetAttr.substring(1);
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 70,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // --- 5. Auth Modal Functionality ---
    const authIcon = document.getElementById('auth-icon');
    const authModal = document.getElementById('auth-modal');
    const closeAuth = document.getElementById('close-auth');

    authIcon.addEventListener('click', () => {
        authModal.classList.add('open');
    });

    closeAuth.addEventListener('click', () => {
        authModal.classList.remove('open');
    });

    // Close modal if clicked outside
    authModal.addEventListener('click', (e) => {
        if(e.target === authModal) {
            authModal.classList.remove('open');
        }
    });

    // --- 6. Expandable Interactive Search Bar ---
    const searchIcon = document.getElementById('search-icon');
    const searchBox = document.querySelector('.search-box');
    const searchInput = document.getElementById('search-input');

    searchIcon.addEventListener('click', () => {
        searchBox.classList.toggle('active');
        if(searchBox.classList.contains('active')){
            searchInput.focus();
        }
    });

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        
        // Reset category filter automatically over to 'all' if searching to avoid filtering collisions
        filterBtns.forEach(b => b.classList.remove('active'));
        document.querySelector('[data-filter="all"]').classList.add('active');

        productCards.forEach(card => {
            const title = card.querySelector('.product-title').textContent.toLowerCase();
            if(title.includes(searchTerm)){
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });

        // Scroll to products instantly if typing
        if(searchTerm.length > 0) {
            const productsSection = document.getElementById('products');
            window.scrollTo({
                top: productsSection.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });

});
