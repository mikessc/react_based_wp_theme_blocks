import { __ } from '@wordpress/i18n';
import { BlockControls, RichText, useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { ToolbarDropdownMenu, ToolbarButton, ToolbarGroup, Path, SVG, PanelBody, PanelRow, SelectControl } from '@wordpress/components';
import { createBlock } from '@wordpress/blocks';
import './editor.scss';


import { ReactComponent as IconSizeLarge } from './icons/size-large.svg';
import { ReactComponent as IconSizeStandard } from './icons/size-standard.svg';
import { ReactComponent as IconSizeSmall } from './icons/size-small.svg';
import { ReactComponent as IconSizeTiny } from './icons/size-tiny.svg';
import { ReactComponent as IconSizeLabel } from './icons/size-label.svg';

const name = 'tbwa-blocks/paragraph';

export default function Edit({
	attributes,
	mergeBlocks,
	onReplace,
	onRemove,
	setAttributes,
	clientId,
}) {

	const sizeCurrentIcon = () => { 
		switch (attributes.size) { 
			case 'large': return IconSizeLarge; break;
			case 'standard': return IconSizeStandard; break;
			case 'small': return IconSizeSmall; break;
			case 'tiny': return IconSizeTiny; break;
			case 'label': return IconSizeLabel; break;
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

	const displayClasses = [attributes.size];
	if (attributes.marginBottom) { 
		if (attributes.marginBottom != '' && attributes.marginBottom != 'none') { 
			displayClasses.push('margin-bottom-'+attributes.marginBottom);
		}
	}

	return (
		<>
			<InspectorControls >
				<PanelBody title="Bottom Margin" initialOpen={true} >
					<SelectControl
						value={ attributes.marginBottom }
						options={ [
							{ label: 'None', value: 'None' },
							{ label: '90px', value: '90' },
						] }
						onChange={(value) => setAttributes({ 'marginBottom': value })}
					/>
				</PanelBody>
			</InspectorControls>
			<BlockControls group="block">
				<ToolbarGroup>
					<ToolbarDropdownMenu
						icon={ sizeCurrentIcon() } 
						label="Size"
						controls={[
							makeControl(IconSizeLarge,    'size', 'large', 'Large'),
							makeControl(IconSizeStandard, 'size', 'standard', 'Standard'),
							makeControl(IconSizeSmall,    'size', 'small', 'Small'),
							makeControl(IconSizeTiny,     'size', 'tiny', 'Tiny'),
							makeControl(IconSizeLabel,    'size', 'label', 'Label')
						]}
					/>
				</ToolbarGroup>
			</BlockControls>
			<div {...useBlockProps()} >
				<RichText
					identifier="content"
					className={ displayClasses.join(' ') }
					value={attributes.content}
					onChange={ ( newContent ) =>
						setAttributes( { content: newContent } )
					}
					tagName='p' 
					allowedFormats={['core/bold', 'core/italic', 'core/link']}
					placeholder='Paragraph block...'
					data-empty={attributes.content ? false : true}
					onSplit={(value, isOriginal) => {
						let newAttributes;
						if (isOriginal || value) {
							newAttributes = {
								...attributes,
								content: value,
							};
						}
						const block = createBlock(name, newAttributes);
						if (isOriginal) {
							block.clientId = clientId;
						}
						return block;
					}}
					onMerge={ mergeBlocks }
					onReplace={ onReplace }
					onRemove={ onRemove }
					__unstableEmbedURLOnPaste
					__unstableAllowPrefixTransformations 
				/>
			</div>
		</>
	);
}













