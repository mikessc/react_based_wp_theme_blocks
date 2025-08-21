import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';


//  Display a media item - image / video / null
const DisplayMedia = ({media}) => { 
	if (media) { 
		if (media.type == 'image') { 
			return (
				<img 
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
				<video width='400' height='300' autoPlay loop muted webkit-playsInline playsInline>
					<source src={media.url} type={media.mime} />
				</video>
			);
		}
	}
	return ( <></> )
}


//  Save
export default function save({ attributes }) {

	//  Prevent widows on desktop
	var titleNoWidows = attributes.title;
	var a = attributes.title.split(' ');
	if (a.length >= 3) { 
		titleNoWidows = a.slice(0,-2).join(' ') +' <span class="no-widow-desktop">'+ a[a.length-2] +' '+ a[a.length-1] +'</span>';
	}

	return (
		<div {...useBlockProps.save({'className':'item'})} data-url={attributes.linkURL} data-target={attributes.linkTarget}>
			<div className='background'>
				<DisplayMedia media={attributes.background} />
			</div>
			<div className='column' >
				<div className='foreground-closed'>
					<DisplayMedia media={attributes.foregroundClosed} />
				</div>
				<div className='foreground-open'>
					<DisplayMedia media={attributes.foregroundOpen} />
				</div>
				<div className='text'>
					<div className="wp-block-tbwa-blocks-paragraph">
						<p className="standard" tabindex="0">{attributes.subtitle}</p>
					</div>
					<h4 className="h4" dangerouslySetInnerHTML={{__html: titleNoWidows}} tabindex="0"></h4>
				</div>
			</div>
		</div>
	);

}