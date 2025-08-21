import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import { select, useSelect } from '@wordpress/data';
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
	return (
		<>
			<div {...useBlockProps()} >
				<div className="width-standard background-white">
					<div className="no-media-selected">
						Search Loop
					</div>
				</div>
			</div>
		</>
	);
}


