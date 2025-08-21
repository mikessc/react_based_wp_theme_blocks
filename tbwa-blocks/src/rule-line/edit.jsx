import { BlockControls, useBlockProps } from '@wordpress/block-editor';
import { ToolbarDropdownMenu, ToolbarButton, ToolbarGroup } from '@wordpress/components';
import './editor.scss';

import { ReactComponent as IconFull } from "./icons/width-full.svg";
import { ReactComponent as IconNarrow } from "./icons/width-narrow.svg";

export default function Edit({ attributes, setAttributes }) {

	const widthCurrentIcon = () => { 
		switch (attributes.width) { 
			case 'full': return IconFull; break;
			case 'narrow': return IconNarrow; break;
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

	return (
		<>
			<BlockControls group="block">
				<ToolbarGroup>
					<ToolbarDropdownMenu
						icon={ widthCurrentIcon() } 
						label="Width"
						controls={[
							makeControl(IconFull, 'width', 'full', '100% wide'),
							makeControl(IconNarrow, 'width', 'narrow', '95px wide'),
						]}
					/>
				</ToolbarGroup>
			</BlockControls>
			<div {...useBlockProps()} >
				<div className={'width-'+attributes.width} ></div>
			</div>
		</>
	);
}


