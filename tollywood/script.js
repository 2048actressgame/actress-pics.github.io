// Function to load a component into a specific element
function loadComponent(id, file) {
  fetch(file)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to load ${file}`);
      }
      return response.text();
    })
    .then(data => {
      document.getElementById(id).innerHTML = data;
    })
    .catch(error => console.error(error));
}

// Load header, sidebar, and footer
loadComponent('header', 'header.html');
loadComponent('sidebar', 'sidebar.html');
loadComponent('footer', 'footer.html');

function startDownloadTimer() {
            let countdown = 7;
            timerOverlay.style.display = 'flex';
            countdownElement.textContent = countdown;

            const timer = setInterval(() => {
                countdown--;
                countdownElement.textContent = countdown;

                if (countdown <= 0) {
                    clearInterval(timer);
                    downloadImage(currentImageUrl);
                    timerOverlay.style.display = 'none';
                    modal.style.display = 'none';
                }
            }, 1000);

            downloadTimeout = timer;
        }


        function downloadImage(url) {
            fetch(url)
                .then(response => response.blob())
                .then(blob => {
                    const blobUrl = window.URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = blobUrl;
                    link.download = url.split('/').pop();
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    window.URL.revokeObjectURL(blobUrl);
                })
                .catch(error => console.error('Download failed:', error));
        }

        modalImage.addEventListener('click', () => {
            startDownloadTimer();
        });

        modalDownloadBtn.addEventListener('click', () => {
            downloadImage(currentImageUrl);
        });

        document.querySelector('.close-btn').addEventListener('click', () => {
            modal.style.display = 'none';
            timerOverlay.style.display = 'none';
            if (downloadTimeout) {
                clearTimeout(downloadTimeout);
            }
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
                timerOverlay.style.display = 'none';
                if (downloadTimeout) {
                    clearTimeout(downloadTimeout);
                }
            }
        });
