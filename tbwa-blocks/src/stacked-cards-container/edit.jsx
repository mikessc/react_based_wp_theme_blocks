import { InnerBlocks, BlockControls, useBlockProps } from '@wordpress/block-editor';
import { ToolbarDropdownMenu, ToolbarGroup, ToolbarButton } from '@wordpress/components';
import './editor.scss';

import { ReactComponent as IconBackgroundWhite } from "./icons/background-white.svg"; 
import { ReactComponent as IconBackgroundBlack } from "./icons/background-black.svg"; 


export default function Edit({ attributes, setAttributes}) {

	const backgroundCurrentIcon = () => { 
		switch (attributes.background) { 
			case 'white': return IconBackgroundWhite; break;
			case 'black': return IconBackgroundBlack; break;
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
						icon={ backgroundCurrentIcon() } 
						label="Background"
						controls={[
							makeControl(IconBackgroundWhite, 'background', 'white', 'Background white'),
							makeControl(IconBackgroundBlack, 'background', 'black', 'Background black'),
						]}
					/>
				</ToolbarGroup>
			</BlockControls>
			<div {...useBlockProps({'className': 'background-'+attributes.background})} >
				<InnerBlocks 
					templateLock={ false }  
					template={[
						['tbwa-blocks/heading', {'display':'h5', 'seo':'h3', 'content':'Our capabilities'}],  
						['tbwa-blocks/stacked-cards']
					]} 
				/> 
			</div>
		</>
	);
}

