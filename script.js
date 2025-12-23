// GSAP animation for main heading
document.addEventListener('DOMContentLoaded', function() {
    const mainHeading = document.getElementById('main-heading');
    const headingText = mainHeading.querySelector('h1');
    
    if (headingText && typeof gsap !== 'undefined') {
        gsap.to(headingText, {
            opacity: 1,
            duration: 1,
            ease: "power2.out"
        });
    }
});
