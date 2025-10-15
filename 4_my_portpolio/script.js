document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // "VIEW MY PROJECTS" button click
    const viewProjectsButton = document.querySelector('.view-projects-button');
    if (viewProjectsButton) {
        viewProjectsButton.addEventListener('click', () => {
            // For now, we'll just scroll to the projects section.
            // Later, this could navigate to a separate projects page.
            document.querySelector('#projects').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
});
