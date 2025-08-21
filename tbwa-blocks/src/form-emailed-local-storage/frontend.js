document.addEventListener(
	"DOMContentLoaded",
	function () {
		const downloadFormElementEmailed = document.getElementById(
			"mc-embedded-subscribe-form-emailed-local-storage"
		);

		function downloadFormEmailed() {
			let form = document.getElementById(
				"mc-embedded-subscribe-form-emailed-local-storage"
			);
			let destination = document.getElementById("DESTINATION");
			let subject = document.getElementById("SUBJECT");
			let name = document.getElementById("NAME");
			let email = document.getElementById("EMAIL");
			let emailMessage = document.getElementById("email-message");
			let country = document.getElementById("COUNTRY");
			let company = document.getElementById("COMPANY");
			let industry = document.getElementById("INDUSTRY");
			let about = document.getElementById("ABOUT");
			let subscribeCheck = document.getElementById("SUBSCRIBE");
			let terms = document.getElementById("TERMS");
			let remember = document.getElementById("REMEMBER");
			let submitBtn = document.getElementById("downloadSubmit");
			let subscribed = "unsubscribed";
			let fileLink = document.getElementById("fileDownload");
			let fileName = fileLink.innerHTML;
			let thanksMessage = document.getElementById("thanks-message");
			let welcomeMessage = document.getElementById("welcome-message");

			// Get previously stored values from local storage (if available)
			const storedValues = localStorage.getItem("formData");
			let parsedValues;
			if (storedValues) {
				parsedValues = JSON.parse(storedValues);
				welcomeMessage.style.display = "block";
			}

			// Pre-fill form fields with stored values
			if (parsedValues) {
				name.value = parsedValues.name || "";
				email.value = parsedValues.email || "";
				country.value = parsedValues.country || "";
				company.value = parsedValues.company || "";
				industry.value = parsedValues.industry || "";
				about.value = parsedValues.about || "";
				subscribeCheck.checked = parsedValues.subscribeCheck === true;
				terms.checked = parsedValues.terms === true;
				remember.checked = parsedValues.remember === true;
			}

			function validateEmail(email) {
				var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
				return regex.test(email);
			}

			 // Update the document title on successful form submission
			function updateSuccessPage() {
				document.title = "Thank you for your submission";
				const successPage = document.getElementById("success-page");
				successPage.style.display = "block";
				form.style.display = "none";
				welcomeMessage.style.display = "none";
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
						// errorMessage.textContent = `${field.getAttribute('aria-label') || field.name} is required.`;
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
						errorMessage.style.display='none';
					}
					terms.removeAttribute('aria-describedby');
				}

				return isValid;
			}

			terms.addEventListener('change', function() {
				validateForm();
			});

			subscribeCheck.addEventListener("click", function () {
				subscribed = this.checked ? "subscribed" : "unsubscribed";
			});

			form.setAttribute('novalidate', '');
			form.addEventListener("submit", function (event) {
				event.preventDefault();
				event.stopImmediatePropagation();

				if (validateForm()) {
					const emailEndopoint = "/wp-json/custom-email-api/v1/send-email/";
					let emailBody = `File: ${subscribed}\nEmail Address: ${
						email.value
					}\nFull Name: ${name.value}\nIndustry: ${industry.value.replace(
						"&amp;",
						"&"
					)}\nCountry: ${country.value}\nHow did you hear about us: ${
						about.value
					}\nCompany: ${company.value}\nDownload: ${fileName}`;

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
							fileLink.click();
							updateSuccessPage();

							if (remember.checked) {
								const formData = {
									name: name.value,
									email: email.value,
									country: country.value,
									company: company.value,
									industry: industry.value,
									about: about.value,
									subscribeCheck: subscribeCheck.checked,
									remember: remember.checked,
									terms: terms.checked,
								};
								localStorage.setItem("formData", JSON.stringify(formData));
							}
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