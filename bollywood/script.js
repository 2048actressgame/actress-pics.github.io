let downloadTimer;

function showPopup(button) {
  const imageSrc = button.previousElementSibling.src; // Get image source
  const popup = document.getElementById("popup");
  const popupImg = document.getElementById("popup-img");

  popupImg.src = imageSrc; // Set popup image
  popup.classList.remove("hidden"); // Show popup
}

function closePopup() {
  const popup = document.getElementById("popup");
  const countdownText = document.getElementById("countdown-text");

  clearTimeout(downloadTimer);
  countdownText.classList.add("hidden");
  countdownText.textContent = "";
  popup.classList.add("hidden"); // Hide popup
}

function startDownload() {
  const countdownText = document.getElementById("countdown-text");
  const popupDownloadBtn = document.getElementById("popup-download-btn");

  popupDownloadBtn.disabled = true; // Disable button during countdown

  let seconds = 5;
  countdownText.classList.remove("hidden");

  // Countdown logic
  downloadTimer = setInterval(() => {
    countdownText.textContent = `Downloading in ${seconds} seconds...`;
    seconds--;

    if (seconds < 0) {
      clearInterval(downloadTimer);
      downloadImage(); // Initiate download
      countdownText.textContent = "";
      popupDownloadBtn.disabled = false; // Re-enable button
      countdownText.classList.add("hidden");
    }
  }, 1000);
}

function downloadImage() {
  const popupImg = document.getElementById("popup-img");
  const link = document.createElement("a");

  link.href = popupImg.src; // Image source
  link.download = "image.jpg"; // Download filename
  link.click();
}
