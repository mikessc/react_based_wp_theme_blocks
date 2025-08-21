import { __ } from '@wordpress/i18n';
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
	return (
		<>
			<div {...useBlockProps()} >
				<InnerBlocks />
			</div>
		</>
	);
}


 