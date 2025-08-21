import { useBlockProps } from '@wordpress/block-editor';

export default function save() {
	return (
		<div {...useBlockProps.save()} >
			<div className="inner">
				<div id="map-search-results"></div>
			</div>
		</div>
	);

}
