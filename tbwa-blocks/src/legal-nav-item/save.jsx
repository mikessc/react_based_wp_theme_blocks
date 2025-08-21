import { __ } from '@wordpress/i18n';
import { RichText, InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {

	const displayMedia = () => { 
		if (attributes.mediaType == 'image') { 
			return (
				<img 
					src={attributes.mediaUrl} 
					alt={attributes.mediaAlt} 
					title={attributes.mediaTitle} 
					loading="eager" 
					width="400" 
					height="400" 
				/>
			);
		}
		if (attributes.mediaType == 'video') { 
			return (
				<video width="400" height="300" autoPlay loop muted webkit-playsInline playsInline >
					<source src={attributes.mediaUrl} type={attributes.mediaMime} />
				</video>
			);
		}
		return '';
	}

	return (
		<div {...useBlockProps.save()} >
			<a 
				href={ attributes.url } 
				target={ attributes.linkTarget } 
				rel='noopener' 
				draggable='false' >
				<span className='title' >{ attributes.title }</span>
				<span className='media' >{ displayMedia() }</span>
				<span className='border' ></span>
			</a>
		</div>
	);


}


