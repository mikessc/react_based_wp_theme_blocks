import { __ } from '@wordpress/i18n';
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {


	return (
		<div {...useBlockProps.save()} >
			<div className={ 'content center background-'+attributes.background } >
				<InnerBlocks.Content />
			</div>
		</div>
	);


}
