document.addEventListener('DOMContentLoaded', function() {
  // Add copy buttons to each code block
  const codeBlocks = document.querySelectorAll('.code-container');
  codeBlocks.forEach(function(container) {
    const button = document.createElement('button');
    button.classList.add('copy-code');
    button.innerText = 'Copy Code';
    container.appendChild(button);

    // Add click event to copy the code
    button.addEventListener('click', function() {
      const codeText = container.querySelector('.code-block').innerText;
      const textArea = document.createElement('textarea');
      textArea.value = codeText;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);

      // Optional: show some feedback (e.g., "Copied!" message)
      button.innerText = 'Copied!';
      setTimeout(() => {
        button.innerText = 'Copy Code';
      }, 2000);
    });
  });
});
