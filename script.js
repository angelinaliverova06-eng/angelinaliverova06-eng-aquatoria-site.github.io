// Slider functionality
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for navigation
    setupSmoothScroll();
    
    // Slider dots functionality
    setupSliderDots();
    
    // Trainer "Подробнее" button
    setupTrainerButton();
});

function setupSmoothScroll() {
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

function setupSliderDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot) => {
        dot.addEventListener('click', function() {
            dots.forEach(d => d.classList.remove('active'));
            this.classList.add('active');
            
            // Здесь можно добавить логику для переключения отзывов
            // Например, загрузить другой отзыв по индексу
            const index = this.getAttribute('data-index');
            console.log('Показать отзыв с индексом:', index);
        });
    });
}

function setupTrainerButton() {
    const moreButton = document.querySelector('.btn-more');
    if (moreButton) {
        moreButton.addEventListener('click', showAllTrainers);
    }
}

function showAllTrainers() {
    alert('Здесь будет отображена подробная информация обо всех тренерах. В реальном проекте можно загрузить дополнительный контент или перейти на страницу с полным списком.');
}

function scrollToSection(sectionId) {
    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
        targetElement.scrollIntoView({
            behavior: 'smooth'
        });
    }
}