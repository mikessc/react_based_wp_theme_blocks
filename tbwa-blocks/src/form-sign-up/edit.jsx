import { MediaUploadCheck, MediaUpload, useBlockProps } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import './editor.scss';


export default function Edit() {

	return (
		<>
			<div {...useBlockProps()} >
                <div className="width-standard background-white">
					<div className="no-media-selected">
                        Newsletter signup form
					</div>
				</div>
			</div>
		</>
	);
}