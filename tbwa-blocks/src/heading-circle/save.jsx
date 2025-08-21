import { RichText, InnerBlocks, useBlockProps } from '@wordpress/block-editor';

function CurrentContent(attributes) {
	return (
		<div class="circle-heading__circle">
			<div class="circle__content">
				<RichText.Content
					tagName="h5"
					value={ attributes.text }
					class="content__title h5"
				/>
				{attributes.copy ? (<RichText.Content
					tagName="h6"
					value={ attributes.copy }
					class="content__copy h6"
				/>) : ("")}
			</div>
		</div>
	);
};

function setShowHover (hover, url) {
	if (hover !== undefined && hover === true) {
		return true;
	}
	if (url !== undefined || url !== '') {
		return true;
	}
	return false;
};

export default function save({ attributes, className }) {
	const { text, copy, url, target, hover } = attributes;

	return (
		<div className={url !== '' || hover ? 'wp-block-tbwa-blocks-heading-circle hoverEnabled ' + hover : 'wp-block-tbwa-blocks-heading-circle'}>
			{url ? (<a href={ url } target={ target ? ("_blank") : ('') }>
				<CurrentContent text={text} copy={copy} />
			</a>) : <CurrentContent text={text} copy={copy} /> }
		</div>
	);
}
