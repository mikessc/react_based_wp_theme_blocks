import { useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {

	const timing = { 'animationDuration': (attributes.title.length*6)+'s' }

	return (
		<div {...useBlockProps.save({'className':'background-'+attributes.background})} >
			<div class="ticker-wrap">
				<div className='ticker' style={timing} >
					<span class="item-collection-1" style={timing}>
						<span class="item">{ attributes.title }</span>
						<span class="item">{ attributes.title }</span>
						<span class="item">{ attributes.title }</span>
						<span class="item">{ attributes.title }</span>
					</span>
					<span class="item-collection-2">
						<span class="item">{ attributes.title }</span>
						<span class="item">{ attributes.title }</span>
						<span class="item">{ attributes.title }</span>
						<span class="item">{ attributes.title }</span>
					</span>
				</div>
			</div>
		</div>
	);
}
