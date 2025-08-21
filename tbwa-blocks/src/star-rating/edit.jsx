import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
	PlainText
} from '@wordpress/block-editor';
import {
	Button,
	PanelBody
} from '@wordpress/components';
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
	const { imageID, imageURL, customText } = attributes;
	const downloadURL = '/wp-content/uploads/southern-cross-braze-feedback.csv';

	return (
		<>
			<InspectorControls>
				<PanelBody title="Custom Text">
					<PlainText
						value={customText}
						onChange={(value) => setAttributes({ customText: value })}
						placeholder="Enter your message"
					/>
				</PanelBody>
			</InspectorControls>

			<div {...useBlockProps()}>
				<div className='wp-block-tbwa-blocks-section width-standard background-black'>
					<div>
						<div className='wp-block-tbwa-blocks-rule-line'><div className='width-full'></div></div>
						<div className='wp-block-tbwa-blocks-paragraph'><p className='standard bottom-margin-80'>Star Rating</p></div>
						<h4 className='h4 title'>{customText || 'Add a custom message'}</h4>
						
						{imageURL ? (
							<img src={imageURL} alt="" className='proportion-top-cut' />
						) : (
							<MediaUploadCheck>
								<MediaUpload
									onSelect={(media) => {
										setAttributes({
											imageID: media.id,
											imageURL: media.url
										});
									}}
									allowedTypes={['image']}
									value={imageID}
									render={({ open }) => (
										<Button onClick={open} variant="secondary">
											Select image
										</Button>
									)}
								/>
							</MediaUploadCheck>
						)}
						<div className='wp-block-tbwa-blocks-paragraph'>
							<Button
								variant="secondary"
								href={downloadURL}
								download
							>
								Download Feedback CSV
							</Button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
