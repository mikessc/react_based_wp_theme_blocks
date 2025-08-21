import { MediaUploadCheck, MediaUpload, useBlockProps, RichText } from '@wordpress/block-editor';
import { 
	useRef 
} from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import './editor.scss';


export default function Edit({ attributes, setAttributes }) {
    const richTextRef = useRef();
    const onSelectFile = (media) => {
        setAttributes({
            mediaUrl: media.url,
            mediaName: media.name
        });
    };

	return (
		<>
			<div {...useBlockProps()} >
				<div className="column" >
                    <h3>Form with file upload</h3>
                    <br />
                    <label htmlFor="email">Email</label>
                    <RichText
                        label='Email'
                        ref={ richTextRef }
                        allowedFormats={ [] }
                        aria-label={ __( 'Email' ) }
                        placeholder={ __( 'Destination email address' ) }
                        value={ attributes.email }
                        onChange={ ( value ) => setAttributes({
                            email: value
                        }) }
                        withoutInteractiveFormatting
                        identifier="email"
                    />
                    <br />
                    <label htmlFor="subject">Subject</label>
                    <RichText
                        label='Subject'
                        ref={ richTextRef }
                        allowedFormats={ [] }
                        aria-label={ __( 'Subject' ) }
                        placeholder={ __( 'Email subject' ) }
                        value={ attributes.subject }
                        onChange={ ( value ) => setAttributes({
                            subject: value
                        }) }
                        withoutInteractiveFormatting
                        identifier="subject"
                    />
                    <br />
				</div>
			</div>
		</>
	);
}