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
