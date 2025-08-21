document.addEventListener('DOMContentLoaded', function() {
    const signUpFormElement = document.getElementById('mc-embedded-signup-form');

    function signUpForm() {
        let form = document.getElementById('mc-embedded-signup-form');
        let email = document.getElementById('SU_EMAIL');
        let emailMessage = document.getElementById('su-email-message');
        let submitBtn = document.getElementById('signupSubmit');
        let successPage = document.getElementById('success-page');

        function validateEmail(email) {
            var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return regex.test(email);
        }

        function updateSuccessPage() {
            document.title = 'Thank you for signing up';
            successPage.style.display = 'block';
            form.style.display = 'none';
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
                    errorMessage.textContent = `${field.name} is required.`;
                    field.setAttribute('aria-describedby', errorMessage.id);
                }
            });

            if (email.value && !validateEmail(email.value)) {
                isValid = false;
                email.setAttribute('aria-invalid', 'true');
                emailMessage.textContent = "Please use a valid email.";
                emailMessage.classList.add("error");
                email.setAttribute('aria-describedby', emailMessage.id);
            }

            return isValid;
        }

        // Clear errors on input
        const formInputs = form.querySelectorAll('input');
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

        // Email validation on blur
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

        // Form submission
        form.setAttribute('novalidate', '');
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            event.stopImmediatePropagation();

            if (validateForm()) {
                const endpoint = '/wp-json/mailchimp/v1/subscribe/';

                const data = {
                    merge_fields: {
                        NAME: '',
                        COUNTRY: '',
                        ABOUT: '',
                        COMPANY: '',
                        DOWNLOAD: 'No'
                    },
                    full_name: '',
                    email_address: email.value,
                    status: 'subscribed',
                    type: 'signup'
                };

                fetch(endpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    updateSuccessPage();
                })
                .catch(error => {
                    console.error(error);
                    alert('Submission failed. Please try again later.');
                });
            }
        });
    }

    if (signUpFormElement) {
        signUpForm();
    }
}, false);