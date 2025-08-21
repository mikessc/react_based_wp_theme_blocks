import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save() {
	return (
		<div {...useBlockProps.save()} >
			<div className="cloud"></div>
			<div className="inner-blocks">
				<InnerBlocks.Content />
			</div>
		</div>
	);
}
