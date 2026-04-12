document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('fileInput');
    const fileNameDisplay = document.getElementById('fileName');
    const printForm = document.getElementById('printForm');
    const messageDiv = document.getElementById('message');
    const uploadBtn = document.getElementById('uploadBtn');
    const dropZone = document.getElementById('dropZone');

    // Update file name on selection
    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            const fileName = e.target.files[0].name;
            fileNameDisplay.textContent = `Selected: ${fileName}`;
            fileNameDisplay.style.display = 'block';
            document.querySelector('.file-upload-text').style.display = 'none';
            document.querySelector('.file-upload-icon').textContent = '✅';
        }
    });

    // Handle Drag & Drop
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, () => {
            dropZone.classList.add('highlight');
            dropZone.style.borderColor = 'var(--primary)';
            dropZone.style.background = '#f5f3ff';
        }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, () => {
            dropZone.classList.remove('highlight');
            if (!fileInput.files.length) {
                dropZone.style.borderColor = 'var(--border)';
                dropZone.style.background = '#f9fafb';
            }
        }, false);
    });

    dropZone.addEventListener('drop', (e) => {
        const dt = e.dataTransfer;
        const files = dt.files;
        fileInput.files = files;
        
        // Trigger change event manually
        const event = new Event('change');
        fileInput.dispatchEvent(event);
    }, false);

    // Form Submission
    printForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const copies = document.getElementById('copiesInput').value;
        const type = document.getElementById('printType').options[document.getElementById('printType').selectedIndex].text;
        const file = fileInput.files[0] ? fileInput.files[0].name : 'No file';

        // Simulate upload
        uploadBtn.disabled = true;
        uploadBtn.innerHTML = 'Uploading...';
        
        setTimeout(() => {
            messageDiv.textContent = `Success! Printing ${copies} copy/copies of "${file}" in ${type}.`;
            messageDiv.className = 'success';
            messageDiv.style.display = 'block';
            
            uploadBtn.innerHTML = 'Upload & Print';
            uploadBtn.disabled = false;

            // Reset form after a delay
            setTimeout(() => {
                printForm.reset();
                fileNameDisplay.style.display = 'none';
                document.querySelector('.file-upload-text').style.display = 'block';
                document.querySelector('.file-upload-icon').textContent = '📄';
                messageDiv.style.display = 'none';
            }, 3000);
        }, 1500);
    });
});
