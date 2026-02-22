// Единственный номер телефона
const PHONE_NUMBER = '89180085040';

// Функция звонка
function callPhone() {
    try {
        const cleanNumber = PHONE_NUMBER.replace(/\D/g, '');
        const telNumber = '+7' + cleanNumber.substring(1);
        window.location.href = `tel:${telNumber}`;
    } catch (error) {
        alert(`Позвоните по номеру: 8 (918) 008-50-40`);
    }
}

// ========== ПЛАВНАЯ ПРОКРУТКА (ИСПРАВЛЕНО) ==========
function setupSmoothScroll() {
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const header = document.querySelector('.header');
                const headerHeight = header ? header.offsetHeight : 0;
                
                // Получаем позицию элемента относительно верха документа
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                
                // Вычисляем позицию с учетом высоты шапки
                const offsetPosition = elementPosition - headerHeight - 20; // -20 для небольшого отступа
                
                // Плавно прокручиваем к вычисленной позиции
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Обновляем URL без прыжка
                history.pushState(null, null, targetId);
            }
        });
    });
}

// ========== СЛАЙДЕР ОТЗЫВОВ ==========
class ReviewsSlider {
    constructor() {
        this.slides = document.querySelectorAll('.review-slide');
        this.prevBtn = document.querySelector('.slider-arrow.prev');
        this.nextBtn = document.querySelector('.slider-arrow.next');
        this.currentIndex = 0;
        this.autoSlideInterval = null;
        this.init();
    }
    
    init() {
        if (this.slides.length === 0) return;
        
        this.showSlide(0);
        
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prevSlide());
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.nextSlide());
        }
        
        this.startAutoSlide();
    }
    
    showSlide(index) {
        this.slides.forEach(slide => slide.classList.remove('active'));
        this.slides[index].classList.add('active');
        this.currentIndex = index;
    }
    
    nextSlide() {
        let newIndex = this.currentIndex + 1;
        if (newIndex >= this.slides.length) newIndex = 0;
        this.showSlide(newIndex);
        this.resetAutoSlide();
    }
    
    prevSlide() {
        let newIndex = this.currentIndex - 1;
        if (newIndex < 0) newIndex = this.slides.length - 1;
        this.showSlide(newIndex);
        this.resetAutoSlide();
    }
    
    startAutoSlide() {
        this.autoSlideInterval = setInterval(() => this.nextSlide(), 5000);
    }
    
    resetAutoSlide() {
        clearInterval(this.autoSlideInterval);
        this.startAutoSlide();
    }
}

// ========== СЛАЙДЕР ТРЕНЕРОВ ==========
class TrainersCarousel {
    constructor() {
        this.track = document.querySelector('.carousel-track');
        this.slides = document.querySelectorAll('.carousel-slide');
        this.prevBtn = document.querySelector('.prev-btn');
        this.nextBtn = document.querySelector('.next-btn');
        this.dotsContainer = document.querySelector('.carousel-dots');
        
        if (!this.track || !this.slides.length) return;
        
        this.currentIndex = 0;
        this.slidesPerView = this.getSlidesPerView();
        this.totalSlides = this.slides.length;
        this.maxIndex = Math.max(0, this.totalSlides - this.slidesPerView);
        
        this.init();
    }
    
    getSlidesPerView() {
        const width = window.innerWidth;
        if (width <= 480) return 1;
        if (width <= 768) return 2;
        if (width <= 1024) return 3;
        return 4;
    }
    
    init() {
        this.createDots();
        this.updateSlider();
        this.addEventListeners();
        
        window.addEventListener('resize', () => {
            this.slidesPerView = this.getSlidesPerView();
            this.maxIndex = Math.max(0, this.totalSlides - this.slidesPerView);
            this.currentIndex = Math.min(this.currentIndex, this.maxIndex);
            this.updateSlider();
            this.updateDots();
        });
    }
    
    createDots() {
        if (!this.dotsContainer) return;
        
        this.dotsContainer.innerHTML = '';
        for (let i = 0; i <= this.maxIndex; i++) {
            const dot = document.createElement('button');
            dot.classList.add('dot');
            if (i === this.currentIndex) dot.classList.add('active');
            dot.addEventListener('click', () => this.goToSlide(i));
            this.dotsContainer.appendChild(dot);
        }
    }
    
    updateDots() {
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, i) => {
            if (i === this.currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    updateSlider() {
        const slideWidth = this.slides[0].offsetWidth;
        const gap = 20;
        const offset = this.currentIndex * (slideWidth + gap);
        this.track.style.transform = `translateX(-${offset}px)`;
    }
    
    goToSlide(index) {
        this.currentIndex = index;
        this.updateSlider();
        this.updateDots();
    }
    
    nextSlide() {
        if (this.currentIndex < this.maxIndex) {
            this.currentIndex++;
        } else {
            this.currentIndex = 0;
        }
        this.updateSlider();
        this.updateDots();
    }
    
    prevSlide() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
        } else {
            this.currentIndex = this.maxIndex;
        }
        this.updateSlider();
        this.updateDots();
    }
    
    addEventListeners() {
        if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.prevSlide());
        if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.nextSlide());
    }
}

// ========== ИНИЦИАЛИЗАЦИЯ ==========
document.addEventListener('DOMContentLoaded', function() {
    console.log('Страница загружена');
    
    setupSmoothScroll();
    
    if (document.querySelector('.review-slide')) {
        new ReviewsSlider();
    }
    
    if (document.querySelector('.carousel-track')) {
        new TrainersCarousel();
    }
    
    document.querySelectorAll('.call-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            callPhone();
        });
    });
});

// Исправление для мобильных устройств при изменении ориентации
window.addEventListener('orientationchange', function() {
    setTimeout(() => {
        window.scrollTo({
            top: window.scrollY,
            behavior: 'auto'
        });
    }, 100);
});