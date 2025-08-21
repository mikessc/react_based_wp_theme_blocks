import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';

export default function Edit({ attributes, setAttributes, clientId }) {

	const parentBlockId = useSelect((select) => {
        const parentIds = select('core/block-editor').getBlockParents(clientId);
        // Get the last parent ID, assuming it's the first one we want
        return parentIds.length > 0 ? parentIds[parentIds.length - 1] : null;
    }, [clientId]);
	
	const parentAttributes = useSelect((select) => {
        return parentBlockId ? select('core/block-editor').getBlock(parentBlockId)?.attributes : {};
    }, [parentBlockId]);

	const {linkUrl, linkTarget} = parentAttributes;

	setAttributes({
		linkUrl, 
		linkTarget
	});

	console.log('attributes:', attributes);

    return (
        <div {...useBlockProps()}>
            <InnerBlocks 
                templateLock='all'  
                template={[
                    ['tbwa-blocks/heading', { display: 'h5', seo: 'h5' }]
                ]}
            />
        </div>
    );
}
