import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {

	const displayMedia = () => { 
		if (attributes.mediaType == 'image') { 
			return (
				<img 
					src={attributes.mediaUrl} 
					alt={attributes.mediaAlt} 
					title={attributes.mediaTitle} 
					loading="eager" 
					width="160" 
					height="160" 
				/>
			);
		}
		return '';
	}

	if (attributes.mediaType == '') { 
		return '';
	}

	if (attributes.linkUrl != '') { 
		return (
			<div {...useBlockProps.save()} data-parallax='50,1,0' >
				<a href={ attributes.linkUrl } target={ attributes.linkTarget } rel="noopener" >
					{ displayMedia() }
				</a>
			</div>
		);
	}
	
	return (
		<div {...useBlockProps.save()} data-parallax='50,1,0' >
			{ displayMedia() }
		</div>
	);


}
