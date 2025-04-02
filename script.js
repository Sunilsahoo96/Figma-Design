
document.addEventListener('DOMContentLoaded', function() {
    // Header Search Box Toggle
    const searchIcon = document.querySelector('.search-icon');
    const searchBox = document.querySelector('.search-box');
    const mobileNavigation = document.querySelector('.mobile-nav');
    
    searchIcon.addEventListener('click', function (event) {
        searchBox.classList.toggle('open');
        mobileNavigation.classList.toggle('hidden'); 
        event.stopPropagation(); 
    });
    
    // Close search box and show mobile nav when clicking outside
    document.addEventListener('click', function (event) {
        if (!searchBox.contains(event.target) && !searchIcon.contains(event.target)) {
            searchBox.classList.remove('open');
            mobileNavigation.classList.remove('hidden'); 
        }
    });
    

    // Hamburger Menu Toggle
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mobileNav = document.querySelector('.mobile-nav');
    hamburgerMenu.addEventListener('click', function() {
        mobileNav.style.display = mobileNav.style.display === 'block' ? 'none' : 'block';
    });

    // Product Gallery Functionality
    const mainProductImage = document.getElementById("mainProductImage");
    const thumbnails = document.querySelectorAll(".thumbnails img");
    const dots = document.querySelectorAll(".dot");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");

    let currentImageIndex = 0;

    // Create an array from thumbnail data attributes
    const images = Array.from(thumbnails).map((thumb) => thumb.dataset.image);

    function updateGallery(index) {
        if (index < 0 || index >= images.length) return;

        mainProductImage.src = `./assets/${images[index]}`;

        thumbnails.forEach((thumb, i) => {
            thumb.classList.toggle("active", i === index);
        });

        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === index);
        });

        currentImageIndex = index;
    }

    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener("click", () => {
            updateGallery(index);
        });
    });

    prevBtn.addEventListener("click", () => {
        const newIndex = (currentImageIndex - 1 + images.length) % images.length;
        updateGallery(newIndex);
    });

    nextBtn.addEventListener("click", () => {
        const newIndex = (currentImageIndex + 1) % images.length;
        updateGallery(newIndex);
    });

    dots.forEach((dot) => {
        dot.addEventListener("click", (event) => {
            const index = parseInt(event.target.dataset.index, 10);
            updateGallery(index);
        });
    });

    // Add to Cart Link Update
    const flavorRadios = document.querySelectorAll('input[name="flavor"]');
    const purchaseTypeRadios = document.querySelectorAll('input[name="purchase-type"]');
    const addToCartLink = document.getElementById('addToCartLink');

    function updateAddToCartLink() {
        const selectedFlavor = document.querySelector('input[name="flavor"]:checked').value;
        const selectedPurchaseType = document.querySelector('input[name="purchase-type"]:checked').value;
        const dummyLink = `dummy-link-${selectedFlavor}-${selectedPurchaseType.replace(' ', '-').toLowerCase()}.html`;
        addToCartLink.href = dummyLink;
    }

    flavorRadios.forEach(radio => {
        radio.addEventListener('change', updateAddToCartLink);
    });

    purchaseTypeRadios.forEach(radio => {
        radio.addEventListener('change', updateAddToCartLink);
    });
    updateAddToCartLink(); 

    // Percentage Count Up
    const countElements = document.querySelectorAll('.count');
    const userStatsSection = document.querySelector('.user-stats-section');
    let animationStarted = false;

    function startCounterAnimation() {
        if (animationStarted) return;
        animationStarted = true;
        countElements.forEach(countElement => {
            const target = parseInt(countElement.dataset.target);
            let count = 0;
            const interval = setInterval(() => {
                count++;
                countElement.textContent = count;
                if (count === target) {
                    clearInterval(interval);
                }
            }, 20); // Adjust the interval for speed
        });
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounterAnimation();
                observer.unobserve(userStatsSection); 
            }
        });
    }, { threshold: 0.5 }); 

    observer.observe(userStatsSection);

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('open');
                    const otherIcon = otherItem.querySelector('.faq-question i');
                    otherIcon.classList.remove('fa-minus');
                    otherIcon.classList.add('fa-plus');
                }
            });
    
            // Toggle current FAQ
            item.classList.toggle('open');
            const icon = question.querySelector('i');
            icon.classList.toggle('fa-plus');
            icon.classList.toggle('fa-minus');
        });
    });
    

    const testimonialsWrapper = document.querySelector(".testimonials");
    const testimonials = document.querySelectorAll(".testimonial");
    const prevButton = document.querySelector(".prev-review");
    const nextButton = document.querySelector(".next-review");
    const dotss = document.querySelectorAll(".review-pagination .dot");

    let currentIndex = 0;
    const testimonialsPerPage = 3;
    const totalTestimonials = testimonials.length;
    const maxIndex = Math.ceil(totalTestimonials / testimonialsPerPage) - 1;

    function updateCarousel() {
       
        testimonialsWrapper.style.transition = "transform 0.5s ease-in-out";

      
        const offset = -(currentIndex * 100) + "%";
        testimonialsWrapper.style.transform = `translateX(${offset})`;

       
        dotss.forEach((dot, index) => {
            dot.classList.toggle("active", index === currentIndex);
        });
    }

    nextButton.addEventListener("click", function () {
        if (currentIndex < maxIndex) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateCarousel();
    });

    prevButton.addEventListener("click", function () {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = maxIndex; 
        }
        updateCarousel();
    });

    updateCarousel();
});