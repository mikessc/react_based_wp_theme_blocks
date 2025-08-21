
/* Based on core/button */

import { __ } from '@wordpress/i18n';
import { 
	useCallback, 
	useEffect, 
	useState, 
	useRef 
} from '@wordpress/element';
import {
	BlockControls,
	InspectorControls,
	RichText,
	useBlockProps,
	__experimentalLinkControl as LinkControl,
} from '@wordpress/block-editor';
import {
	Popover,
	PanelBody,
	TextControl,
	ToolbarGroup, 
	ToolbarButton,
	ToolbarDropdownMenu,
	ToggleControl,
} from '@wordpress/components';
import { displayShortcut, isKeyboardEvent } from '@wordpress/keycodes';
import { link, linkOff, plusCircle } from '@wordpress/icons';
import { createBlock } from '@wordpress/blocks';

import './editor.scss';

const NEW_TAB_REL = 'noreferrer noopener';

import { ReactComponent as IconButton } from "./icons/button.svg"; 


export default function Edit( props ) {

	const { attributes, setAttributes, className, isSelected, onReplace, mergeBlocks } = props;
	const { linkTarget, rel, text, url, width, copy } = attributes;
	const [ openExternal, setOpenExternal ] = useState( false );
	const [ enableHover, setEnableHover ] = useState( false );

	function setHeadingText( newText ) {
		setAttributes( { text: newText.replace( /<\/?a[^>]*>/g, '' ) } );
	}

	function setCopyText( newText ) {
		setAttributes( { copy: newText.replace( /<\/?a[^>]*>/g, '' ) } );
	}

	function setURL( newText ) {
		setAttributes( { url: newText.replace( /<\/?a[^>]*>/g, '' ) } );
	}

	function setExternal( value ) {
		setAttributes( { target: value } );
	}

	function setHover( value ) {
		setAttributes( { hover: !value } );
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

	return (
		<>
			<div { ...blockProps } >
				<RichText
					ref={ richTextRef }
					allowedFormats={ [] }
					aria-label={ __( 'Heading Circle' ) }
					placeholder={ __( 'Heading...' ) }
					value={ text }
					onChange={ ( value ) => setHeadingText( value ) }
					withoutInteractiveFormatting
					onReplace={ onReplace }
					onMerge={ mergeBlocks }
					identifier="text"
				/>
				<RichText
					ref={ richTextRef }
					allowedFormats={ [] }
					aria-label={ __( 'Supporting copy' ) }
					placeholder={ __( 'Optional Copy…' ) }
					value={ copy }
					onChange={ ( value ) => setCopyText( value ) }
					withoutInteractiveFormatting
					onReplace={ onReplace }
					onMerge={ mergeBlocks }
					identifier="copy"
				/>
				<RichText
					ref={ richTextRef }
					allowedFormats={ [] }
					aria-label={ __( 'URL' ) }
					placeholder={ __( 'Optional Link...' ) }
					value={ url }
					onChange={ ( value ) => setURL( value ) }
					withoutInteractiveFormatting
					onReplace={ onReplace }
					onMerge={ mergeBlocks }
					identifier="url"
				/>
				<ToggleControl
					label="Open in new tab."
					checked={ openExternal }
					onChange={ () => {
						setOpenExternal( ( state ) => !state );
						setExternal ( ( state ) => !state );
					} }
				/>
				<ToggleControl
					label="Enable hover effect on circle without link."
					checked={ enableHover }
					onChange={ () => {
						setEnableHover( ( state ) => !state );
						setHover(enableHover);
					} }
				/>
			</div>
		</>
	);
}
