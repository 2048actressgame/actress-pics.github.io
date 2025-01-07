<script>
  // JavaScript for modal functionality with timer-based download
  const modal = document.getElementById('imageModal');
  const modalImage = modal.querySelector('img');
  const closeModal = document.getElementById('closeModal');
  const downloadButton = document.getElementById('downloadButton');
  const countdownText = document.getElementById('countdownText');

  let countdownTimer;

  document.querySelectorAll('.box img').forEach(img => {
    img.addEventListener('click', () => {
      modalImage.src = img.src; // Set modal image source
      modalImage.alt = img.alt; // Set modal image alt
      downloadButton.dataset.image = img.src; // Save image source in data attribute
      modal.style.display = 'flex'; // Show modal
      countdownText.style.display = 'none'; // Hide countdown text initially
      downloadButton.disabled = false; // Re-enable button
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
    let secondsLeft = 5;
    downloadButton.disabled = true; // Disable the button during countdown
    countdownText.style.display = 'block'; // Show countdown text

    countdownTimer = setInterval(() => {
      if (secondsLeft > 0) {
        countdownText.textContent = `Downloading in ${secondsLeft--} seconds...`;
      } else {
        clearInterval(countdownTimer);
        downloadButton.disabled = false;
        downloadImage(downloadButton.dataset.image); // Trigger download
        countdownText.style.display = 'none'; // Hide countdown text after download
      }
    }, 1000);
  });

  function downloadImage(imageSrc) {
    const link = document.createElement('a');
    link.href = imageSrc;
    link.download = 'image.jpg'; // Filename for download
    link.click();
  }
</script>
