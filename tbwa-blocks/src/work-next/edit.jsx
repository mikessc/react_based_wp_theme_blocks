import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, PanelRow, SelectControl } from '@wordpress/components';
import { select, useSelect } from '@wordpress/data';
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
	return (
		<>
			<div {...useBlockProps()} >
				<div className='wp-block-tbwa-blocks-section width-standard background-black'>
					<div>
						<div className='wp-block-tbwa-blocks-rule-line'><div className='width-full'></div></div>
						<div className='wp-block-tbwa-blocks-paragraph'><p className='standard bottom-margin-80'>Next</p></div>
						<h4 className='h4 title'>Title of the next work</h4>
						<div className='wp-block-tbwa-blocks-paragraph excerpt'>
							<p className='standard'>Excerpt for the next work item automatically populates this text. </p>
						</div>
						<div className='image wp-block-tbwa-blocks-image proportion-top-cut no-media-selected'></div>
					</div>
				</div>
			</div>
		</>
	);
}
