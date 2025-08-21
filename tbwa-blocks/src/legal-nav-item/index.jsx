import { registerBlockType } from '@wordpress/blocks';
import { color } from '../_common.jsx';

import './style.scss';

import metadata from './block.json';
import Edit from './edit';
import save from './save';

import { ReactComponent as IconBlock } from "./icons/legal-nav-item-block.svg"; 

registerBlockType(metadata.name, {
	edit: Edit,
	save,
	icon: {
		background: color.blockBackground,
		foreground: color.blockForeground,
		src:IconBlock,
	},
});

