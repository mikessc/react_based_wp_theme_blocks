
/* Based on core/button */

import { __ } from '@wordpress/i18n';
import { useCallback, useEffect, useState, useRef } from '@wordpress/element';
import { BlockControls, InspectorControls, RichText, useBlockProps, __experimentalLinkControl as LinkControl } from '@wordpress/block-editor';
import { Popover, PanelBody, TextControl, ToolbarGroup, ToolbarButton, ToolbarDropdownMenu } from '@wordpress/components';
import { displayShortcut, isKeyboardEvent } from '@wordpress/keycodes';
import { link, linkOff } from '@wordpress/icons';
import { createBlock } from '@wordpress/blocks';

import './editor.scss';

const NEW_TAB_REL = 'noreferrer noopener';

import { ReactComponent as IconButton } from "./icons/button-cta.svg"; 

import { ReactComponent as IconSizeStandard } from "./icons/size-standard.svg";
import { ReactComponent as IconSizeLarge } from "./icons/size-large.svg";

import { ReactComponent as IconColorStandard } from "./icons/color-standard.svg";
import { ReactComponent as IconColorYellow } from "./icons/color-yellow.svg";

import { ReactComponent as DisplayArrowRight } from "./images/arrow-right.svg";
import { ReactComponent as DisplayArrowUpRight } from "./images/arrow-up-right.svg";


export default function Edit( props ) {

	const { attributes, setAttributes, className, isSelected, onReplace, mergeBlocks } = props;
	const { linkTarget, rel, text, url, width } = attributes;

	const onSetLinkRel = useCallback(
		( value ) => {
			setAttributes( { rel: value } );
		},
		[ setAttributes ]
	);

	function onToggleOpenInNewTab( value ) {
		const newLinkTarget = value ? '_blank' : undefined;
		let updatedRel = rel;
		if ( newLinkTarget && ! rel ) {
			updatedRel = NEW_TAB_REL;
		} else if ( ! newLinkTarget && rel === NEW_TAB_REL ) {
			updatedRel = undefined;
		}
		setAttributes( {
			linkTarget: newLinkTarget,
			rel: updatedRel,
		} );
	}

	function setButtonText( newText ) {
		setAttributes( { text: newText.replace( /<\/?a[^>]*>/g, '' ) } );
	}

	function onKeyDown( event ) {
		if ( isKeyboardEvent.primary( event, 'k' ) ) {
			startEditing( event );
		} else if ( isKeyboardEvent.primaryShift( event, 'k' ) ) {
			unlink();
			richTextRef.current?.focus();
		}
	}

	const ref = useRef();
	const richTextRef = useRef();
	const blockProps = useBlockProps( { ref, onKeyDown } );
	const [ isEditingURL, setIsEditingURL ] = useState( false );
	const isURLSet = !! url;
	const opensInNewTab = linkTarget === '_blank';

	function startEditing( event ) {
		event.preventDefault();
		setIsEditingURL( true );
	}

	function unlink() {
		setAttributes( {
			url: undefined,
			linkTarget: undefined,
			rel: undefined,
		} );
		setIsEditingURL( false );
	}

	useEffect( () => {
		if ( ! isSelected ) {
			setIsEditingURL( false );
		}
	}, [ isSelected ] );

	const currentSizeIcon = () => { 
		switch (attributes.size) { 
			case 'standard': return IconSizeStandard; break;
			case 'large':    return IconSizeLarge; break;
		}
	}

	const currentColorIcon = () => { 
		switch (attributes.color) { 
			case 'standard': return IconColorStandard; break;
			case 'yellow':   return IconColorYellow; break;
		}
	}

	const displayClasses = () => { 
		return ['size-'+attributes.size, 'color-'+attributes.color].join(' ');
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
			arrow = <DisplayArrowUpRight className='arrowIcon' />;
		}
	}

	return (
		<>
			<div { ...blockProps } >
				<div className={displayClasses()} >
					<RichText
						ref={ richTextRef }
						allowedFormats={ [] }
						aria-label={ __( 'Button text' ) }
						placeholder={ __( 'Add text…' ) }
						value={ text }
						onChange={ ( value ) => setButtonText( value ) }
						withoutInteractiveFormatting
						onSplit={ ( value ) =>
							createBlock( 'tbwa-blocks/button-cta', {
								...attributes,
								text: value,
							} )
						}
						onReplace={ onReplace }
						onMerge={ mergeBlocks }
						identifier="text"
					/>
					{ arrow }
				</div>
			</div>
			<BlockControls group="block">
				<ToolbarGroup>
					<ToolbarDropdownMenu
						icon={ currentSizeIcon() } 
						label="Size"
						controls={[
							makeControl(IconSizeStandard, 'size', 'standard', 'Standard'), 
							makeControl(IconSizeLarge,    'size', 'large',    'Large')
						]}
					/>
					<ToolbarDropdownMenu
						icon={ currentColorIcon() } 
						label="Color"
						controls={[
							makeControl(IconColorStandard,  'color', 'standard', 'Black or White'), 
							makeControl(IconColorYellow,    'color', 'yellow', 'Yellow')
						]}
					/>
					{ ! isURLSet && (
						<ToolbarButton
							name="link"
							icon={ link }
							title={ __( 'Link' ) }
							shortcut={ displayShortcut.primary( 'k' ) } 
							onClick={ startEditing }
						/>
					) }
					{ isURLSet && (
						<ToolbarButton
							name="link"
							icon={ linkOff }
							title={ __( 'Unlink' ) }
							shortcut={ displayShortcut.primaryShift( 'k' ) }
							onClick={ unlink }
							isActive={ true }
						/>
					) }
				</ToolbarGroup>
			</BlockControls>{ isSelected && ( isEditingURL || isURLSet ) && (
				<Popover
					position="bottom center"
					onClose={ () => {
						setIsEditingURL( false );
						richTextRef.current?.focus();
					} }
					anchorRef={ ref?.current }
					focusOnMount={ isEditingURL ? 'firstElement' : false }
					__unstableSlotName={ '__unstable-block-tools-after' }
				>
					<LinkControl
						className="wp-block-navigation-link__inline-link-input"
						value={ { url, opensInNewTab } }
						onChange={ ( {
							url: newURL = '',
							opensInNewTab: newOpensInNewTab,
						} ) => {
							setAttributes( { url: newURL } );
							if ( opensInNewTab !== newOpensInNewTab ) {
								onToggleOpenInNewTab( newOpensInNewTab );
							}
						} }
						onRemove={ () => {
							unlink();
							richTextRef.current?.focus();
						} }
						forceIsEditingLink={ isEditingURL }
					/>
				</Popover>
			) }
		</>
	);
}
