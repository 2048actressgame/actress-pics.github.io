<script>
  const modal = document.getElementById('imageModal');
  const modalImage = modal.querySelector('img');
  const closeModal = document.getElementById('closeModal');
  const downloadButton = document.getElementById('downloadButton');
  const countdownText = document.getElementById('countdownText');

  let countdownTimer;
  let downloadReady = false;

  document.querySelectorAll('.box img').forEach((img) => {
    img.addEventListener('click', () => {
      modalImage.src = img.src; // Set modal image source
      modalImage.alt = img.alt; // Set modal image alt
      downloadReady = false; // Reset state to first-time click
      downloadButton.dataset.image = img.src; // Save image source in data attribute
      modal.style.display = 'flex'; // Show modal
      countdownText.style.display = 'none'; // Hide countdown text
      downloadButton.disabled = false; // Re-enable button
      downloadButton.textContent = 'Download'; // Reset button text
    });
  });

  closeModal.addEventListener('click', () => {
    modal.style.display = 'none'; // Hide modal
    clearTimeout(countdownTimer); // Clear any active countdown
  });

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
      clearTimeout(countdownTimer); // Clear any active countdown
    }
  });

  downloadButton.addEventListener('click', () => {
    if (!downloadReady) {
      // First-time click, start countdown
      let secondsLeft = 5;
      downloadReady = true; // Mark as ready for direct download next time
      downloadButton.disabled = true; // Disable the button during countdown
      countdownText.style.display = 'block'; // Show countdown text

      countdownTimer = setInterval(() => {
        if (secondsLeft > 0) {
          countdownText.textContent = `Downloading in ${secondsLeft--} seconds...`;
        } else {
          clearInterval(countdownTimer);
          downloadButton.disabled = false; // Re-enable button after countdown
          downloadButton.textContent = 'Download Now'; // Update button text
          countdownText.style.display = 'none'; // Hide countdown text

          // Trigger the download automatically
          downloadImage(downloadButton.dataset.image);
        }
      }, 1000);
    } else {
      // Direct download on subsequent clicks
      downloadImage(downloadButton.dataset.image);
    }
  });

  function downloadImage(imageSrc) {
    const link = document.createElement('a');
    link.href = imageSrc;
    link.download = 'image.jpg'; // Filename for download
    link.click();
  }
</script>
