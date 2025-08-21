import { InnerBlocks, BlockControls, useBlockProps } from '@wordpress/block-editor';
import { ToolbarDropdownMenu, ToolbarGroup } from '@wordpress/components';
import './editor.scss';

import { ReactComponent as IconBackgroundWhite } from "./icons/background-white.svg"; 
import { ReactComponent as IconBackgroundBlack } from "./icons/background-black.svg"; 

import { ReactComponent as IconStripeNone } from "./icons/stripe-none.svg"; 
import { ReactComponent as IconStripeWhiteBlack } from "./icons/stripe-white-over-black.svg"; 
import { ReactComponent as IconStripeBlackWhite } from "./icons/stripe-black-over-white.svg"; 

import { ReactComponent as IconWidthFull } from "./icons/width-full.svg"; 
import { ReactComponent as IconWidthStandard } from "./icons/width-standard.svg"; 

export default function Edit({ attributes, setAttributes }) {

	const backgroundCurrentIcon = () => { 
		switch (attributes.background) { 
			case 'white': return IconBackgroundWhite; break;
			case 'black': return IconBackgroundBlack; break;
		}
	}

	const stripeCurrentIcon = () => { 
		switch (attributes.stripe) { 
			case 'none': return IconStripeNone; break;
			case 'white-black': return IconStripeWhiteBlack; break;
			case 'black-white': return IconStripeBlackWhite; break;
		}
	}

	const widthCurrentIcon = () => { 
		switch (attributes.width) { 
			case 'full': return IconWidthFull; break;
			case 'standard': return IconWidthStandard; break;
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

	const blockProps = useBlockProps({
		'className': 'width-'+attributes.width+' background-'+attributes.background+' stripe-'+attributes.stripe
	});

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
					<ToolbarDropdownMenu
						icon={ stripeCurrentIcon() } 
						label="Background"
						controls={[
							makeControl(IconStripeNone,       'stripe', 'none', 'None'),
							makeControl(IconStripeWhiteBlack, 'stripe', 'white-black', 'White over black'),
							makeControl(IconStripeBlackWhite, 'stripe', 'black-white', 'Black over white')
						]}
					/>
					<ToolbarDropdownMenu
						icon={ widthCurrentIcon() } 
						label="Width"
						controls={[
							makeControl(IconWidthFull, 'width', 'full', 'Window width'),
							makeControl(IconWidthStandard, 'width', 'standard', 'Standard width')
						]}
					/>
				</ToolbarGroup>
			</BlockControls>
			<div {...blockProps} >
				<InnerBlocks />
			</div>
		</>
	);
}


