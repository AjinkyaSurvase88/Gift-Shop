// Environment Variables - Set these in your Vercel deployment
    const ADMIN_EMAIL = typeof process !== 'undefined' && process.env && process.env.ADMIN_EMAIL || 'abhishek@gmail.com';
    const ADMIN_PASSWORD = typeof process !== 'undefined' && process.env && process.env.ADMIN_PASSWORD || 'abhishek@123';

    document.addEventListener('DOMContentLoaded', () => {
        const themeToggleBtn = document.getElementById('theme-toggle');
        const darkIcon = document.getElementById('theme-toggle-dark-icon');
        const lightIcon = document.getElementById('theme-toggle-light-icon');

        const applyTheme = () => {
            const stored = window.themePreference || 'light';
            if (stored === 'dark' || (!window.themePreference && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                document.documentElement.classList.add('dark');
                window.themePreference = 'dark';
                darkIcon.classList.remove('hidden');
                lightIcon.classList.add('hidden');
            } else {
                document.documentElement.classList.remove('dark');
                window.themePreference = 'light';
                darkIcon.classList.add('hidden');
                lightIcon.classList.remove('hidden');
            }
        };

        themeToggleBtn.addEventListener('click', () => {
            window.themePreference = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
            applyTheme();
        });

        applyTheme();

        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');

        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        window.showPage = (pageId) => {
            document.querySelectorAll('.section').forEach(section => {
                section.classList.remove('active');
            });

            const targetSection = document.getElementById(pageId);
            if (targetSection) {
                targetSection.classList.add('active');
            }

            mobileMenu.classList.add('hidden');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        };

        window.productsData = [];

        const getProducts = () => {
            if (window.productsData.length === 0) {
                window.productsData = [
                    { id: 1, title: 'सुंदर साडी', category: 'महिला उत्पादने', description: 'उत्कृष्ट दर्जाची डिझायनर साडी. विशेष प्रसंगासाठी योग्य.', price: 1500, image: 'https://placehold.co/600x400/ec4899/ffffff?text=साडी', featured: true },
                    { id: 2, title: 'मुलांचा रोबोट', category: 'मुलांचे खेळणी', description: 'रंगीबेरंगी रोबोट खेळणे. मुलांसाठी मनोरंजक आणि शैक्षणिक.', price: 800, image: 'https://placehold.co/600x400/3b82f6/ffffff?text=रोबोट', featured: true },
                    { id: 3, title: 'लाकडी फोटो फ्रेम', category: 'फोटो फ्रेम', description: 'सुंदर हस्तकला लाकडी फ्रेम. तुमच्या आठवणी जपण्यासाठी.', price: 350, image: 'https://placehold.co/600x400/f59e0b/ffffff?text=फ्रेम', featured: false },
                    { id: 4, title: 'स्टेशनरी सेट', category: 'सामान्य उत्पादने', description: 'संपूर्ण स्टेशनरी सेट. ऑफिस आणि घरासाठी उपयुक्त.', price: 450, image: 'https://placehold.co/600x400/10b981/ffffff?text=स्टेशनरी', featured: true },
                    { id: 5, title: 'मेकअप किट', category: 'महिला उत्पादने', description: 'संपूर्ण मेकअप किट सर्व आवश्यक वस्तु सह.', price: 1200, image: 'https://placehold.co/600x400/8b5cf6/ffffff?text=मेकअप', featured: false },
{ id: 6, title: 'लेगो ब्लॉक्स', category: 'मुलांचे खेळणी', description: 'रंगीत लेगो ब्लॉक्स सेट. सर्जनशीलता वाढवण्यासाठी.', price: 650, image: 'https://placehold.co/600x400/06b6d4/ffffff?text=लेगो', featured: false },
];
}
return window.productsData;
};
        const saveProducts = (products) => {
            window.productsData = products;
        };

        const featuredGrid = document.getElementById('featured-products-grid');
        const productsGrid = document.getElementById('products-grid');

        const renderProducts = (filter = '', category = 'all') => {
            const products = getProducts();
            featuredGrid.innerHTML = '';
            productsGrid.innerHTML = '';

            const filteredProducts = products.filter(p =>
                p.title.toLowerCase().includes(filter.toLowerCase()) &&
                (category === 'all' || p.category === category)
            );

            if (filteredProducts.length === 0) {
                productsGrid.innerHTML = `
                <div class="col-span-full text-center py-12">
                    <p class="text-gray-500 dark:text-gray-400 text-lg">कोणतेही उत्पादन सापडले नाही.</p>
                </div>
            `;
                return;
            }

            filteredProducts.forEach(product => {
                const productCardHTML = `
                <div class="project-card bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                    <div class="relative overflow-hidden group">
                        <img src="${product.image}" alt="${product.title}" class="w-full h-56 object-cover transform group-hover:scale-110 transition duration-500">
                        <div class="absolute top-4 right-4">
                            <span class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-bold text-blue-600 dark:text-blue-400 shadow-lg">${product.category}</span>
                        </div>
                    </div>
                    <div class="p-6">
                        <h4 class="text-xl font-bold mb-3">${product.title}</h4>
                        <p class="text-gray-600 dark:text-gray-400 text-sm mb-6">${product.description}</p>
                        <div class="flex justify-between items-center">
                            <span class="text-2xl font-bold text-blue-600 dark:text-blue-400">₹${product.price.toLocaleString()}</span>
                            <button onclick="openBuyModal(${product.id})" class="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition">खरेदी करा</button>
                        </div>
                    </div>
                </div>
            `;

                if (product.featured) {
                    featuredGrid.innerHTML += productCardHTML;
                }
                productsGrid.innerHTML += productCardHTML;
            });
        };

        const searchInput = document.getElementById('search-input');
        const categoryFilter = document.getElementById('category-filter');

        searchInput.addEventListener('input', () => renderProducts(searchInput.value, categoryFilter.value));
        categoryFilter.addEventListener('change', () => renderProducts(searchInput.value, categoryFilter.value));

        const toast = document.getElementById('toast');
        const toastMessage = document.getElementById('toast-message');
        const toastIcon = document.getElementById('toast-icon');

        window.showToast = (message, isError = false) => {
            toastMessage.textContent = message;

            if (isError) {
                toast.className = 'toast fixed bottom-5 right-5 px-6 py-4 rounded-xl shadow-2xl flex items-center space-x-3 max-w-sm bg-red-500 text-white';
                toastIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>';
            } else {
                toast.className = 'toast fixed bottom-5 right-5 px-6 py-4 rounded-xl shadow-2xl flex items-center space-x-3 max-w-sm bg-green-500 text-white';
                toastIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>';
            }

            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
            }, 4000);
        };

        const contactForm = document.getElementById('contact-form');
        const contactBtnText = document.getElementById('contact-btn-text');
        const contactBtnSpinner = document.getElementById('contact-btn-spinner');

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            const name = contactForm.querySelector('#name');
            const contact = contactForm.querySelector('#contact');
            const message = contactForm.querySelector('#message');

            contactForm.querySelectorAll('.error-message').forEach(err => err.classList.add('hidden'));
            contactForm.querySelectorAll('input, textarea').forEach(field => {
                field.classList.remove('border-red-500');
            });

            if (name.value.trim() === '') {
                name.nextElementSibling.classList.remove('hidden');
                name.classList.add('border-red-500');
                isValid = false;
            }

            const phoneRegex = /^[0-9]{10}$/;
            if (!phoneRegex.test(contact.value.trim())) {
                contact.nextElementSibling.classList.remove('hidden');
                contact.classList.add('border-red-500');
                isValid = false;
            }

            if (message.value.trim() === '') {
                message.nextElementSibling.classList.remove('hidden');
                message.classList.add('border-red-500');
                isValid = false;
            }

            if (isValid) {
                contactBtnText.textContent = 'पाठवत आहे...';
                contactBtnSpinner.classList.remove('hidden');

                const smsBody = `नाव: ${name.value.trim()}%0Aसंपर्क: ${contact.value.trim()}%0Aसंदेश: ${message.value.trim()}`;
                const smsUrl = `sms:9325850332?body=${smsBody}`;
                
                setTimeout(() => {
                    window.location.href = smsUrl;
                    showToast('SMS अॅप उघडत आहे!');
                    contactForm.reset();
                    contactBtnText.textContent = 'संदेश पाठवा';
                    contactBtnSpinner.classList.add('hidden');
                }, 500);
            } else {
                showToast('कृपया त्रुटी दुरुस्त करा.', true);
            }
        });

        // Image Upload Handler
        const imageInput = document.getElementById('product-image-input');
        const imagePreview = document.getElementById('image-preview');
        const imageDataInput = document.getElementById('product-image-data');
        const uploadPlaceholder = document.getElementById('upload-placeholder');

        imageInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                // Check file size (5MB limit)
                if (file.size > 5 * 1024 * 1024) {
                    showToast('फोटो 5MB पेक्षा लहान असावी!', true);
                    return;
                }

                const reader = new FileReader();
                reader.onload = (event) => {
                    const imageData = event.target.result;
                    imageDataInput.value = imageData;
                    imagePreview.src = imageData;
                    imagePreview.classList.add('active');
                    uploadPlaceholder.style.display = 'none';
                };
                reader.readAsDataURL(file);
            }
        });

        const adminLoginForm = document.getElementById('admin-login-form');
        const loginBtnText = document.getElementById('login-btn-text');
        const loginBtnSpinner = document.getElementById('login-btn-spinner');

        adminLoginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('admin-email').value;
            const password = document.getElementById('admin-password').value;

            loginBtnText.textContent = 'लॉगिन करत आहे...';
            loginBtnSpinner.classList.remove('hidden');

            setTimeout(() => {
                if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
                    window.isAdminAuthenticated = true;
                    showToast('लॉगिन यशस्वी! स्वागत आहे.');
                    showPage('admin-dashboard');
                    renderAdminProductList();
                    adminLoginForm.reset();
                } else {
                    showToast('चुकीची माहिती. पुन्हा प्रयत्न करा.', true);
                }

                loginBtnText.textContent = 'लॉगिन';
                loginBtnSpinner.classList.add('hidden');
            }, 1000);
        });

        const productForm = document.getElementById('product-form');
        const productList = document.getElementById('product-list');
        const logoutButton = document.getElementById('logout-button');
        const formTitle = document.getElementById('form-title');
        const submitButton = document.getElementById('submit-product-button');
        const cancelEditButton = document.getElementById('cancel-edit-button');

        const renderAdminProductList = () => {
            productList.innerHTML = '';
            const products = getProducts();

            if (products.length === 0) {
                productList.innerHTML = `
                <tr>
                    <td colspan="5" class="p-8 text-center text-gray-500 dark:text-gray-400">अद्याप कोणतेही उत्पादन नाही.</td>
                </tr>
            `;
                return;
            }

            products.forEach(p => {
                productList.innerHTML += `
                <tr class="hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                    <td class="p-4 font-medium">${p.title}</td>
                    <td class="p-4">
                        <span class="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 text-xs font-semibold px-2.5 py-1 rounded">${p.category}</span>
                    </td>
                    <td class="p-4 font-semibold text-blue-600 dark:text-blue-400">₹${p.price.toLocaleString()}</td>
                    <td class="p-4">${p.featured ? '<span class="text-yellow-500">⭐</span>' : '<span class="text-gray-400">-</span>'}</td>
                    <td class="p-4">
                        <div class="flex gap-2">
                            <button onclick="editProduct(${p.id})" class="text-blue-600 hover:text-blue-800 dark:text-blue-400 font-medium transition">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                </svg>
                            </button>
                            <button onclick="deleteProduct(${p.id})" class="text-red-600 hover:text-red-800 dark:text-red-400 font-medium transition">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                </svg>
                            </button>
                        </div>
                    </td>
                </tr>
            `;
            });
        };

        const resetProductForm = () => {
            productForm.reset();
            document.getElementById('product-id').value = '';
            imageDataInput.value = '';
            imagePreview.classList.remove('active');
            imagePreview.src = '';
            uploadPlaceholder.style.display = 'block';
            formTitle.textContent = 'नवीन उत्पादन जोडा';
            submitButton.textContent = 'उत्पादन जोडा';
            cancelEditButton.classList.add('hidden');
        };

        productForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const id = document.getElementById('product-id').value;
            const imageData = imageDataInput.value;

            if (!imageData && !id) {
                showToast('कृपया उत्पादनाचा फोटो निवडा!', true);
                return;
            }

            const newProduct = {
                title: document.getElementById('product-title').value.trim(),
                category: document.getElementById('product-category').value,
                price: parseFloat(document.getElementById('product-price').value),
                image: imageData || 'https://placehold.co/600x400',
                description: document.getElementById('product-description').value.trim(),
                featured: document.getElementById('product-featured').checked,
            };

            let products = getProducts();

            if (id) {
                newProduct.id = parseInt(id);
                products = products.map(p => p.id === newProduct.id ? newProduct : p);
                showToast('उत्पादन अपडेट झाले!');
            } else {
                newProduct.id = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
                products.push(newProduct);
                showToast('उत्पादन जोडले गेले!');
            }

            saveProducts(products);
            renderProducts(searchInput.value, categoryFilter.value);
            renderAdminProductList();
            resetProductForm();
        });

        window.editProduct = (id) => {
            const products = getProducts();
            const productToEdit = products.find(p => p.id === id);

            if (productToEdit) {
                document.getElementById('product-id').value = productToEdit.id;
                document.getElementById('product-title').value = productToEdit.title;
                document.getElementById('product-category').value = productToEdit.category;
                document.getElementById('product-price').value = productToEdit.price;
                imageDataInput.value = productToEdit.image;
                imagePreview.src = productToEdit.image;
                imagePreview.classList.add('active');
                uploadPlaceholder.style.display = 'none';
                document.getElementById('product-description').value = productToEdit.description;
                document.getElementById('product-featured').checked = productToEdit.featured;

                formTitle.textContent = 'उत्पादन संपादित करा';
                submitButton.textContent = 'अपडेट करा';
                cancelEditButton.classList.remove('hidden');

                window.scrollTo({ top: document.getElementById('product-form').offsetTop - 100, behavior: 'smooth' });
            }
        };

        cancelEditButton.addEventListener('click', resetProductForm);

        window.deleteProduct = (id) => {
            if (confirm('तुम्हाला खात्री आहे की तुम्ही हे उत्पादन हटवू इच्छिता?')) {
                let products = getProducts();
                products = products.filter(p => p.id !== id);
                saveProducts(products);
                renderProducts(searchInput.value, categoryFilter.value);
                renderAdminProductList();
                showToast('उत्पादन हटवले गेले!');
            }
        };

        logoutButton.addEventListener('click', () => {
            if (confirm('तुम्ही लॉगआउट करू इच्छिता?')) {
                window.isAdminAuthenticated = false;
                showToast('लॉगआउट यशस्वी.');
                showPage('home');
            }
        });

        const buyModal = document.getElementById('buy-modal');
        const modalProductTitle = document.getElementById('modal-product-title');
        const modalProductPrice = document.getElementById('modal-product-price');

        window.openBuyModal = (productId) => {
            const products = getProducts();
            const product = products.find(p => p.id === productId);

            if (product) {
                modalProductTitle.textContent = product.title;
                modalProductPrice.textContent = `₹${product.price.toLocaleString()}`;
                buyModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        };

        window.closeBuyModal = () => {
            buyModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        };

        buyModal.addEventListener('click', (e) => {
            if (e.target === buyModal) {
                closeBuyModal();
            }
        });

        renderProducts();
    });