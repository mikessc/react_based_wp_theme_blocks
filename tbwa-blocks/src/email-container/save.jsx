import { InnerBlocks, useBlockProps, PlainText } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const { email } = attributes;

	return (
		<div className='wp-block-tbwa-blocks-paragraph'>
			<p dangerouslySetInnerHTML={{
				__html: `
					<!--email_off-->
					<a 
						href="mailto:${ email }" 
						class="email-container">
						${ email }
					</a>
					<!--/email_off-->
			` }} />
		</div>
	);

}
