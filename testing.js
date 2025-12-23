// Form submission handler for testing page
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('name-form');
    const nameInput = document.getElementById('name-input');
    
    if (form && nameInput) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = nameInput.value.trim();
            
            if (name) {
                // Store the name in sessionStorage or localStorage
                sessionStorage.setItem('userName', name);
                // Navigate to result page
                window.location.href = 'result.html';
            }
        });
        
        // Focus the input when page loads
        nameInput.focus();
    }
});

