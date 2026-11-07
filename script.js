const toFa = n => String(n).replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]);
const formatPrice = n => toFa(Number(n).toLocaleString()) + ' تومان';

function showToast(msg) {
    const t = document.getElementById('toastMsg');
    if (!t) return;
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2500);
}

// ۱. منوی موبایل
const mobileToggle = document.getElementById('mobileToggle');
const navLinks = document.getElementById('navLinks');
if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => navLinks.classList.toggle('show'));
}

// ۲. تایمر معکوس
let sec = 13 * 3600 + 35 * 60 + 29;
setInterval(() => {
    if (sec <= 0) return;
    sec--;
    const h = document.getElementById('hours');
    const m = document.getElementById('minutes');
    const s = document.getElementById('seconds');
    if (h && m && s) {
        h.textContent = toFa(String(Math.floor(sec / 3600)).padStart(2, '0'));
        m.textContent = toFa(String(Math.floor((sec % 3600) / 60)).padStart(2, '0'));
        s.textContent = toFa(String(sec % 60).padStart(2, '0'));
    }
}, 1000);

// ۳. فیلتر دسته‌بندی‌ها
const filterBtns = document.querySelectorAll('.filter-btn');
const navItems = document.querySelectorAll('[data-nav-cat]');
const cards = document.querySelectorAll('.card');

function filterProducts(cat) {
    cards.forEach(c => {
        c.style.display = (cat === 'all' || c.getAttribute('data-cat') === cat) ? 'block' : 'none';
    });
    filterBtns.forEach(b => b.classList.toggle('active', b.getAttribute('data-cat') === cat));
    navItems.forEach(n => n.classList.toggle('active', n.getAttribute('data-nav-cat') === cat));
}

filterBtns.forEach(btn => btn.addEventListener('click', () => filterProducts(btn.getAttribute('data-cat'))));
navItems.forEach(item => item.addEventListener('click', () => {
    filterProducts(item.getAttribute('data-nav-cat'));
    if (navLinks) navLinks.classList.remove('show');
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
}));

// ۴. جستجو
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
function doSearch(word) {
    const q = word.trim().toLowerCase();
    cards.forEach(c => {
        const title = c.getAttribute('data-title').toLowerCase();
        c.style.display = title.includes(q) ? 'block' : 'none';
    });
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
}
if (searchForm) {
    searchForm.addEventListener('submit', e => { e.preventDefault(); doSearch(searchInput.value); });
}
document.querySelectorAll('.tag-btn').forEach(t => {
    t.addEventListener('click', () => {
        searchInput.value = t.getAttribute('data-word');
        doSearch(searchInput.value);
    });
});

// ۵. سبد خرید
let cart = JSON.parse(localStorage.getItem('nexra_cart') || '[]');
const cartCount = document.getElementById('cartCount');
const cartItemsList = document.getElementById('cartItemsList');
const cartTotalPrice = document.getElementById('cartTotalPrice');

function renderCart() {
    localStorage.setItem('nexra_cart', JSON.stringify(cart));
    if (cartCount) cartCount.textContent = toFa(cart.length);
    if (!cartItemsList || !cartTotalPrice) return;

    if (cart.length === 0) {
        cartItemsList.innerHTML = '<p style="text-align:center; color:#64748b; padding:15px;">سبد خرید شما خالی است.</p>';
        cartTotalPrice.textContent = '۰ تومان';
        return;
    }
    let total = 0;
    cartItemsList.innerHTML = cart.map((item, idx) => {
        total += Number(item.price);
        return `
            <div class="cart-item">
                <div>
                    <strong>${item.name}</strong>
                    <div style="color:#059669; font-size:0.78rem;">${formatPrice(item.price)}</div>
                </div>
                <button class="cart-item-remove" onclick="removeFromCart(${idx})">حذف</button>
            </div>
        `;
    }).join('');
    cartTotalPrice.textContent = formatPrice(total);
}

window.removeFromCart = function(index) {
    cart.splice(index, 1);
    renderCart();
};

document.querySelectorAll('.buy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        cart.push({
            name: btn.getAttribute('data-name'),
            price: Number(btn.getAttribute('data-price'))
        });
        renderCart();
        showToast('محصول به سبد خرید اضافه شد! 🛒');
    });
});

renderCart();

// ۶. باز و بسته کردن پنجره‌ها
document.getElementById('openAuthBtn')?.addEventListener('click', () => document.getElementById('authModal').classList.add('active'));
document.getElementById('openCartBtn')?.addEventListener('click', () => document.getElementById('cartModal').classList.add('active'));
document.getElementById('openProBtn')?.addEventListener('click', () => document.getElementById('proModal').classList.add('active'));

document.querySelectorAll('[data-close]').forEach(btn => {
    btn.addEventListener('click', () => document.getElementById(btn.getAttribute('data-close')).classList.remove('active'));
});

document.getElementById('authForm')?.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('userNameInput').value;
    document.getElementById('authBtnText').textContent = name;
    document.getElementById('authModal').classList.remove('active');
    showToast(`خوش آمدید ${name} عزیز! 👋`);
});

document.getElementById('buyProPlanBtn')?.addEventListener('click', () => {
    cart.push({ name: 'اشتراک ویژه پرو (۱ ماهه)', price: 790000 });
    renderCart();
    document.getElementById('proModal').classList.remove('active');
    showToast('اشتراک پرو به سبد خرید اضافه شد! 👑');
});

document.getElementById('checkoutBtn')?.addEventListener('click', () => {
    if (cart.length === 0) {
        showToast('ابتدا یک محصول به سبد خرید اضافه کنید!');
        return;
    }
    cart = [];
    renderCart();
    document.getElementById('cartModal').classList.remove('active');
    showToast('سفارش شما با موفقیت ثبت شد! 🎉');
});
