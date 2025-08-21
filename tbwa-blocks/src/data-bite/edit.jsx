import { InspectorControls, BlockControls, RichText, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, ToolbarDropdownMenu, ToolbarGroup} from '@wordpress/components';
import './editor.scss';


export default function Edit({ attributes, setAttributes }) {
	return (
		<>
			<div {...useBlockProps()} >
				<RichText
					identifier='content'
					className='content' 
					tagName='div' 
					value={attributes.content}
					allowedFormats={['core/superscript']}
					onChange={(value) => setAttributes({ 'content': value })}
					placeholder='123'
				/>
				<RichText
					identifier='detail'
					className='detail' 
					tagName='div' 
					value={attributes.detail}
					allowedFormats={[]}
					onChange={(value) => setAttributes({ 'detail': value })}
					placeholder='Lorem ipsum dolor emit'
				/>
			</div>
			<InspectorControls>
				<PanelBody initialOpen={true} >
					<p>Superscript characters (like $ or %) help keep the yellow text shorter on tablet and mobile. </p>
					<p>Look for the superscript button under the "&#x2304;" in the toolbar attached to the yellow text. </p>
					<p>The superscript characters are full size on desktop, but smaller on tablet and mobile. </p>
				</PanelBody>
			</InspectorControls>
		</>
	);
}
