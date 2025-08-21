
import { useBlockProps } from '@wordpress/block-editor';
import { dispatch, select, useSelect } from '@wordpress/data';
import './editor.scss';


export default function Edit({ attributes, setAttributes }) {

	const CategoryTags = () => {

		const categories = useSelect((select) => {
			const catIds = select('core/editor').getEditedPostAttribute('tbwa-work-category');
			if (catIds == null) {  
				return null;
			}
			if (catIds.length <= 0) { 
				return [];
			}
			return select('core').getEntityRecords('taxonomy', 'tbwa-work-category', { include: catIds.join(','), per_page: -1 });
		});

		if (categories == null) {
			return <div className='tbwa-tag-categories' >
					<a key='2' href='' target='' >Work</a>
					<a key='3' href='' target='' >Categories</a>
				</div>;
			//return <p>Loading...</p>;
		}

		var tags = [];
		for (var i=0; i<categories.length; i++) { 
			var category = categories[i];
			tags.push();
		}

		return (
			<div className='tbwa-tag-categories' >{ categories.map((category, i) => <a key={i} href={category.link} target='' >{category.name}</a>) }</div>
		);

	};

	return (
		<div {...useBlockProps()} >
			<CategoryTags />
		</div>
	);
}


