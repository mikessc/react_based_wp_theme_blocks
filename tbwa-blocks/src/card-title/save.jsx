import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {

	return (
		<>
			{attributes.linkUrl ? (
				<div {...useBlockProps.save()}  >
					<a href={attributes.linkUrl} target={attributes.linkTarget}>
						<InnerBlocks.Content />
					</a>
				</div>
			) : (
				<div {...useBlockProps.save()}  >
					<InnerBlocks.Content />
				</div>
			)}
		</>
	);

}

