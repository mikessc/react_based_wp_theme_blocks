import { registerBlockType } from '@wordpress/blocks';
import { color } from '../_common.jsx';

import './style.scss';

import metadata from './block.json';
import Edit from './edit';
import save from './save';

import { ReactComponent as iconBlock } from "./icons/data-bite-container-block.svg"; 

registerBlockType(metadata.name, {
	edit: Edit,
	save,
	icon: {
		background: color.blockBackground,
		foreground: color.blockForeground,
		src:iconBlock,
	},
});

