const form = document.getElementById("generate-form");
const qr = document.getElementById("qrcode");

const onGenerateSubmit = (e) => {
  e.preventDefault();

  clearUI();

  const url = document.getElementById("url").value;
  const size = document.getElementById("size").value;

  if (url === "") {
    alert("Please enter a url");
  } else {
    showSpinner();

    setTimeout(() => {
      hideSpinner();

      generateCode(url, size);

      setTimeout(() => {
        const saveUrl = qr.querySelector("img").src;
        createSaveBtn(saveUrl);
      }, 50);
    }, 1000);
  }
};

// generate QR code
const generateCode = (url, size) => {
  const code = new QRCode("qrcode", {
    text: url,
    width: size,
    height: size,
  });
};

// Show the spinner
const showSpinner = () => {
  document.getElementById("spinner").style.display = "block";
};

// hide the spinner
const hideSpinner = () => {
  document.getElementById("spinner").style.display = "none";
};

// clear the UI
const clearUI = () => {
  qr.innerHTML = "";
  const saveBtn = document.getElementById("save-link");
  if (saveBtn) saveBtn.remove();
};

// generate save button with the codes
const createSaveBtn = (saveUrl) => {
  const link = document.createElement("a");
  link.id = "save-link";
  link.classList =
    "bg-gray-600 hover:bg-black text-white font-bold py-2 rounded w-1/3 m-auto my-5";
  link.href = saveUrl;
  link.download = "qrcode";
  link.innerHTML = "Save Image";
  document.getElementById("generated").appendChild(link);
};

hideSpinner();

form.addEventListener("submit", onGenerateSubmit);
