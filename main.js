const rangeInput = document.getElementById("passwordRange");
const decreaseButton = document.getElementById("decrease");
const increaseButton = document.getElementById("increase");
const rangeValueSpan = document.getElementById("rangeValue");

// Range değeri için dolgu (fill) güncelleme fonksiyonu
function updateRangeFill() {
    const value =
        ((rangeInput.value - rangeInput.min) / (rangeInput.max - rangeInput.min)) * 100;
    rangeInput.style.setProperty("--fill", `${value}%`);
}

// Range değeri için span içeriğini güncelleme fonksiyonu
function updateRangeValue() {
    rangeValueSpan.textContent = rangeInput.value;
    updateRangeFill();
}

// Range inputu her değiştiğinde span'ı ve dolguyu güncelle
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


    navigator.clipboard.writeText(textToCopy)
        .then(() => {
            generateCopyButton.textContent = "Copied!";
            setTimeout(() => {
                generateCopyButton.textContent = "Generate & Copy";
            }, 2000);
        })
        .catch((err) => {
            console.error("Kopyalama işlemi başarısız oldu: ", err);
        });
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
        skeleton.style.display = "block";
        setTimeout(() => {
            content.style.display = "block";
            skeleton.style.display = "none";
        }, 700);
    } else {
        modal.style.display = "flex";


    }
}


