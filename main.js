// Range input ve diğer öğeleri al
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
    rangeValueSpan.textContent = rangeInput.value;  // Span içeriğini güncelle
    updateRangeFill(); // Dolguyu güncelle
}

// Range inputu her değiştiğinde span'ı ve dolguyu güncelle
rangeInput.addEventListener("input", updateRangeValue);

// Azaltma butonuna tıklanınca
decreaseButton.addEventListener("click", () => {
    if (+rangeInput.value > +rangeInput.min) {
        rangeInput.value = parseInt(rangeInput.value) - 1;
        updateRangeValue(); // Değer ve dolguyu güncelle
    }
});

// Arttırma butonuna tıklanınca
increaseButton.addEventListener("click", () => {
    if (+rangeInput.value < +rangeInput.max) {
        rangeInput.value = parseInt(rangeInput.value) + 1;
        updateRangeValue(); // Değer ve dolguyu güncelle
    }
});

// Azaltma butonuna basılı tutulduğunda sürekli azaltma
let decreaseInterval;
decreaseButton.addEventListener("mousedown", () => {
    decreaseInterval = setInterval(() => {
        if (+rangeInput.value > +rangeInput.min) {
            rangeInput.value = parseInt(rangeInput.value) - 1;
            updateRangeValue(); // Değer ve dolguyu güncelle
        }
    }, 100); // Her 100ms'de bir azalt
});

// Arttırma butonuna basılı tutulduğunda sürekli arttırma
let increaseInterval;
increaseButton.addEventListener("mousedown", () => {
    increaseInterval = setInterval(() => {
        if (+rangeInput.value < +rangeInput.max) {
            rangeInput.value = parseInt(rangeInput.value) + 1;
            updateRangeValue(); // Değer ve dolguyu güncelle
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


