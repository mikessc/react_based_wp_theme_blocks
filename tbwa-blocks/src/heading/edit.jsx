import { InspectorControls, BlockControls, RichText, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, ToolbarDropdownMenu, ToolbarGroup } from '@wordpress/components';
import './editor.scss';


import { ReactComponent as IconDisplayH1 } from './icons/display-h1.svg';
import { ReactComponent as IconDisplayH2 } from './icons/display-h2.svg';
import { ReactComponent as IconDisplayH3 } from './icons/display-h3.svg';
import { ReactComponent as IconDisplayH4 } from './icons/display-h4.svg';
import { ReactComponent as IconDisplayH5 } from './icons/display-h5.svg';
import { ReactComponent as IconDisplayH6 } from './icons/display-h6.svg';
import { ReactComponent as IconDisplayHidden } from './icons/display-invisible.svg';

import { ReactComponent as IconSEOH1 } from './icons/seo-h1.svg';
import { ReactComponent as IconSEOH2 } from './icons/seo-h2.svg';
import { ReactComponent as IconSEOH3 } from './icons/seo-h3.svg';
import { ReactComponent as IconSEOH4 } from './icons/seo-h4.svg';
import { ReactComponent as IconSEOH5 } from './icons/seo-h5.svg';
import { ReactComponent as IconSEOH6 } from './icons/seo-h6.svg';

import { ReactComponent as IconNone } from "./icons/icon-none.svg";
import { ReactComponent as IconArrowRight } from "./icons/icon-arrow-right.svg";
import { ReactComponent as IconArrowUpRight } from "./icons/icon-arrow-up-right.svg";

import { ReactComponent as DisplayArrowRight } from "./images/arrow-right.svg";
import { ReactComponent as DisplayArrowUpRight } from "./images/arrow-up-right.svg";

import { ReactComponent as IconFontNormal } from './icons/font-normal.svg';
import { ReactComponent as IconFontSlanted } from './icons/font-slanted.svg';
import { ReactComponent as IconFontBackslanted } from './icons/font-backslanted.svg';


export default function Edit({ attributes, setAttributes }) {

	const displayCurrentIcon = () => { 
		switch (attributes.display) { 
			case 'h1': return IconDisplayH1; break;
			case 'h2': return IconDisplayH2; break;
			case 'h3': return IconDisplayH3; break;
			case 'h4': return IconDisplayH4; break;
			case 'h5': return IconDisplayH5; break;
			case 'h6': return IconDisplayH6; break;
			case 'hidden': return IconDisplayHidden; break;
		}
	}

	const seoCurrentIcon = () => { 
		switch (attributes.seo) { 
			case 'h1': return IconSEOH1; break;
			case 'h2': return IconSEOH2; break;
			case 'h3': return IconSEOH3; break;
			case 'h4': return IconSEOH4; break;
			case 'h5': return IconSEOH5; break;
			case 'h6': return IconSEOH6; break;
		}
	}

	const iconCurrentIcon = () => { 
		switch (attributes.icon) { 
			case '': return IconNone; break;
			case 'arrow-right': return IconArrowRight; break;
			case 'arrow-up-right': return IconArrowUpRight; break;
		}
	}

	const fontCurrentIcon = () => { 
		switch (attributes.font) { 
			case '': return IconFontNormal; break;
			case 'slanted': return IconFontSlanted; break;
			case 'backslanted': return IconFontBackslanted; break;
		}
	}

	const makeControl = (icon, name, value, title) => { 
		return {
			'icon': icon, 
			'title': title,
			'isActive': attributes[name] == value, 
			'onClick': () => { 
				setAttributes({[name]:value});
			}
		}
	}

	var icon = '';
	if (attributes.icon == 'arrow-right') { 
		icon = <DisplayArrowRight className='icon' />;
	} else if (attributes.icon == 'arrow-up-right') { 
		icon = <DisplayArrowUpRight className='icon' />;
	}


	var displayClasses = [attributes.display];
	if (attributes.font != '') { 
		displayClasses.push('font-'+attributes.font);
	}

	return (
		<>
			<InspectorControls>
				<PanelBody initialOpen={true} >
					<p>Headings <b>Display</b> in 6 sizes,  H1 to H6.  </p>
					<p>For SEO purposes you can also select the <b>SEO</b> value for the heading, H1 to H6.</p>
					<p>For example; you may have a heading halfway down the page that visually displays as a H1,  but you don't want it to appear as an H1 to search engines, so you may set its SEO size to be H4.</p>
				</PanelBody>
			</InspectorControls>
			<BlockControls group="block">
				<ToolbarGroup>
					<ToolbarDropdownMenu
						icon={ displayCurrentIcon() } 
						label="Display"
						controls={[
							makeControl(IconDisplayH1, 'display', 'h1'), 
							makeControl(IconDisplayH2, 'display', 'h2'), 
							makeControl(IconDisplayH3, 'display', 'h3'), 
							makeControl(IconDisplayH4, 'display', 'h4'), 
							makeControl(IconDisplayH5, 'display', 'h5'),
							makeControl(IconDisplayH6, 'display', 'h6'), 
							makeControl(IconDisplayHidden, 'display', 'hidden'), 
						]}
					/>
					<ToolbarDropdownMenu
						icon={ seoCurrentIcon() } 
						label="SEO"
						controls={[
							makeControl(IconSEOH1, 'seo', 'h1'), 
							makeControl(IconSEOH2, 'seo', 'h2'), 
							makeControl(IconSEOH3, 'seo', 'h3'), 
							makeControl(IconSEOH4, 'seo', 'h4'), 
							makeControl(IconSEOH5, 'seo', 'h5'), 
							makeControl(IconSEOH6, 'seo', 'h6'), 
						]}
					/>
					<ToolbarDropdownMenu
						icon={ iconCurrentIcon() } 
						label="Icon"
						controls={[
							makeControl(IconNone,         'icon', ''), 
							makeControl(IconArrowRight,   'icon', 'arrow-right'), 
							makeControl(IconArrowUpRight, 'icon', 'arrow-up-right'), 
						]}
					/>
					<ToolbarDropdownMenu
						icon={ fontCurrentIcon() } 
						label="Typeface"
						controls={[
							makeControl(IconFontBackslanted, 'font', 'backslanted'), 
							makeControl(IconFontNormal,      'font', ''), 
							makeControl(IconFontSlanted,     'font', 'slanted'), 
						]}
					/>
				</ToolbarGroup>
			</BlockControls>
			<div {...useBlockProps({className:displayClasses.join(' ')})} >
				<RichText
					identifier='content'
					tagName='div' 
					className={[attributes.display]}
					value={attributes.content}
					id={attributes.anchor}
					allowedFormats={[]}
					onChange={(content) => setAttributes({ content })}
					placeholder='Heading...'
				/>
				{ icon }
			</div>
		</>
	);
}
