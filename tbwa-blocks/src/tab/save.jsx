import { InnerBlocks, RichText, useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
	return (
		<div {...useBlockProps.save()} >
			<RichText.Content
				tagName='a'
				className='title'
				value={ attributes.title }
				title={ attributes.title }
			/>
			<div className="content">
				<InnerBlocks.Content />
			</div>
		</div>

	);
}



