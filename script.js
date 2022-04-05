const wrapper = document.querySelector(".wrapper");
const qrInput = wrapper.querySelector(".form input");
const generateBtn = wrapper.querySelector(".generate-btn");
const qrCode = wrapper.querySelector(".qrcode");
const qrImg = wrapper.querySelector(".qrcode img");
const valueText = wrapper.querySelector(".qrcode .value");
const clearBtn = document.querySelector(".clear-input");

let preValue;

function loadQr() {
	let qrValue = qrInput.value.trim();

	if (!qrValue || preValue === qrValue) return;
	preValue = qrValue;
	valueText.innerHTML = preValue;
	generateBtn.innerText = "Generating QR Code...";
	generateBtn.classList.add("generating");
	qrImg.src = `http://api.qrserver.com/v1/create-qr-code/?data=${qrValue}&size=100x100`;
	qrImg.addEventListener("load", () => {
		qrCode.classList.add("active");
		generateBtn.innerText = "Generate QR Code";
		generateBtn.classList.remove("generating");
	});
}

clearBtn.addEventListener("click", () => {
	qrCode.classList.remove("active");
	qrInput.value = "";
	qrInput.focus();
	clearBtn.classList.add("hidden");
});

generateBtn.addEventListener("click", (e) => {
	e.preventDefault();
	loadQr();
});

qrInput.addEventListener("keyup", (e) => {
	e.preventDefault();
	if (qrInput.value.length > 0) {
		clearBtn.classList.remove("hidden");
	} else {
		clearBtn.classList.add("hidden");
	}

	if (e.keyCode === 13) {
		generateBtn.click();
		qrInput.blur();
	}

	if (!qrInput.value.trim()) {
		qrCode.classList.remove("active");
		preValue = "";
	}
});
