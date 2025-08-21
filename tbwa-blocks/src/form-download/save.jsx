import { InnerBlocks, useBlockProps } from "@wordpress/block-editor";

export default function save({ attributes }) {
    return (
        <div {...useBlockProps.save()}>
            <form
                class="l-stack l-stack-gap-xl"
                id="mc-embedded-subscribe-form-emailed"
                novalidate
            >
                <div class="l-stack l-stack-gap-md">
                    <label for="NAME">Full Name</label>
                    <input
                        type="text"
                        autocomplete="name"
                        name="NAME"
                        id="NAME"
                    />
                </div>
                <div class="l-stack l-stack-gap-md">
                    <label for="EMAIL">
                        Email address <sup className="required_field">*</sup>
                    </label>
                    <input
                        type="email"
                        autocomplete="email"
                        required
                        name="EMAIL"
                        id="EMAIL"
                    />
                    <span id="email-message"></span>
                </div>
                <div class="l-stack l-stack-gap-md">
                    <label for="COUNTRY">Country</label>
                    <input 
                        type="text"
                        autocomplete="country-name"
                        name="COUNTRY"
                        id="COUNTRY"
                    />
                </div>
                <div class="l-stack l-stack-gap-md">
                    <label for="COMPANY">Company</label>
                    <input 
                        type="text"
                        name="COMPANY"
                        id="COMPANY"
                    />
                </div>
                <div class="l-stack l-stack-gap-md">
                    <label for="ABOUT">How did you hear about us?</label>
                    <select name="ABOUT" id="ABOUT">
                        <option value="">Select an option</option>
                        <option value="Instagram">Instagram</option>
                        <option value="LinkedIn">LinkedIn</option>
                        <option value="Backslash Newsletter">Backslash Newsletter</option>
                        <option value="Through a Friend or Colleague">Through a Friend or Colleague</option>
                        <option value="Press/Media">Press/Media</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div class="l-stack l-stack-gap-md">
                    <div class="inline">
                        <input id="SUBSCRIBE" type="checkbox" />
                        <label for="SUBSCRIBE">Join our newsletter</label>
                    </div>
                    <div class="inline">
                        <input id="TERMS" type="checkbox" required />
                        <label for="TERMS">
                            I have read, understand, and agree to Privacy Policy. (required)
                        </label>
                    </div>
                </div>
                <div aria-hidden="true" style="position: absolute; left: -5000px;">
                    <input type="text" name="b_d06405b52025671240cde1328_3c77c89c1c" tabindex="-1" value="" />
                </div>
                <div>
                    <input id="downloadSubmit" type="submit" value="Download" />
                </div>
            </form>

            <a
                id="fileDownload"
                href={attributes.mediaUrl}
                target="_blank"
                download
                rel="noopener"
            >
                {attributes.mediaName}
            </a>

            <div class="l-stack l-stack-gap-md" id="thanks-message" style="display: none;">
                <p class="h4">Thank you!</p>
                <p>Please check your downloads folder for the report.</p>
                <div class="wp-block-tbwa-blocks-paragraph">
                    <p class="small">
                        <a href="/" class="return-home">Return to Homepage</a>
                    </p>
                </div>
            </div>
        </div>
    );
}