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
					width={attributes.mediaWidth * 0.5} 
					height={attributes.mediaHeight * 0.5}
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

	const displayClasses = () => { 
		var a = []
		a.push('proportion-'+attributes.proportion); 
		if (attributes.border != 'none') { 
			a.push('border-'+attributes.border);
		} 
		if (attributes.marginBottom != 'none') { 
			a.push('margin-bottom-'+attributes.marginBottom); 
		}
		a.push('media-type-'+attributes.mediaType); 
		return a.join(' ');
	}

	if (attributes.mediaType == '') { 
		return '';
	}
	
	return (
		<div {...useBlockProps.save({'className':displayClasses()})} >
			{ displayMedia() }
		</div>
	);


}
