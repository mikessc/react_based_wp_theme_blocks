document.addEventListener('DOMContentLoaded',function () {
        var downloadFormElementEmailedFile = document.getElementById('form-emailed-file');
        var fileInput = document.getElementById('FILE');

        if (fileInput) {
            fileInput.addEventListener('change', function(event) {
            
                let file = event.target.files[0];
                let errorMessage = document.getElementById('file-error-message');
            
                if (!file) {
                    errorMessage.style.display = "none";
                    return;
                }
            
                // Validar extensión del archivo
                let allowedExtensions = ["pdf", "png", "jpg", "jpeg"];
                let fileExtension = file.name.split('.').pop().toLowerCase();
                
                if (!allowedExtensions.includes(fileExtension)) {
                    errorMessage.innerText = "Only images or pdf can be uploaded.";
                    errorMessage.style.display = "block";
                    file.value = "";
                    return;
                }
            
                // Validar tamaño del archivo (10MB = 10 * 1024 * 1024 bytes)
                if (file.size > 10 * 1024 * 1024) {
                    errorMessage.innerText = "File max size is 10MB.";
                    errorMessage.style.display = "block";
                    return;
                }
            
                // Si todo está bien, habilitar el botón de envío
                errorMessage.style.display = "none";
            });
        }

        function downloadFormEmailedFile() {
            let form = downloadFormElementEmailedFile;
            let destination = document.getElementById('DESTINATION');
            let subject = document.getElementById('SUBJECT');
            let name = document.getElementById('NAME');
            let email = document.getElementById('EMAIL');
            let emailMessage = document.getElementById('email-message');
            let company = document.getElementById('COMPANY');
            let job = document.getElementById('JOB');
            let comments = document.getElementById('COMMENTS');
            let file = document.getElementById('FILE').files[0];
            let submitBtn = document.getElementById('downloadSubmit');
            let thanksMessage = document.getElementById('success-page');
            let errorMessage = document.getElementById('file-error-message');

            function validateEmail(email) {
                var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return regex.test(email);
            }

            // Update the document title on successful form submission
            function updateSuccessPage() {
                document.title = "Thank you for your submission";
                thanksMessage.style.display = 'block';
                form.style.display = 'none';
                // Scroll to top of success page
                window.scrollTo(0, 0);
            }

            function validateForm() {
                let isValid = true;
                const requiredFields = form.querySelectorAll('[required]');
                requiredFields.forEach(field => {
                    if (!field.value.trim()) {
                        isValid = false;
                        field.setAttribute('aria-invalid', 'true');
                        let errorMessage = field.nextElementSibling;
                        if (!errorMessage || !errorMessage.classList.contains('error')) {
                            errorMessage = document.createElement('span');
                            errorMessage.classList.add('error');
                            errorMessage.id = `${field.id}-error`;
                            field.parentNode.insertBefore(errorMessage, field.nextSibling);
                        }
                        let fieldName = "";
                        if (field.id === "NAME") {
                            fieldName = "Name";
                        } else if (field.id === "EMAIL") {
                            fieldName = "Email";
                        } else if (field.id === "COMPANY") {
                            fieldName = "Company";
                        } else if (field.id === "JOB") {
                            fieldName = "Job Title";
                        }
                        errorMessage.textContent = `The field ${fieldName} is required.`;
                        field.setAttribute('aria-describedby', errorMessage.id);
                    } else {
                        field.removeAttribute('aria-invalid');
                        let errorMessage = field.nextElementSibling;
                        if (errorMessage && errorMessage.classList.contains('error')) {
                            errorMessage.remove();
                        }
                        field.removeAttribute('aria-describedby');
                    }
                });

                if (email.value && !validateEmail(email.value)) {
                    isValid = false;
                    email.setAttribute('aria-invalid', 'true');
                    emailMessage.textContent = "Please use a valid email.";
                    emailMessage.classList.add("error");
                    email.setAttribute('aria-describedby', emailMessage.id);
                } else if (email.value) {
                    email.removeAttribute('aria-invalid');
                    emailMessage.textContent = "";
                    emailMessage.classList.remove("error");
                    email.removeAttribute('aria-describedby');
                }

                return isValid;
            }

            form.setAttribute('novalidate', '');
            form.addEventListener("submit", function (event) {
                event.preventDefault();
                event.stopImmediatePropagation();
            
                if (validateForm()) {
                    const emailEndpoint = "/wp-json/custom-email-api/v1/send-email-file/";
                    let fileInput = document.getElementById("FILE");
                    let formData = new FormData();
                    formData.append("to", destination.value);
                    formData.append("subject", subject.value);
                    formData.append("message", `Name: ${name.value}\nEmail: ${email.value}\nCompany: ${company.value}\nJob Title: ${job.value}\eText Prompt or Submission Comments:\n ${comments.value}\n${file ? `File: ${file.name}` : ""}`);
                    
                    if (fileInput.files.length > 0) {
                        formData.append("attachment", fileInput.files[0]); // Attach the file
                    }
            
                    fetch(emailEndpoint, {
                        method: "POST",
                        body: formData, // Send FormData instead of JSON
                    })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log(data);
                        updateSuccessPage();
                    })
                    .catch((error) => {
                        console.error(error);
                        alert("Submission failed. Please try again later.");
                    });
                }
            });            

            // Add input event listeners to clear errors when user starts typing
            const formInputs = form.querySelectorAll('input, select');
            formInputs.forEach(input => {
                input.addEventListener('input', function() {
                    this.removeAttribute('aria-invalid');
                    let errorMessage = this.nextElementSibling;
                    if (errorMessage && errorMessage.classList.contains('error')) {
                        errorMessage.remove();
                    }
                    this.removeAttribute('aria-describedby');
                });
            });

            // Special handling for email field
            email.addEventListener('blur', function() {
                if (this.value && !validateEmail(this.value)) {
                    this.setAttribute('aria-invalid', 'true');
                    emailMessage.textContent = "Please use a valid email.";
                    emailMessage.classList.add("error");
                    this.setAttribute('aria-describedby', emailMessage.id);
                } else {
                    this.removeAttribute('aria-invalid');
                    emailMessage.textContent = "";
                    emailMessage.classList.remove("error");
                    this.removeAttribute('aria-describedby');
                }
            });
        }

        if (downloadFormElementEmailedFile) {
            downloadFormEmailedFile();
        }
    },
    false
);