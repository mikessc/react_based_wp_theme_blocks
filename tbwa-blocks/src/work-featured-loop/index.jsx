import { registerBlockType } from '@wordpress/blocks';
import { color } from '../_common.jsx';

import './style.scss';

import metadata from './block.json';
import Edit from './edit.jsx';

import { ReactComponent as IconBlock } from "./icons/loop.svg"; 

registerBlockType(metadata.name, {
	edit: Edit,
	icon: {
		background: color.blockBackground,
		foreground: color.blockForeground,
		src: IconBlock,
	}
});
