// کدهای ساده برای تایمر بالای سایت
// این کد یک تایمر 13 ساعت و 35 دقیقه و 43 ثانیه ای را شروع می‌کند

let hours = 13;
let minutes = 35;
let seconds = 43;

function updateTimer() {
    seconds--;
    if (seconds < 0) {
        seconds = 59;
        minutes--;
        if (minutes < 0) {
            minutes = 59;
            hours--;
            if (hours < 0) {
                hours = 23; // ریست کردن
            }
        }
    }

    // تبدیل به اعداد فارسی
    const toPersianNum = (num) => String(num).padStart(2, '0').replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]);

    document.getElementById('hours').innerText = toPersianNum(hours);
    document.getElementById('minutes').innerText = toPersianNum(minutes);
    document.getElementById('seconds').innerText = toPersianNum(seconds);
}

setInterval(updateTimer, 1000);
