

import { useCallback, useEffect, useState, useRef } from '@wordpress/element';
import { BlockControls, InspectorControls, RichText, useBlockProps, __experimentalLinkControl as LinkControl } from '@wordpress/block-editor';
import { ToolbarDropdownMenu, ToolbarButton, ToolbarGroup, Path, SVG, Popover, PanelBody, TextControl } from '@wordpress/components';
import { displayShortcut, isKeyboardEvent } from '@wordpress/keycodes';
import { link, linkOff } from '@wordpress/icons';
import { createBlock } from '@wordpress/blocks';

import './editor.scss';

import { ReactComponent as IconInstagram } from './icons/icon-instagram.svg';
import { ReactComponent as IconTwitter } from './icons/icon-twitter.svg';
import { ReactComponent as IconLinkedIn } from './icons/icon-linkedin.svg';
import { ReactComponent as IconFacebook } from './icons/icon-facebook.svg';
import { ReactComponent as IconYoutube } from './icons/icon-youtube.svg';
import { ReactComponent as IconWeChat } from './icons/icon-wechat.svg';
import { ReactComponent as IconWeibo } from './icons/icon-weibo.svg';
import { ReactComponent as IconRed } from './icons/icon-red.svg';

import { ReactComponent as ButtonInstagram } from './images/button-instagram.svg';
import { ReactComponent as ButtonTwitter } from './images/button-twitter.svg';
import { ReactComponent as ButtonLinkedIn } from './images/button-linkedin.svg';
import { ReactComponent as ButtonFacebook } from './images/button-facebook.svg';
import { ReactComponent as ButtonYoutube } from './images/button-youtube.svg';
import { ReactComponent as ButtonWeChat } from './images/button-wechat.svg';
import { ReactComponent as ButtonWeibo } from './images/button-weibo.svg';
import { ReactComponent as ButtonRed } from './images/button-red.svg';

const NEW_TAB_REL = 'noreferrer noopener';


export default function Edit( props ) {

	const { attributes, setAttributes, className, isSelected, onReplace, mergeBlocks } = props;
	const { icon, url, target, rel } = attributes;

	const onSetLinkRel = useCallback(
		( value ) => {
			setAttributes( { rel: value } );
		},
		[ setAttributes ]
	);

	function onToggleOpenInNewTab( value ) {
		const newTarget = value ? '_blank' : undefined;
		let updatedRel = rel;
		if ( newTarget && ! rel ) {
			updatedRel = NEW_TAB_REL;
		} else if ( ! newTarget && rel === NEW_TAB_REL ) {
			updatedRel = undefined;
		}
		setAttributes( {
			target: newTarget,
			rel: updatedRel,
		} );
	}

	const ref = useRef();
	const blockProps = useBlockProps( { ref } );
	const [ isEditingURL, setIsEditingURL ] = useState( false );
	const isURLSet = !! url;
	const opensInNewTab = target === '_blank';

	function startEditing( event ) {
		event.preventDefault();
		setIsEditingURL( true );
	}

	function unlink() {
		setAttributes( {
			url: undefined,
			target: undefined,
			rel: undefined,
		} );
		setIsEditingURL( false );
	}

	useEffect( () => {
		if ( ! isSelected ) {
			setIsEditingURL( false );
		}
	}, [ isSelected ] );

	const currentIcon = () => { 
		switch (attributes.icon) { 
			case 'instagram': return IconInstagram; break;
			case 'twitter':   return IconTwitter; break;
			case 'linkedin':  return IconLinkedIn; break;
			case 'facebook':  return IconFacebook; break;
			case 'youtube':  return IconYoutube; break;
			case 'weibo':  return IconWeibo; break;
			case 'red':  return IconRed; break;
			case 'wechat':  return IconWeChat; break;
		}
	}
	
	const currentButton = () => { 
		switch (attributes.icon) { 
			case 'instagram': return <ButtonInstagram />;
			case 'twitter':   return <ButtonTwitter />;
			case 'linkedin':  return <ButtonLinkedIn />;
			case 'facebook':  return <ButtonFacebook />;
			case 'youtube':   return <ButtonYoutube />;
			case 'wechat':  return <ButtonWeChat />;
			case 'weibo':  return <ButtonWeibo />;
			case 'red':  return <ButtonRed />;
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
			<div { ...blockProps } >
				{ currentButton() }
			</div>
			<BlockControls group="block">
				<ToolbarGroup>
					<ToolbarDropdownMenu
						icon={ currentIcon() } 
						label="Social"
						controls={[
							makeControl(IconInstagram,'icon', 'instagram'),
							makeControl(IconTwitter,  'icon', 'twitter'), 
							makeControl(IconLinkedIn, 'icon', 'linkedin'),
							makeControl(IconFacebook, 'icon', 'facebook'),
							makeControl(IconYoutube,  'icon', 'youtube'),
							makeControl(IconWeibo,  'icon', 'weibo'),
							makeControl(IconRed,  'icon', 'red'),
							makeControl(IconWeChat,  'icon', 'wechat'),
						]}
					/>
				</ToolbarGroup>
				{ ! isURLSet && (
					<ToolbarButton
						name="link"
						icon={ link }
						title={'Link'}
						onClick={ startEditing }
					/>
				) }
				{ isURLSet && (
					<ToolbarButton
						name="link"
						icon={ linkOff }
						title={'Unlink'}
						onClick={ unlink }
						isActive={ true }
					/>
				) }
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
			<InspectorControls __experimentalGroup="advanced">
				<TextControl
					label={ 'Link rel' }
					value={ rel || '' }
					onChange={ onSetLinkRel }
				/>
			</InspectorControls>
		</>
	);
}
