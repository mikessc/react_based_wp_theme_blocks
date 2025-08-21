import { __ } from '@wordpress/i18n';
import { RichText, useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {


	return (
		<div {...useBlockProps.save()} >
			<div class={attributes.size}>
				<RichText.Content
					tagName='p'
					className='lead-in'
					value={attributes.leadIn}
				/>
				<RichText.Content
					tagName='p'
					className='content'
					value={attributes.content}
				/>
			</div>
		</div>
	);
}
