import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { 
	InnerBlocks, 
	InspectorControls, 
	__experimentalLinkControl as LinkControl, 
	useBlockProps
} from '@wordpress/block-editor';
import { 
	PanelBody, 
	PanelRow, 
	Button, 
	Popover, 
	ExternalLink, 
	CheckboxControl,  
	__experimentalNumberControl as NumberControl, 
} from '@wordpress/components';
import './editor.scss';
import { link as iconLink, linkOff as iconLinkOff } from '@wordpress/icons';


export default function Edit({ attributes, setAttributes }) {

	const [ isEditingURL, setIsEditingURL ] = useState( false );

	function unlink() {
		setAttributes({
			'linkUrl': '',
			'linkTarget': '_parent'
		}); 
		setIsEditingURL(false);
	}

	function link( event ) {
		event.preventDefault();
		setIsEditingURL(true);
	}

	function panelToggle(newState) { 
		if (newState) { 
			setAttributes({
				'itemOpen': index,
				'isEditingURL' : false
			}); 
		}
	}

	var cardTemplate = [
		['tbwa-blocks/image', { proportion: '8-by-9' }],
		['tbwa-blocks/card-body'],
	];

	const classes = () => { 
		var a = [];
		if (attributes.enableParagraphSmall) { 
			a.push('enable-paragraph-small');
		}
		if (attributes.enableHeading) { 
			a.push('enable-heading');
		}
		if (attributes.enableParagraphStandard) { 
			a.push('enable-paragraph-standard');
		}
		return {'className':a.join(' ')};
	}

	return (
		<>
			<InspectorControls key='parallax'>
				<PanelBody title='Card Options' initialOpen={true} >
					<CheckboxControl
						label='Enable Small Paragraph'
						checked={ attributes.enableParagraphSmall }
						onChange={() => setAttributes({ 'enableParagraphSmall': !attributes.enableParagraphSmall })}
					/>
					<CheckboxControl
						label='Enable Heading'
						checked={ attributes.enableHeading }
						onChange={() => setAttributes({ 'enableHeading': !attributes.enableHeading })}
					/>
					<CheckboxControl
						label='Enable Standard Paragraph'
						checked={ attributes.enableParagraphStandard }
						onChange={() => setAttributes({ 'enableParagraphStandard': !attributes.enableParagraphStandard })}
					/>
					{ attributes.linkUrl == '' && (
						<PanelRow >
							<Button
								name="link"
								icon={ iconLink }
								title={ __( 'Link' ) }
								onClick={ link }
								style={ {'paddingLeft':'0px'} }
							>Select Link</Button>
						</PanelRow>
					)}
					{ attributes.linkUrl != '' && (
						<>
						<PanelRow>
							<ExternalLink variant="link" href={attributes.linkUrl} target={attributes.linkTarget} >{attributes.linkUrl}</ExternalLink>
						</PanelRow>
						<PanelRow >
							<Button
								name="unlink"
								icon={ iconLinkOff }
								title={ __( 'Unlink' ) }
								onClick={ unlink }
								style={ {'paddingLeft':'0px'} }
							>Remove Link</Button>
							<Button
								name="link"
								icon={ iconLink }
								title={ __( 'Link' ) }
								onClick={ link }
							>Edit Link</Button>
						</PanelRow>
						</>
					)}
					{ isEditingURL && (
						<Popover>
							<LinkControl 
								value={{
									'url': attributes.linkUrl, 
									'opensInNewTab': attributes.linkTarget == '_blank' 
								}}
								onChange={ (value) => {
									setAttributes({
										'linkUrl': value.url, 
										'linkTarget': value.opensInNewTab ? '_blank': '_parent'
									}); 
								}}
								onRemove={ unlink }
							/>
						</Popover>
					)}
				</PanelBody>				
			</InspectorControls >
			<div {...useBlockProps(classes())}>
				<InnerBlocks 
					templateLock=''  
					template={cardTemplate}
				/>
			</div>
		</>
	);
}
