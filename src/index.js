// ================================================================
// 1. ТАБЫ
// ================================================================

const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');

if (tabBtns.length > 0 && tabPanels.length > 0) {
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            tabBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const tabId = this.dataset.tab;
            tabPanels.forEach(panel => panel.classList.remove('active'));

            const targetPanel = document.getElementById('tab-' + tabId);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });
}

// ================================================================
// 2. БУРГЕР МЕНЮ
// ================================================================

const burgerBtn = document.getElementById('burgerBtn');
const mobileMenu = document.getElementById('mobileMenu');
const mobileClose = document.getElementById('mobileClose');
const body = document.body;

if (burgerBtn && mobileMenu) {
    let overlay = document.querySelector('.menu-overlay');

    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'menu-overlay';
        body.appendChild(overlay);
    }

    function openMenu() {
        mobileMenu.classList.add('open');
        burgerBtn.classList.add('active');
        overlay.classList.add('active');
        body.style.overflow = 'hidden';
    }

    function closeMenu() {
        mobileMenu.classList.remove('open');
        burgerBtn.classList.remove('active');
        overlay.classList.remove('active');
        body.style.overflow = '';
    }

    burgerBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        if (mobileMenu.classList.contains('open')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    if (mobileClose) {
        mobileClose.addEventListener('click', closeMenu);
    }

    overlay.addEventListener('click', closeMenu);

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeMenu();
        }
    });

    document.querySelectorAll('.mobile-nav a').forEach(function(link) {
        link.addEventListener('click', closeMenu);
    });
}

// ================================================================
// 3. ФОРМА
// ================================================================

document.addEventListener('DOMContentLoaded', function() {

    const form = document.querySelector('.feedback-form');

    if (form) {
        const phoneInput = document.getElementById('form-phone');

        if (phoneInput) {
            phoneInput.addEventListener('input', function() {
                this.value = this.value.replace(/[a-zA-Zа-яА-ЯёЁ]/g, '');
            });
        }

        form.addEventListener('submit', function(e) {
            e.preventDefault();

            console.log('1. Форма отправлена');

            const nameInput = document.getElementById('form-name');
            const phoneInput = document.getElementById('form-phone');
            const siteInput = document.getElementById('form-site');
            const agreeCheckbox = document.getElementById('form-agree');

            let isValid = true;

            const nameValue = nameInput.value.trim();
            const nameRegex = /^[а-яА-ЯёЁa-zA-Z\s-]+$/;

            if (!nameRegex.test(nameValue) || nameValue === '') {
                nameInput.style.borderColor = '#D61A21';
                isValid = false;
            } else {
                nameInput.style.borderColor = '#d0d0d0';
            }

            const phoneValue = phoneInput.value.trim();
            const phoneRegex = /^[0-9+\s\-()]+$/;

            if (!phoneRegex.test(phoneValue) || phoneValue.length < 5) {
                phoneInput.style.borderColor = '#D61A21';
                isValid = false;
            } else {
                phoneInput.style.borderColor = '#d0d0d0';
            }

            const siteValue = siteInput.value.trim();
            if (siteValue !== '') {
                const siteRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
                if (!siteRegex.test(siteValue)) {
                    siteInput.style.borderColor = '#D61A21';
                    isValid = false;
                } else {
                    siteInput.style.borderColor = '#d0d0d0';
                }
            }

            if (!agreeCheckbox.checked) {
                agreeCheckbox.style.outline = '2px solid #D61A21';
                isValid = false;
            } else {
                agreeCheckbox.style.outline = 'none';
            }

            console.log('2. isValid =', isValid);

            if (isValid) {
                const formData = {
                    id: Date.now(),
                    date: new Date().toLocaleString('ru-RU'),
                    name: nameValue,
                    company: document.getElementById('form-company').value.trim(),
                    phone: phoneValue,
                    email: document.getElementById('form-email').value.trim(),
                    site: siteValue,
                    city: document.getElementById('form-city').value.trim(),
                    service: document.getElementById('form-service').value
                };

                console.log('3. Данные для сохранения:', formData);

                let applications = JSON.parse(localStorage.getItem('applications')) || [];
                console.log('4. Старые заявки:', applications);

                applications.push(formData);
                localStorage.setItem('applications', JSON.stringify(applications));

                console.log('5. Заявка сохранена! Всего:', applications.length);

                form.reset();

                document.querySelectorAll('.form-input').forEach(function(inp) {
                    inp.style.borderColor = '#d0d0d0';
                });
            } else {
                console.log('Форма не валидна');
            }
        });

        document.querySelectorAll('.form-input').forEach(function(input) {
            input.addEventListener('input', function() {
                this.style.borderColor = '#d0d0d0';
            });
        });

        const agreeCheckbox = document.getElementById('form-agree');
        if (agreeCheckbox) {
            agreeCheckbox.addEventListener('change', function() {
                this.style.outline = 'none';
            });
        }
    }

});

// ================================================================
// 4. МОДАЛЬНОЕ ОКНО ДЛЯ МЕНЕДЖЕРА
// ================================================================

document.addEventListener('DOMContentLoaded', function() {

    const modal = document.getElementById('managerModal');
    const closeBtn = document.getElementById('managerModalClose');
    const modalPhoto = document.getElementById('modalPhoto');
    const modalName = document.getElementById('modalName');
    const modalPhone = document.getElementById('modalPhone');
    const modalCloseBtn = document.getElementById('modalCloseBtn');

    if (!modal) {
        console.log('Модалка не найдена!');
        return;
    }

    document.querySelectorAll('.managers__card').forEach(function(card) {
        card.addEventListener('click', function() {
            const photo = this.querySelector('.manager_photo img')?.src || '';
            const name = this.querySelector('.manager_name')?.textContent || 'Менеджер';
            const phone = this.querySelector('.number_manager')?.textContent || '';

            modalPhoto.src = photo;
            modalPhoto.alt = name;
            modalName.textContent = name;
            modalPhone.textContent = phone;

            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeModal);
    }

    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });

});