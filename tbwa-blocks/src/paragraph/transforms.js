
import { createBlock, getBlockAttributes } from '@wordpress/blocks';
import metadata from './block.json';

const transforms = {
	from: [{
		type: 'raw',
		priority: 20,
		selector: 'p',
		schema: ({ phrasingContentSchema, isPaste } ) => ( {
			p: {
				children: phrasingContentSchema,
				attributes: isPaste ? [] : [ 'style', 'id' ],
			},
		}),
		transform( node ) {

			//  The content being pasted in
			var content = node.outerHTML;

			//  Remove images
			content = content.replace(/<img[^>"']*((("[^"]*")|('[^']*'))[^"'>]*)*>/g,"");

			//  Remove empty paragraphs
			content = content.split('<p></p>').join('');

			//  If nothing is left, don't create an empty paragraph
			if (content == '') { 
				return;
			}

			//  Create the new paragraph block 
			const attributes = getBlockAttributes( metadata.name, content );
			return createBlock( metadata.name, attributes );
		},
	}]
};

export default transforms;
