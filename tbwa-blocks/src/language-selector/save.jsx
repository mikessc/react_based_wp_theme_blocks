import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
	return (
		<div {...useBlockProps.save()} style={ {display:'none'} } >
			<form>
				<label>{ attributes.instructions }</label>
				<select>
					<InnerBlocks.Content />
				</select>
			</form>
		</div>
	);
}
