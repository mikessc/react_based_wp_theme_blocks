import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, RangeControl, ToggleControl, TextControl } from '@wordpress/components';
import { select, useSelect } from '@wordpress/data';
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
	const { numberOfItems, showSeeMore, seeMoreText } = attributes;

	return (
		<>
			<div {...useBlockProps()} >
				<div className="width-standard background-black">
					<div className="no-media-selected">
						Work Featured Loop
					</div>
					<div className="my-controls">
						<RangeControl
							label={__('Number of Items', 'text-domain')}
							value={numberOfItems}
							onChange={(value) => setAttributes({ numberOfItems: value })}
							min={1}
							max={300}
						/>
						<ToggleControl
							label={__('Show "See More" Button', 'text-domain')}
							checked={showSeeMore}
							onChange={(value) => setAttributes({ showSeeMore: value })}
						/>
						{showSeeMore && (
							<TextControl
								label={__('See More Button Text', 'text-domain')}
								value={seeMoreText}
								onChange={(value) => setAttributes({ seeMoreText: value })}
							/>
						)}
					</div>
				</div> 
			</div>
		</>
	);
}


