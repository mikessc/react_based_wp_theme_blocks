import { useBlockProps, PlainText } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { PanelBody, RangeControl, CheckboxControl  } from '@wordpress/components';

import './editor.scss';


export default function Edit({ attributes, setAttributes }) {

	const { email } = attributes;
	const parallaxPluginEnabled = document.body.classList.contains('tbwa-parallax-enabled');
	const classes = {'className':[
		'cols-desktop-'+attributes.desktop, 
		'cols-tablet-'+attributes.tablet, 
		'cols-mobile-'+attributes.mobile
	].join(' ')}

	function setEmailText( newText ) {
		setAttributes( { email: newText.replace( /<\/?a[^>]*>/g, '' ) } );
	}

	return (
		<>
			<div {...useBlockProps(classes)}>
				<PlainText 
					value={email}
					onChange={ ( value ) => setEmailText( value ) }
					placeholder={ __( 'some@email.ext here...' ) }
					identifier="email"
				></PlainText>
			</div>
		</>
	);
}

