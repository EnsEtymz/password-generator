const rangeInput = document.getElementById("passwordRange");
const decreaseButton = document.getElementById("decrease");
const increaseButton = document.getElementById("increase");
const rangeValueInput = document.getElementById("rangeValue");
const includeUppercase = document.getElementById("includeUppercase");
const includeNumbers = document.getElementById("includeNumbers");
const includeSymbols = document.getElementById("includeSymbols");
const includeLowercase = document.getElementById("includeLowercase");
const excludeSimilar = document.getElementById("excludeSimilar");
const excludeAmbiguous = document.getElementById("excludeAmbiguous");
const token = document.getElementById("token");
const saveSettingsButton = document.getElementById("save-settings-button");
const settingsModal = document.getElementById("settings-modal");
const passwordNameInput = document.getElementById("passwordNameInput");

function getCookie(name) {
    const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
    return match ? decodeURIComponent(match[2]) : null;
}

// ** Cookie’ye veri kaydetme fonksiyonu **
function setCookie(name, value, days = 30) {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/`;
}

// Range dolgusu (fill) güncelleme fonksiyonu
function updateRangeFill() {
    const value =
        ((rangeInput.value - rangeInput.min) / (rangeInput.max - rangeInput.min)) *
        100;
    rangeInput.style.setProperty("--fill", `${value}%`);
}

// Range değeri güncelleme fonksiyonu
function updateRangeValue() {
    rangeValueInput.value = rangeInput.value;
    updateRangeFill();
}

// Input sadece sayı almalı
rangeValueInput.addEventListener("keypress", (event) => {
    if (!/^\d$/.test(event.key)) {
        event.preventDefault();
    }
});

// Input değeri değiştiğinde güncelle (Enter veya dışarı tıklama)
function validateAndUpdateInput() {
    let newValue = parseInt(rangeValueInput.value, 10);

    // Girilen değeri 6-128 arasında sınırla
    if (isNaN(newValue) || newValue < 6) newValue = 6;
    if (newValue > 128) newValue = 128;

    // Range ve input'u güncelle
    rangeInput.value = newValue;
    updateRangeValue();
}

// Enter basıldığında güncelle
rangeValueInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        validateAndUpdateInput();
        rangeValueInput.blur(); // Odağı kaldır
    }
});

// Dışına tıklanınca güncelle
rangeValueInput.addEventListener("blur", validateAndUpdateInput);

// Range input değiştiğinde güncelle
rangeInput.addEventListener("input", updateRangeValue);

// Azaltma butonu
decreaseButton.addEventListener("click", () => {
    if (+rangeInput.value > +rangeInput.min) {
        rangeInput.value = parseInt(rangeInput.value) - 1;
        updateRangeValue(); // Değer ve dolguyu güncelle
    }
});

// Arttırma butonu
increaseButton.addEventListener("click", () => {
    if (+rangeInput.value < +rangeInput.max) {
        rangeInput.value = parseInt(rangeInput.value) + 1;
        updateRangeValue(); // Değer ve dolguyu güncelle
    }
});

// Azaltma butonuna basılı tutulduğunda
let decreaseInterval;
decreaseButton.addEventListener("mousedown", () => {
    decreaseInterval = setInterval(() => {
        if (+rangeInput.value > +rangeInput.min) {
            rangeInput.value = parseInt(rangeInput.value) - 1;
            updateRangeValue();
        }
    }, 100); // Her 100ms'de bir azalt
});

// Arttırma butonuna basılı tutulduğunda
let increaseInterval;
increaseButton.addEventListener("mousedown", () => {
    increaseInterval = setInterval(() => {
        if (+rangeInput.value < +rangeInput.max) {
            rangeInput.value = parseInt(rangeInput.value) + 1;
            updateRangeValue();
        }
    }, 100); // Her 100ms'de bir arttır
});

// Mouse tuşu bırakıldığında aralık durdurulacak
document.addEventListener("mouseup", () => {
    clearInterval(decreaseInterval);
    clearInterval(increaseInterval);
});

// Sayfa yüklendiğinde başlangıç değerini güncelle
window.addEventListener("load", updateRangeValue);

const generateCopyButton = document.getElementById("generate-copy-button");
const textToCopy = "DHCI749JeGebDHCI749JeGeb"; // Kopyalanacak metin

generateCopyButton.addEventListener("click", (event) => {
    event.preventDefault();

    navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
            generateCopyButton.textContent = "Copied!";
            setTimeout(() => {
                generateCopyButton.textContent = "Generate & Copy";
            }, 2000);
        })
        .catch((err) => {
            console.error("Kopyalama işlemi başarısız oldu: ", err);
        });
    setCookieAll();
});

const savedButton = document.getElementById("saved-button");
const checkIcon = document.getElementById("check-icon");
const buttonText = document.getElementById("button-text");

savedButton.addEventListener("click", (event) => {
    event.preventDefault();

    // Tik SVG'sini göster
    buttonText.classList.add("hidden");
    checkIcon.classList.remove("hidden");

    // 2 saniye sonra eski haline döndür
    setTimeout(() => {
        checkIcon.classList.add("hidden");
        buttonText.classList.remove("hidden");
    }, 2000);
});

const copyButton = document.getElementById("copy-button");
const copiedButton = document.getElementById("copied-button");
const textToCopyb = document.getElementById("text-to-copy");

copyButton.addEventListener("click", () => {
    navigator.clipboard
        .writeText(textToCopyb.textContent)
        .then(() => {
            copiedButton.classList.remove("hidden");
            copyButton.classList.add("hidden");

            setTimeout(() => {
                copiedButton.classList.add("hidden");
                copyButton.classList.remove("hidden");
            }, 2000);
        })
        .catch((err) => {
            console.error("Kopyalama işlemi başarısız oldu: ", err);
        });
});

function closeModal() {
    document.getElementById("password-modal").style.display = "none";
}
function openModal() {
    const modal = document.getElementById("password-modal");
    const content = document.getElementById("password-content");
    const skeleton = document.getElementById("password-skeleton");

    if (modal.style.display === "flex") {
        content.style.display = "none";
        skeleton.style.display = "flex";
        setTimeout(() => {
            content.style.display = "block";
            skeleton.style.display = "none";
        }, 700);
    } else {
        modal.style.display = "flex";
    }
    setCookieAll();
}

function setCookieAll() {
    setCookie("passwordLength", rangeInput.value);
    setCookie("includeUppercase", includeUppercase.checked);
    setCookie("includeNumbers", includeNumbers.checked);
    setCookie("includeSymbols", includeSymbols.checked);
    setCookie("includeLowercase", includeLowercase.checked);
    setCookie("excludeSimilar", excludeSimilar.checked);
    setCookie("excludeAmbiguous", excludeAmbiguous.checked);
    setCookie("token", token.value);
}

window.addEventListener("load", () => {
    const passwordLength = getCookie("passwordLength") ?? 12;
    const includeUppercaseChecked = getCookie("includeUppercase")?? "true";
    const includeNumbersChecked = getCookie("includeNumbers") ?? "true";
    const includeSymbolsChecked = getCookie("includeSymbols") ?? "false";
    const includeLowercaseChecked = getCookie("includeLowercase") ?? "true";
    const excludeSimilarChecked = getCookie("excludeSimilar") ?? "true";
    const excludeAmbiguousChecked = getCookie("excludeAmbiguous")??"true";
    const tokenValue = getCookie("token");

    rangeInput.value = passwordLength || 12;
    includeUppercase.checked = includeUppercaseChecked === "true";
    includeNumbers.checked = includeNumbersChecked === "true";
    includeSymbols.checked = includeSymbolsChecked === "true";
    includeLowercase.checked = includeLowercaseChecked === "true";
    excludeSimilar.checked = excludeSimilarChecked === "true";
    excludeAmbiguous.checked = excludeAmbiguousChecked === "true";
    token.value = tokenValue || "";

    updateRangeValue();
});

saveSettingsButton.addEventListener("click", () => {
    setCookieAll();
}
);

const observer = new MutationObserver(() => {
    if (settingsModal.classList.contains("flex")) {
        token.focus();
    }
});

observer.observe(settingsModal, { attributes: true, attributeFilter: ["class"] });

function adjustInputWidth() {
    const minWidth = 44; // px (md:min-w-44)
    const maxWidth = 535; // px
    const newWidth = Math.min((passwordNameInput.value.length + 1) * 8, maxWidth);
    
    passwordNameInput.style.width = newWidth + "px";
    if (newWidth < minWidth) {
      passwordNameInput.style.width = minWidth + "px";
    }
  }

  passwordNameInput.addEventListener("input", adjustInputWidth);