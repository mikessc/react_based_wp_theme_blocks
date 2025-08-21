
import { createBlock, getBlockAttributes } from '@wordpress/blocks';
import metadata from './block.json';

const transforms = {
	from: [{
		type: 'raw',
		selector: 'h1,h2,h3,h4,h5,h6',
		schema: ( { phrasingContentSchema, isPaste } ) => {
			const schema = {
				children: phrasingContentSchema,
				attributes: isPaste ? [] : [ 'style', 'id' ],
			};
			return {
				h1: schema,
				h2: schema,
				h3: schema,
				h4: schema,
				h5: schema,
				h6: schema,
			};
		},
		transform( node ) {
			const attributes = getBlockAttributes(metadata.name, node.outerHTML);
			attributes.display = node.nodeName.toLowerCase();
			attributes.seo = node.nodeName.toLowerCase();
			attributes.content = node.innerHTML;
			return createBlock( metadata.name, attributes );
		},
	}]
};

export default transforms;
