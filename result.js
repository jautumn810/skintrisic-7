// Image upload handling for result page
document.addEventListener('DOMContentLoaded', function() {
    const imageInput = document.getElementById('image-input');
    const cameraIcon = document.querySelector('img[alt="Camera Icon"]');
    const galleryIcon = document.querySelector('img[alt="Photo Upload Icon"]');
    const previewDiv = document.querySelector('.w-24.h-24');
    const proceedLink = document.getElementById('proceed-link');
    
    function handleImageUpload(file) {
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function(e) {
                if (previewDiv) {
                    previewDiv.style.backgroundImage = `url(${e.target.result})`;
                    previewDiv.style.backgroundSize = 'cover';
                    previewDiv.style.backgroundPosition = 'center';
                }
                if (proceedLink) {
                    proceedLink.classList.remove('hidden');
                }
            };
            reader.readAsDataURL(file);
        }
    }
    
    if (imageInput) {
        imageInput.addEventListener('change', function(e) {
            if (e.target.files && e.target.files[0]) {
                handleImageUpload(e.target.files[0]);
            }
        });
    }
    
    if (cameraIcon) {
        cameraIcon.addEventListener('click', function() {
            if (imageInput) {
                imageInput.click();
            }
        });
    }
    
    if (galleryIcon) {
        galleryIcon.addEventListener('click', function() {
            if (imageInput) {
                imageInput.click();
            }
        });
    }
});

