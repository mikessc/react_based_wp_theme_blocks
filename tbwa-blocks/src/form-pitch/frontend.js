document.addEventListener(
    'DOMContentLoaded',
    function () {
        var downloadFormElementEmailed = document.getElementById('mc-embedded-pitch-form-emailed');

        function downloadFormEmailed() {
            let form = downloadFormElementEmailed;
            let destination = document.getElementById('DESTINATION');
            let subject = document.getElementById('SUBJECT');
            let surname = document.getElementById('SURNAME');
            let name = document.getElementById('NAME');
            let email = document.getElementById('EMAIL');
            let emailMessage = document.getElementById('email-message');
            let phone = document.getElementById('PHONE');
            let brand = document.getElementById('BRAND');
            let expectations = document.getElementById('EXPECTATIONS');
            let expertises = document.getElementById('EXPERTISES');
            let pitch = document.getElementById('PITCH');
            let communication = document.getElementById('COMMUNICATION');
            let budget = document.getElementById('BUDGET');
            let agencies = document.getElementById('AGENCIES');
            let submitBtn = document.getElementById('downloadSubmit');
            let thanksMessage = document.getElementById('success-page');

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
                        let fieldName = "NOM";
                        if (field.id === "SURNAME") {
                            fieldName = "Nom";
                        } else if (field.id === "NAME") {
                            fieldName = "Prénom";
                        } else if (field.id === "EMAIL") {
                            fieldName = "Adresse mail";
                        } else if (field.id === "PHONE") {
                            fieldName = "Numéro de Téléphone";
                        } else if (field.id === "BRAND") {
                            fieldName = "Marque(s) concernée(s)";
                        }
                        errorMessage.textContent = `Le champ ${fieldName} est obligatoire.`;
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
                
                let matchmaker = document.querySelectorAll('input[name="MATCHMAKER"]');
                let matchmakerValue = "no";

                matchmaker.forEach(radio => {
                    if (radio.checked) {
                        matchmakerValue = radio.value;
                    }
                });

                if (validateForm()) {
                    const emailEndopoint = "/wp-json/custom-email-api/v1/send-email/";
                    let selectedExpertises = Array.from(expertises.options).filter(option => option.selected).map(option => option.value);
                    let emailBody = `Surname: ${surname.value}\nName: ${name.value}\nEmail Address: ${email.value}\nPhone number: ${phone.value}\nBrand (s) concerned: ${brand.value}\nExpectations: ${expectations.value}\nExpertises: ${selectedExpertises.join(", ")}\nPitch deadline: ${pitch.value}\nLaunch communication: ${communication.value}\nBudget: ${budget.value}\nHow many agencies: ${agencies.value}\nAdvertising matchmaker: ${matchmakerValue}`;

                    const emailData = {
                        to: destination.value,
                        subject: subject.value,
                        message: emailBody,
                    };

                    fetch(emailEndopoint, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(emailData),
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

        if (downloadFormElementEmailed) {
            downloadFormEmailed();
        }
    },
    false
);