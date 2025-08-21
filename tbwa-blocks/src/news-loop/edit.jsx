import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import { dispatch, select, useSelect } from '@wordpress/data';
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {

	const { category, categoryName } = attributes;
	
	const CategoryTags = () => {

		const categories = useSelect((select) => {
			return select('core').getEntityRecords('taxonomy', 'tbwa-news-category');
		});

		if (!categories) {
			return 'Loading... ';
		}

		return (
			<select className='tbwa-categories-select news-loop__category-select' 
				value = {category}
				onChange = {
					(event) => { setAttributes({ 
							category: event.target.value,
							categoryName:event.target[event.target.selectedIndex].text
						})
					}
				}>
				<option>-- Select category --</option>
				{ categories.map((currentCategory, i) => (<option key={i} value={currentCategory.slug}>{currentCategory.name}</option>)) }
			</select>
		);

	};

	return (
		<>
			<div {...useBlockProps()} >
				<div className="width-standard background-white">
					<CategoryTags />
					<div className="no-media-selected">
						<CategoryTags />
						News Loop{category != '' ? (<span>: {categoryName}</span>) : (<></>)}
					</div>
				</div>
			</div>
		</>
	);
}