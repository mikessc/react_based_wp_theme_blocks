import { registerBlockType } from '@wordpress/blocks';
import { color } from '../_common.jsx';

import './style.scss';

import metadata from './block.json';
import Edit from './edit';
import save from './save';
import transforms from './transforms';

import { ReactComponent as iconBlock } from "./icons/heading-block.svg"; 

registerBlockType(metadata.name, {
	edit: Edit,
	save,
	icon: {
		background: color.blockBackground,
		foreground: color.blockForeground,
		src:iconBlock,
	},
	transforms
});
