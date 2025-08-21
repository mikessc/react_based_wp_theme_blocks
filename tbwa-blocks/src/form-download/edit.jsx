import { MediaUploadCheck, MediaUpload, useBlockProps } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import './editor.scss';


export default function Edit({ attributes, setAttributes }) {
    const onSelectFile = (media) => {
        setAttributes({
            mediaUrl: media.url,
            mediaName: media.name
        });
    };

	return (
		<>
			<div {...useBlockProps()} >
				<div className="column" >
                    <h3>Download Form</h3>
                    <MediaUploadCheck>
                        <MediaUpload
                            onSelect={onSelectFile}
                            type="file"
                            value={attributes.mediaUrl}
                            render={({ open }) => (
                                <Button onClick={open}>
                                    Upload File {attributes.mediaName ? `: ${attributes.mediaName}` : ''}
                                </Button>
                            )}
                        />
                    </MediaUploadCheck>
				</div>
			</div>
		</>
	);
}