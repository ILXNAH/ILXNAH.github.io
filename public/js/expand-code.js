document.addEventListener('DOMContentLoaded', function () {
    const codeBlocks = document.querySelectorAll('.code-block');
    
    codeBlocks.forEach(codeBlock => {
        // Check if the code block exceeds the max height
        if (codeBlock.scrollHeight > codeBlock.clientHeight) {
            // Add the "expand-code" button if the content exceeds the height
            const container = codeBlock.closest('.code-container');
            const expandButton = container.querySelector('.expand-code');
            expandButton.style.display = 'block';  // Ensure button is visible
        }
    });

    // Expand button functionality
    const expandButtons = document.querySelectorAll('.expand-code');
    
    expandButtons.forEach(button => {
        button.addEventListener('click', function() {
            const codeBlock = button.closest('.code-container').querySelector('.code-block');
            codeBlock.classList.toggle('expanded'); // Toggle expanded class

            // Change button text based on expanded state
            if (codeBlock.classList.contains('expanded')) {
                button.textContent = 'Show Less';
            } else {
                button.textContent = 'Show More';
            }
        });
    });
});
