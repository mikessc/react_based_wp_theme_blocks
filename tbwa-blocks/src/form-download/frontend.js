function validateEmail(email) {
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

document.addEventListener(
    'DOMContentLoaded',
    function () {
        const downloadFormElementEmailed = document.getElementById('mc-embedded-subscribe-form-emailed');

        function downloadFormEmailed() {
            let form = document.getElementById('mc-embedded-subscribe-form-emailed');
            let name = document.getElementById('NAME');
            let email = document.getElementById('EMAIL');
            let emailMessage = document.getElementById('email-message');
            let country = document.getElementById('COUNTRY');
            let company = document.getElementById('COMPANY');
            let about = document.getElementById('ABOUT');
            let subscribeCheck = document.getElementById('SUBSCRIBE');
            let terms = document.getElementById('TERMS');
            let submitBtn = document.getElementById('downloadSubmit');
            let subscribed = 'unsubscribed';
            let fileLink = document.getElementById('fileDownload');
            let fileName = fileLink.innerHTML;
            let thanksMessage = document.getElementById('thanks-message');

            function validateForm() {
                let isValid = true;
                const requiredFields = form.querySelectorAll('[required]');
                requiredFields.forEach(field => {
                    if (!field.value.trim() && field.type !== 'checkbox') {
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

                if (!terms.checked) {
                    isValid = false;
                    terms.setAttribute('aria-invalid', 'true');
                    let errorMessage = terms.parentNode.nextElementSibling;
                    if (!errorMessage || !errorMessage.classList.contains('error')) {
                        errorMessage = document.createElement('span');
                        errorMessage.classList.add('error');
                        errorMessage.id = 'terms-error';
                        terms.parentNode.parentNode.insertBefore(errorMessage, terms.parentNode.nextSibling);
                    }
                    errorMessage.textContent = "You must agree to the Privacy Policy.";
                    terms.setAttribute('aria-describedby', errorMessage.id);
                } else {
                    terms.removeAttribute('aria-invalid');
                    let errorMessage = terms.parentNode.nextElementSibling;
                    if (errorMessage && errorMessage.classList.contains('error')) {
                        errorMessage.remove();
                    }
                    terms.removeAttribute('aria-describedby');
                }

                return isValid;
            }

            // Handle real-time validation on terms change
            terms.addEventListener('change', function() {
                validateForm();
            });

            // Handle newsletter subscription
            subscribeCheck.addEventListener("click", function () {
                subscribed = this.checked ? "subscribed" : "unsubscribed";
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

            // Handle email validation on blur
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

            form.addEventListener("submit", function (event) {
                event.preventDefault();
                event.stopImmediatePropagation();

                if (validateForm()) {
                    const mailchimpEndpoint = '/wp-json/mailchimp/v1/subscribe/';

                    const mailchimpData = {
                        merge_fields: {
                            NAME: name.value,
                            COUNTRY: country.value,
                            ABOUT: about.value,
                            COMPANY: company.value,
                            DOWNLOAD: 'Yes'
                        },
                        full_name: name.value,
                        email_address: email.value,
                        status: subscribed,
                        type: 'download',
                        tags: [{
                            name: fileName,
                            status: "active"
                        }]
                    };

                    fetch(mailchimpEndpoint, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(mailchimpData),
                    })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        fileLink.click();
                        thanksMessage.style.display = 'block';
                        form.style.display = 'none';
                        thanksMessage.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start',
                        });
                    })
                    .catch(error => {
                        console.error(error);
                        alert('Submission failed. Please try again later.');
                    });
                }
            });
        }

        if (downloadFormElementEmailed) {
            downloadFormEmailed();
        }
    },
    false
);