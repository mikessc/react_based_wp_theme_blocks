import { useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
	return (
		<div {...useBlockProps.save()} >
			<div className={'width-'+attributes.width} ></div>
		</div>
	);


}


