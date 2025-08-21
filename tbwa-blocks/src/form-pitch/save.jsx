import { InnerBlocks, useBlockProps } from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";

export default function save({ attributes }) {
    return (
        <div {...useBlockProps.save()}>
            <form
                class="l-stack l-stack-gap-xl"
                id="mc-embedded-pitch-form-emailed"
                novalidate
            >   
                <input type="hidden" id="DESTINATION" name="DESTINATION" value={attributes.email} />
                <input type="hidden" id="SUBJECT" name="SUBJECT" value={attributes.subject} />
                <div class="l-stack l-stack-gap-md">
                    <label for="NAME">
                        {__('Nom', 'text-domain')} <sup className="required_field">*</sup>
                    </label>
                    <input
                        type="text"
                        autocomplete="surname"
                        required
                        name="SURNAME"
                        id="SURNAME"
                    />
                </div>
                <div class="l-stack l-stack-gap-md">
                    <label for="NAME">
                        {__('Prénom', 'text-domain')} <sup className="required_field">*</sup>
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
                        {__('Adresse mail', 'text-domain')} <sup className="required_field">*</sup>
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
                    <label for="NAME">
                        {__('Numéro de Téléphone', 'text-domain')} <sup className="required_field">*</sup>
                    </label>
                    <input
                        type="text"
                        autocomplete="phone"
                        required
                        name="PHONE"
                        id="PHONE"
                    />
                </div>
                <div class="l-stack l-stack-gap-md">
                    <label for="BRAND">
                        {__('Marque(s) concernée(s)', 'text-domain')} <sup className="required_field">*</sup>
                    </label>
                    <input 
                        type="text" 
                        autocomplete="brand" 
                        name="BRAND" 
                        id="BRAND"
                        required
                    />
                </div>
                <div class="l-stack l-stack-gap-md">
                    <label for="BRAND">
                        {__('En quelques lignes, quelles sont vos attentes?', 'text-domain')}
                    </label>
                    <textarea 
                        name="EXPECTATIONS" 
                        id="EXPECTATIONS"
                        rows="5">
                    </textarea>
                </div>
                <div class="l-stack l-stack-gap-md">
                    <label for="EXPERTISES">
                        {__('Expertises demandées', 'text-domain')}
                    </label>
                    <select name="EXPERTISES[]" id="EXPERTISES" multiple size={5}>
                        <option value="" disabled selected>{__('Sélectionner', 'text-domain')}</option>
                        <option value="Publicité grands médias (TV, Print, Digital, …)">{__('Publicité grands médias (TV, Print, Digital, …)', 'text-domain')}</option>
                        <option value="Social Media">{__('Social Media', 'text-domain')}</option>
                        <option value="Brand Content">{__('Brand Content', 'text-domain')}</option>
                        <option value="Influence">{__('Influence', 'text-domain')}</option>
                        <option value="Branding et Design">{__('Branding et Design', 'text-domain')}</option>
                        <option value="Communication Corporate">{__('Communication Corporate', 'text-domain')}</option>
                        <option value="Événementiel">{__('Événementiel', 'text-domain')}</option>
                        <option value="Data">{__('Data', 'text-domain')}</option>
                        <option value="Retail">{__('Retail', 'text-domain')}</option>
                        <option value="Social Listening">{__('Social Listening', 'text-domain')}</option>
                        <option value="Audience Planning">{__('Audience Planning', 'text-domain')}</option>
                    </select>
                </div>
                <div>
                    <h2>{__('Quels sont vos délais?', 'text-domain')}</h2>
                </div>
                <div class="l-stack l-stack-gap-md">
                    <label for="PITCH">
                        {__("Pour l'appel d'offre", 'text-domain')}
                    </label>
                    <input
                        type="date"
                        autocomplete="pitch"
                        name="PITCH"
                        id="PITCH"
                    />
                </div>
                <div class="l-stack l-stack-gap-md">
                    <label for="COMMUNICATION">
                        {__('Pour le lancement de votre communication', 'text-domain')}
                    </label>
                    <input
                        type="date"
                        autocomplete="communication"
                        name="COMMUNICATION"
                        id="COMMUNICATION"
                    />
                </div>
                <div class="l-stack l-stack-gap-md">
                    <label for="BUDGET">
                        {__('Quel est votre budget (hors achat média)?', 'text-domain')}
                    </label>
                    <select name="BUDGET" id="BUDGET">
                        <option value="" disabled selected>{__('Sélectionner', 'text-domain')}</option>
                        <option value="Moins 50k">{__('Moins 50k', 'text-domain')}</option>
                        <option value="Entre 50k et 200k">{__('Entre 50k et 200k', 'text-domain')}</option>
                        <option value="Entre 200k et 500k">{__('Entre 200k et 500k', 'text-domain')}</option>
                        <option value="Entre 500k et 800k">{__('Entre 500k et 800k', 'text-domain')}</option>
                        <option value="Entre 800k et 1 200k">{__('Entre 800k et 1 200k', 'text-domain')}</option>
                        <option value="Plus de 1 200k">{__('Plus de 1 200k', 'text-domain')}</option>
                    </select>
                </div>
                <div class="l-stack l-stack-gap-md">
                    <label for="AGENCIES">
                        {__('Combien d’agences souhaitez-vous consulter?', 'text-domain')}
                    </label>
                    <input 
                        type="text" 
                        autocomplete="agencies" 
                        name="AGENCIES" 
                        id="AGENCIES" 
                    />
                </div>
                <div class="l-stack l-stack-gap-md">
                    <label>
                        {__('Est-ce que l’appel d’offre passera par un marieur?', 'text-domain')}
                    </label>
                    <div class="inline">
                        <input id="Oui" type="radio" value="yes" name="MATCHMAKER" />
                        <label for="Oui">{__('Oui', 'text-domain')}</label>
                    </div>
                    <div class="inline">
                        <input id="Non" type="radio" value="no" name="MATCHMAKER" selected />
                        <label for="Non">{__('Non', 'text-domain')}</label>
                    </div>
                </div>
                <div>
                    <input id="downloadSubmit" type="submit" value={__('Envoyer', 'text-domain')} />
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