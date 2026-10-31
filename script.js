// ۱. باز و بسته کردن منوی موبایل
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('show');
        const icon = menuToggle.querySelector('i');
        if (navLinks.classList.contains('show')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// ۲. تبدیل اعداد انگلیسی به فارسی برای تایمر
function toPersianDigits(num) {
    const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return String(num).padStart(2, '0').replace(/\d/g, x => persianDigits[x]);
}

// ۳. تایمر شمارش معکوس زنده
let totalSeconds = (13 * 3600) + (25 * 60) + 29; // ۱۳ ساعت و ۲۵ دقیقه و ۲۹ ثانیه

function updateCountdown() {
    if (totalSeconds <= 0) return;
    totalSeconds--;

    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    document.getElementById('days').textContent = toPersianDigits(days);
    document.getElementById('hours').textContent = toPersianDigits(hours);
    document.getElementById('minutes').textContent = toPersianDigits(minutes);
    document.getElementById('seconds').textContent = toPersianDigits(seconds);
}

setInterval(updateCountdown, 1000);
