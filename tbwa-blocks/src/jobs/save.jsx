import { RichText, InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes, className }) {
	const { source, url } = attributes;

	return (
		<div {...useBlockProps.save()} >
			<div className="jobs-feed-container">
				<h2 className='h2 jobs__title'>Job openings</h2>
				<ul className="jobs__list" data-source={ source } data-url={ url }>
					<li>Loading data...</li>
				</ul>
			</div>
		</div>
	);
}


