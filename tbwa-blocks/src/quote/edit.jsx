import { BlockControls, RichText, useBlockProps } from '@wordpress/block-editor';
import { ToolbarDropdownMenu, ToolbarGroup} from '@wordpress/components';
import './editor.scss';


export default function Edit({ attributes, setAttributes }) {

	const char = '”';

	var text = attributes.content;
	if (text) { 
		if (text.slice(-1) != char) { 
			text += char;
		}
	}

	return (
		<>
			<div {...useBlockProps()} >
				<RichText
					identifier='content'
					tagName='div' 
					value={text}
					allowedFormats={[]}
					onChange={(content) => setAttributes({ content })}
					placeholder='Lorem ipsum dolor emit'
				/>
			</div>
		</>
	);
}
