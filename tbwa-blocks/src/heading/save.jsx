import { __ } from '@wordpress/i18n';
import { RichText, useBlockProps } from '@wordpress/block-editor';
import { RawHTML } from '@wordpress/element';

import { ReactComponent as DisplayArrowRight } from "./images/arrow-right.svg";
import { ReactComponent as DisplayArrowUpRight } from "./images/arrow-up-right.svg";

export default function save({ attributes }) {


	var icon = '';
	if (attributes.icon == 'arrow-right') { 
		icon = <DisplayArrowRight className='icon' />;
	} else if (attributes.icon == 'arrow-up-right') { 
		icon = <DisplayArrowUpRight className='icon' />;
	}

	var HTag = `${attributes.seo}`;

	var displayClasses = [attributes.display];
	if (attributes.font != '') { 
		displayClasses.push('font-'+attributes.font);
	}

	return (
		<HTag id={attributes.anchor ? attributes.anchor : 'noMarginsHeading' } className={ displayClasses.join(' ') } ><RawHTML>{attributes.content}</RawHTML>{icon}</HTag>
	);
	
	/*
	return (
		<RichText.Content
			{...useBlockProps.save()}
			tagName={attributes.seo}
			className={displayClasses.join(' ')}
			value={attributes.content}
		/>
	);
	*/

}
