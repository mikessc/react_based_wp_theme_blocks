import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, PanelRow, SelectControl } from '@wordpress/components';
import { select, useSelect } from '@wordpress/data';
import { __experimentalGetSettings, format } from '@wordpress/date';
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {

	const dateFormat = __experimentalGetSettings().formats.date;

	//  Preview one news summary
	const FeaturedImage = ({mediaID}) => {

		if (mediaID == null || mediaID == 0) { 
			return '';
		}

		const media = useSelect((select) => {
			return select('core').getEntityRecord('postType', 'attachment', mediaID);
		});
		
		if (media == null) {
			return <p>Loading...</p>;
		}

		return (
			<>
				<img src={ media.source_url } />
			</>
		);
	}

	//  Preview one news summary
	const NewsSummary = ({postID}) => {

		const item = useSelect((select) => {
			return select('core').getEntityRecord('postType', 'tbwa-news', postID);
		});
		
		if (item == null) {
			return <p>Select a News post from the sidebar.</p>;
		}

		return (
			<>
				<div className='image wp-block-tbwa-blocks-image proportion-16-by-9 media-type-image'>
					<FeaturedImage mediaID={ item.featured_media } />  
				</div>
				
				<div className='wp-block-tbwa-blocks-paragraph date'>
					<p className='small'>
						{ format(dateFormat, item.date) }
					</p>
				</div>

				<h5 className='h5 title'>{ item.title.raw }</h5>
				
				{ item.meta._tbwa_meta_tags_news_author != '' && 
				<div className='wp-block-tbwa-blocks-paragraph author'>
					<p className='small'>
						{ item.meta._tbwa_meta_tags_news_author != '' && item.meta._tbwa_meta_tags_news_author }
					</p>
				</div>
				}

				<div className='wp-block-tbwa-blocks-paragraph excerpt'>
					<p className='standard'>{ item.excerpt.raw }</p>
				</div>

			</>
		);
	};

	//  Select from all the news posts in a dropdown in the sidebar
	const SelectFromAllPosts = () => {

		const args = {
			'per_page': -1,
			'status': 'publish',
			'orderby': 'title',
			'order': 'asc'
		};

		const items = useSelect((select) => {
			return select('core').getEntityRecords('postType', 'tbwa-news', args);
		});
		
		if (items == null) {
			return <p>Loading...</p>;
		}

		var options = [];
		if (items) { 
			for (var i=0; i<items.length; i++) { 
				var item = items[i];
				options.push({
					label: item.title.raw,
					value: item.id
				});
			}
		}

		return (
			<SelectControl
				value={ attributes.postID }
				options={ options }
				onChange={(value) => setAttributes({ 'postID': value })}
			/>
		);
	};

	return (
		<>
			<InspectorControls >
				<PanelBody title='Featured News' initialOpen={true} >
					<SelectFromAllPosts />
				</PanelBody>
			</InspectorControls>
			<div {...useBlockProps()} >
				<NewsSummary postID={ attributes.postID } />
			</div>
		</>
	);
}



