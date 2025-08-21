import { __ } from '@wordpress/i18n';
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {

	const DisplayMedia = ({media, className}) => { 
		if (media) { 
			if (media.type == 'image') { 
				return (
					<img 
						className={className} 
						src={media.url} 
						alt={media.alt} 
						loading='eager' 
						width='400' 
						height='300' 
					/>
				);
			}
			if (media.type == 'video') { 
				return (
					<video className={className} width='400' height='300' autoPlay loop muted webkit-playsInline playsInline >
						<source src={media.url} type={media.mime} />
					</video>
				);
			}
		}
		return ''
	}

	const blockProps = useBlockProps.save({
		'className': [
			'media-position-'+attributes.mediaPosition, 
			'media-type-'+attributes.mediaType, 
			'background-'+attributes.background
		].join(' ')
	});

	//  If only the desktop media is defined, use it for mobile too
	var mediaA = attributes.mediaDesktop;
	var mediaB = attributes.mediaMobile;
	if (mediaA.url != '' && mediaB.url == '') { 
		mediaB = mediaA;
	}

	if (mediaA.url == mediaB.url) { 
		return (
			<div {...blockProps} >
				<div className="column-outer">
					<div className="media">
						<DisplayMedia media={mediaA} className="desktop mobile" />
					</div>
					<div className="column-inner">
						<div className="column-inner-inner" >
							<InnerBlocks.Content />
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div {...blockProps} >
			<div className="column-outer">
				<div className="media">
					<DisplayMedia media={mediaA} className="desktop" />
					<DisplayMedia media={mediaB} className="mobile" />
				</div>
				<div className="column-inner">
					<div className="column-inner-inner" >
						<InnerBlocks.Content />
					</div>
				</div>
			</div>
		</div>
	);


}
