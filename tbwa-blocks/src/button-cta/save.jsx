import { RichText, useBlockProps } from '@wordpress/block-editor';

import { ReactComponent as DisplayArrowRight } from "./images/arrow-right.svg";
import { ReactComponent as DisplayArrowUpRight } from "./images/arrow-up-right.svg";

export default function save({ attributes }) {

	const displayClasses = () => { 
		return ['size-'+attributes.size, 'color-'+attributes.color].join(' ');
	}

	var linkAttributes = {};
	if (attributes.url == '') { 
		linkAttributes.href = '#';
	} else {
		linkAttributes.href = attributes.url;
	}
	if (attributes.title != '') { 
		linkAttributes.title = attributes.title;
	}
	if (attributes.linkTarget != '') { 
		linkAttributes.target = attributes.linkTarget;
	}
	if (attributes.rel != '') { 
		linkAttributes.rel = attributes.rel;
	}

	const isUrlExternal = (url, target) => {
		if (target == '_blank') { 
			return true;
		}
		if (url.charAt(0) == '/') {
			return false;
		}
		if (new URL(url).host !== window.location.host) {
			return true;
		}
		return false;
	}
	
	var arrow = <DisplayArrowRight className='arrowIcon' />;
	if (attributes.url && attributes.url != '') { 
		if (isUrlExternal(attributes.url, attributes.linkTarget)) { 
			var arrow = <DisplayArrowUpRight className='arrowIcon' />;

		}
	}

	return (
		<div {...useBlockProps.save()} >
			<a {...linkAttributes} className={displayClasses()} >
				<div>
					{ attributes.text }
					{ arrow }
				</div>
			</a>
		</div>
	);
}


