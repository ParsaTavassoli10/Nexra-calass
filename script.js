// ۱. مدیریت منوی کشویی موبایل
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const closeMenuBtn = document.getElementById('closeMenuBtn');
const navMenu = document.getElementById('navMenu');

if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => navMenu.classList.add('open'));
    closeMenuBtn.addEventListener('click', () => navMenu.classList.remove('open'));
}

// ۲. تبدیل اعداد انگلیسی به فارسی
function toPersianNum(num) {
    const persian = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return String(num).padStart(2, '0').replace(/\d/g, x => persian[x]);
}

// ۳. تایمر معکوس بالای صفحه
let timeLeft = (13 * 3600) + (35 * 60) + 29;
setInterval(() => {
    if (timeLeft <= 0) return;
    timeLeft--;
    const h = Math.floor(timeLeft / 3600);
    const m = Math.floor((timeLeft % 3600) / 60);
    const s = timeLeft % 60;

    document.getElementById('hours').textContent = toPersianNum(h);
    document.getElementById('minutes').textContent = toPersianNum(m);
    document.getElementById('seconds').textContent = toPersianNum(s);
}, 1000);

// ۴. فیلتر دسته‌بندی محصولات
const filterBtns = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');
        productCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// ۵. جستجوی زنده روی کارت‌های محصول و تگ‌های پیشنهادی
const searchInput = document.getElementById('searchInput');
const searchForm = document.getElementById('searchForm');
const tagChips = document.querySelectorAll('.tag-chip');

function filterBySearch(query) {
    const q = query.trim();
    productCards.forEach(card => {
        const title = card.getAttribute('data-title');
        card.style.display = title.includes(q) ? 'block' : 'none';
    });
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
}

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    filterBySearch(searchInput.value);
});

tagChips.forEach(chip => {
    chip.addEventListener('click', () => {
        const keyword = chip.getAttribute('data-search');
        searchInput.value = keyword;
        filterBySearch(keyword);
    });
});

// ۶. افزودن به سبد خرید و نمایش نوتیفیکیشن
let cartItems = 0;
const cartCount = document.getElementById('cartCount');
const toast = document.getElementById('toast');
const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');

addToCartBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        cartItems++;
        cartCount.textContent = toPersianNum(cartItems);
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2500);
    });
});
