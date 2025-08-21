import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
    return (
        <div {...useBlockProps.save()}>
            <form class="l-stack l-stack-gap-xl" id="mc-embedded-signup-form" novalidate>
                <div class="l-stack l-stack-gap-md">
                    <label for="SU_EMAIL">
                        Email address <sup className="required_field">*</sup>
                    </label>
                    <input 
                        type="email" 
                        autocomplete="email" 
                        required 
                        name="SU_EMAIL" 
                        id="SU_EMAIL"
                    />
                    <p id="su-email-message" class=""></p>
                </div>
                <div>
                    <input id="signupSubmit" type="submit" value="Sign up" />
                </div>
            </form>

            <div class="success-page" id="success-page" style="display: none;">
                <div class="l-stack l-stack-gap-md">
                    <h2>Wow! You're In!</h2>
                    <p>Prepare for awesome updates and exclusive content.</p>
                </div>
            </div>
        </div>
    );
}