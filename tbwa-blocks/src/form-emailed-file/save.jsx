import { InnerBlocks, useBlockProps } from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";

export default function save({ attributes }) {
    return (
        <div {...useBlockProps.save()}>
            <form
                class="l-stack l-stack-gap-xl"
                id="form-emailed-file"
                novalidate
            >   
                <input type="hidden" id="DESTINATION" name="DESTINATION" value={attributes.email} />
                <input type="hidden" id="SUBJECT" name="SUBJECT" value={attributes.subject} />
                <div class="l-stack l-stack-gap-md">
                    <label for="NAME">
                        {__('Name', 'text-domain')} <sup className="required_field">*</sup>
                    </label>
                    <input
                        type="text"
                        autocomplete="name"
                        required
                        name="NAME"
                        id="NAME"
                    />
                </div>
                <div class="l-stack l-stack-gap-md">
                    <label for="EMAIL">
                        {__('Email', 'text-domain')} <sup className="required_field">*</sup>
                    </label>
                    <input
                        type="email"
                        autocomplete="email"
                        required
                        name="EMAIL"
                        id="EMAIL"
                    />
                    <p id="email-message" class=""></p>
                </div>
                <div class="l-stack l-stack-gap-md">
                    <label for="COMPANY">
                        {__('Company', 'text-domain')} <sup className="required_field">*</sup>
                    </label>
                    <input
                        type="text"
                        autocomplete="company"
                        required
                        name="COMPANY"
                        id="COMPANY"
                        required
                    />
                </div>
                <div class="l-stack l-stack-gap-md">
                    <label for="JOB">
                        {__('Job Title', 'text-domain')} <sup className="required_field">*</sup>
                    </label>
                    <input 
                        type="text" 
                        autocomplete="brand" 
                        name="JOB" 
                        id="JOB"
                        required
                    />
                </div>
                <div class="l-stack l-stack-gap-md">
                    <label for="COMMENTS">
                        {__('Text Prompt or Submission Comments', 'text-domain')} <sup className="required_field">*</sup>
                    </label>
                    <textarea name="COMMENTS" id="COMMENTS" required></textarea>
                </div>
                <div class="l-stack l-stack-gap-md">
                    <label for="FILE">
                        {__('Upload a file', 'text-domain')}
                    </label>
                </div>
                <div class="l-stack l-stack-gap-md">
                    <input type="file" id="FILE" name="FILE" accept=".pdf, .png, .jpg, .jpeg"></input>
                    <p style="font-size: 10px;">Accepted formats: pdf, png or jpg. Max file size: 10MB</p>
                    <p id="file-error-message" style="font-size: 10px; color: red; display: none;"></p>
                </div>
                <div>
                    <input id="downloadSubmit" type="submit" value={__('Submit', 'text-domain')} />
                </div>
            </form>

            <div class="l-stack l-stack-gap-md" id="success-page" style="display: none;">
                <h2>{__('Thank you!', 'text-domain')}</h2>
                <p>{__('Your request has been submitted.', 'text-domain')}</p>
                <div class="wp-block-tbwa-blocks-paragraph">
                    <p class="small">
                        <a href="/" class="return-home">{__('Return to Homepage', 'text-domain')}</a>
                    </p>
                </div>
            </div>
        </div>
    );
}