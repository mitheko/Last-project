document.addEventListener('DOMContentLoaded', function () {
    // Multi-level dropdown logic
    // Top-level dropdown logic: only one open at a time
    document.querySelectorAll('.nav-list > .nav-item.dropdown > .dropdown-toggle').forEach(toggle => {
        toggle.addEventListener('click', function (event) {
            event.preventDefault();
            const parentDropdown = this.parentElement;
            const allDropdowns = document.querySelectorAll('.nav-list > .nav-item.dropdown');
            allDropdowns.forEach(drop => {
                if (drop !== parentDropdown) {
                    drop.classList.remove('active');
                }
            });
            parentDropdown.classList.toggle('active');
        });
    });

    // About Us submenu logic: only one open at a time
    document.querySelectorAll('.about-dropdown .dropdown-toggle').forEach(toggle => {
        toggle.addEventListener('click', function (event) {
            event.preventDefault();
            const parentDropdown = this.parentElement;
            const allSubDropdowns = document.querySelectorAll('.about-dropdown .dropdown');
            allSubDropdowns.forEach(drop => {
                if (drop !== parentDropdown) {
                    drop.classList.remove('active');
                }
            });
            parentDropdown.classList.toggle('active');
        });
    });

    // Close all dropdowns when clicking outside navbar
    document.addEventListener('click', function (event) {
        if (!event.target.closest('.navbar')) {
            document.querySelectorAll('.dropdown.active').forEach(activeDropdown => {
                activeDropdown.classList.remove('active');
            });
        }
    });
});

// Allow only one collapsible box to be open at a time
document.querySelectorAll('.collapse-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        // Close all other boxes
        document.querySelectorAll('.collapse-content').forEach(content => {
            if (content !== this.nextElementSibling) {
                content.style.display = 'none';
                if (content.previousElementSibling && content.previousElementSibling.classList.contains('collapse-btn')) {
                    content.previousElementSibling.textContent = 'Show content';
                }
            }
        });
        // Toggle current box
        toggleContent(this);
    });
});
function toggleContent(button) {
    const contentDiv = button.nextElementSibling;
    if (!contentDiv.style.display || contentDiv.style.display === "none") {
        contentDiv.style.display = "block";
        button.textContent = 'Hide content';
    } else {
        contentDiv.style.display = "none";
        button.textContent = "Show content";
    }
}


/*home photos slider*/
document.addEventListener('DOMContentLoaded', function () {
    const slider = document.querySelector('.slider');
    const images = document.querySelectorAll('.slider img');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dotsContainer = document.querySelector('.dots-container');
    const dots = document.querySelectorAll('.dot');

    let currentIndex = 0;
    const totalSlides = images.length;

    // Function to update slider position
    function updateSlider() {
        const imageWidth = images[0].clientWidth; // Get the width of a single image
        slider.style.transform = `translateX(${-currentIndex * imageWidth}px)`;

        // Update active dot
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    // Next slide button
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % totalSlides; // Cycle through slides
        updateSlider();
    });

    // Previous slide button
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides; // Cycle through slides (handle negative index)
        updateSlider();
    });

    // Dot navigation
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const slideIndex = parseInt(dot.dataset.slide); // Get slide index from data-slide attribute
            currentIndex = slideIndex;
            updateSlider();
        });
    });

    // Optional: Auto-slide functionality
    let autoSlideInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateSlider();
    }, 4000); // Change slide every 4 seconds

    // Pause auto-slide on hover for better user experience
    slider.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });

    slider.addEventListener('mouseleave', () => {
        autoSlideInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateSlider();
        }, 4000);
    });

    // Optional: Adjust slider on window resize
    window.addEventListener('resize', updateSlider);

    // Initialize the slider position and active dot on load
    updateSlider();
}
);
