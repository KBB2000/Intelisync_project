document.addEventListener('DOMContentLoaded', function() {
    const navItems = document.querySelectorAll('.nav-item');
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const currentPage = window.location.pathname.split('/').pop() || 'dashboard.html';

    menuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('show');
        document.body.classList.toggle('sidebar-open');
    });

    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768 && 
            !sidebar.contains(e.target) && 
            !menuToggle.contains(e.target) && 
            sidebar.classList.contains('show')) {
            sidebar.classList.remove('show');
            document.body.classList.remove('sidebar-open');
        }
    });

    navItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href === currentPage) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
                return;
            }
            navItems.forEach(navItem => navItem.classList.remove('active'));
            this.classList.add('active');

            if (window.innerWidth <= 768) {
                sidebar.classList.remove('show');
                document.body.classList.remove('sidebar-open');
            }
        });
    });
});
const menuToggle = document.getElementById('menu-toggle');
const sidebar = document.getElementById('sidebar');

menuToggle.addEventListener('click', () => {
  sidebar.classList.toggle('show');
});
