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
	SelectControl, 
} from '@wordpress/components';
import { displayShortcut, isKeyboardEvent } from '@wordpress/keycodes';
import { link, linkOff } from '@wordpress/icons';
import { createBlock } from '@wordpress/blocks';

import './editor.scss';

export default function Edit( props ) {

	const { attributes, setAttributes, className, isSelected, onReplace, mergeBlocks } = props;
	const { source, url } = attributes;
	const richTextRef = useRef();

	return (
		<div className='editJobsBlock' >
			<h3>Jobs Feed Block</h3>
			<SelectControl
				label="Source"
				value={ source }
				options={ [
					{ label: 'Live Hire', value: 'liveHire' },
					{ label: 'Recruitee ', value: 'recruitee' },
					{ label: 'Greenhouse', value: 'greenhouse' },
					{ label: 'TeamTailor', value: 'teamTailor' },
					{ label: 'Homerun', value: 'homerun' }
				] }
				onChange={ ( newSource ) => setAttributes({
					source: newSource
				}) }
			/>
			<label htmlFor="url">API</label>
			<RichText
				label='API'
				ref={ richTextRef }
				allowedFormats={ [] }
				aria-label={ __( 'API' ) }
				placeholder={ __( 'Source feed URL...' ) }
				value={ url }
				onChange={ ( value ) => setAttributes({
					url: value
				}) }
				withoutInteractiveFormatting
				identifier="url"
			/>
		</div>
	);
}
