import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {

	const { icon, url, target, rel } = attributes;

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
		a.push('text-color-'+attributes.textColor); 
		return a.join(' ');
	}

	if (attributes.mediaType == '') { 
		return '';
	}
	
	if (url) { 
		return (
			<div {...useBlockProps.save({'className':displayClasses()})} >
				<a href={ url } title={ attributes.text } target={ target } rel={ rel } >
					{ displayMedia() }
					<h3 className='h2'>{ attributes.text }</h3>
				</a>
			</div>
		);
	} else { 
		return (
			<div {...useBlockProps.save({'className':displayClasses()})} >
				{ displayMedia() }
				<h3 className='h2'>{ attributes.text }</h3>
			</div>
		);
	}

}
