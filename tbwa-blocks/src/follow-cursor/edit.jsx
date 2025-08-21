import { __ } from '@wordpress/i18n';
import { 
	useCallback, 
	useEffect, 
	useState, 
	useRef 
} from '@wordpress/element';
import { 
	InspectorControls, 
	BlockControls, 
	__experimentalLinkControl as LinkControl, 
	useBlockProps
} from '@wordpress/block-editor';
import { 
	ToolbarDropdownMenu, 
	ToolbarButton, 
	ToolbarGroup, 
	PanelBody, 
	PanelRow, 
	Button, 
	Popover, 
	TextControl,
	ExternalLink, 
	SelectControl,  
	__experimentalNumberControl as NumberControl, 
} from '@wordpress/components';
import { 
	dispatch, 
	useSelect 
} from '@wordpress/data';

import './editor.scss';

import { link as iconLink, linkOff as iconLinkOff } from '@wordpress/icons';

import { ReactComponent as FollowCursorServices               } from './images/services.svg';
import { ReactComponent as FollowCursorArrowDownLeft          } from './images/arrow-down-left.svg';
import { ReactComponent as FollowCursorArrowDownRight         } from './images/arrow-down-right.svg';
import { ReactComponent as FollowCursorArrowDown              } from './images/arrow-down.svg';
import { ReactComponent as FollowCursorArrowLeft              } from './images/arrow-left.svg';
import { ReactComponent as FollowCursorArrowRight             } from './images/arrow-right.svg';
import { ReactComponent as FollowCursorArrowUpLeft            } from './images/arrow-up-left.svg';
import { ReactComponent as FollowCursorArrowUpRight           } from './images/arrow-up-right.svg';
import { ReactComponent as FollowCursorArrowUp                } from './images/arrow-up.svg';
import { ReactComponent as FollowCursorBackslashEdges         } from './images/backslash-edges.svg';;
import { ReactComponent as FollowCursorDiversity              } from './images/diversity.svg';
import { ReactComponent as FollowCursorDownloadTheEdgesReport } from './images/download-the-edges-report.svg';
import { ReactComponent as FollowCursorDownload               } from './images/download.svg';
import { ReactComponent as FollowCursorGo                     } from './images/go.svg';
import { ReactComponent as FollowCursorIntelligence           } from './images/intelligence.svg';
import { ReactComponent as FollowCursorPause                  } from './images/pause.svg';
import { ReactComponent as FollowCursorPlay                   } from './images/play.svg';
import { ReactComponent as FollowCursorReadMore               } from './images/read-more.svg';
import { ReactComponent as FollowCursorNextX                  } from './images/next-x.svg';

export default function Edit({ attributes, setAttributes}) {

	const [ isEditingURL, setIsEditingURL ] = useState( false );

	function unlink() {
		setAttributes({
			'linkUrl': '',
			'linkTarget': '_parent'
		}); 
		setIsEditingURL(false);
	}

	function link( event ) {
		event.preventDefault();
		setIsEditingURL(true);
	}

	function panelToggle(newState) { 
		if (newState) { 
			setAttributes({
				'itemOpen': index,
				'isEditingURL' : false
			}); 
		}
	}

	const currentCursor = () => { 
		switch (attributes.cursor) { 
			case 'services':  return <FollowCursorServices />;
			case 'arrow-down-left':  return <FollowCursorArrowDownLeft />;
			case 'arrow-down-right':  return <FollowCursorArrowDownRight />;
			case 'arrow-down':  return <FollowCursorArrowDown />;
			case 'arrow-left':  return <FollowCursorArrowLeft />;
			case 'arrow-right':  return <FollowCursorArrowRight />;
			case 'arrow-up-left':  return <FollowCursorArrowUpLeft />;
			case 'arrow-up-right':  return <FollowCursorArrowUpRight />;
			case 'arrow-up':  return <FollowCursorArrowUp />;
			case 'backslash-edges':  return <FollowCursorBackslashEdges />;
			case 'diversity':  return <FollowCursorDiversity />;
			case 'download-the-edges-report':  return <FollowCursorDownloadTheEdgesReport />;
			case 'download':  return <FollowCursorDownload />;
			case 'go':  return <FollowCursorGo />;
			case 'intelligence':  return <FollowCursorIntelligence />;
			case 'pause':  return <FollowCursorPause />;
			case 'play':  return <FollowCursorPlay />;
			case 'read-more':  return <FollowCursorReadMore />;
			case 'next-x':  return <FollowCursorNextX />;
		}
	}

	const cursorName = (value) => { 
		switch (value) { 
			case 'services':  return 'Services';
			case 'arrow-down-left':  return 'Arrow Down Left';
			case 'arrow-down-right':  return 'Arrow Down Right';
			case 'arrow-down':  return 'Arrow Down';
			case 'arrow-left':  return 'Arrow Left';
			case 'arrow-right':  return 'Arrow Right';
			case 'arrow-up-left':  return 'Arrow Up Left';
			case 'arrow-up-right':  return 'Arrow Up Right';
			case 'arrow-up':  return 'Arrow Up';
			case 'backslash-edges':  return 'Backslash Edges';
			case 'diversity':  return 'Diversity';
			case 'download-the-edges-report':  return 'Download The Edges Report';
			case 'download':  return 'Download';
			case 'go':  return 'Go';
			case 'intelligence':  return 'Intelligence';
			case 'pause':  return 'Pause';
			case 'play':  return 'Play';
			case 'read-more':  return 'Read more';
			case 'next-x':  return 'NEXT X';
		}
		return '';
	}

	const blockClasses = {
		'className':'position-'+attributes.position+' size-'+attributes.size+' color-'+attributes.color
	};

	return (
		<>
			<InspectorControls >
				<PanelBody 
					title={ 'Follow Cursor' } 
					initialOpen={ true } 
					onToggle={ panelToggle }
					>
					<p>This block adds the exclusion mode circle that follows the cursor.  The cursor is active over the block immedately before this block. </p>
					<SelectControl
						label={ 'Text or icon' } 
						value={ attributes.cursor }
						options={ [
							{ value:'go', label:'Go' },
							{ value:'diversity', label:'Diversity' },
							{ value:'download', label:'Download' },
							{ value:'download-the-edges-report', label:'Download The Edges Report' },
							{ value:'intelligence', label:'Intelligence' },
							{ value:'services', label:'Services' },
							{ value:'read-more', label:'Read more' }, 
							{ value:'play', label:'Play' },
							{ value:'pause', label:'Pause' },
							{ value:'backslash-edges', label:'Backslash Edges' },
							{ value:'arrow-right', label:'Arrow Right' },
							{ value:'arrow-left', label:'Arrow Left' },
							{ value:'arrow-up', label:'Arrow Up' },
							{ value:'arrow-down', label:'Arrow Down' },
							{ value:'arrow-up-left', label:'Arrow Up Left' },
							{ value:'arrow-up-right', label:'Arrow Up Right' },
							{ value:'arrow-down-right', label:'Arrow Down Right' },
							{ value:'arrow-down-left', label:'Arrow Down Left' },
							{ value:'next-x', label:'Next X' },
						] }
						onChange={(value) => { 
							setAttributes({ 
								'cursor': value , 
								'cursorName': cursorName(value) 
							})
						}}
					/>
					<SelectControl
						label={ 'Size' } 
						value={ attributes.size }
						options={ [
							{ value:'small',  label:'Small (120px)'   },
							{ value:'medium', label:'Medium (190px)'  },
							{ value:'large',  label:'Large (264.3px)' }
						] }
						onChange={(value) => { 
							setAttributes({ 'size': value })
						}}
					/>
					<SelectControl
						label={ 'Color' } 
						value={ attributes.color }
						options={ [
							{ value:'black-white',  label:'Black/White'   },
							{ value:'yellow',		label:'Yellow'  }
						] }
						onChange={(value) => { 
							setAttributes({ 'color': value })
						}}
					/>
					<SelectControl
						label={ 'Mobile/Tablet Position' } 
						help="On mobile and tablets with touchscreens there is no mouse cursor to follow.  In these situations the circle is shown in a fixed position. Choose where its shown or hide it."
						value={ attributes.position }
						options={ [
							{ value:'left',           label:'Left'    },
							{ value:'center',         label:'Center'  },
							{ value:'right',          label:'Right'   },
							{ value:'overlap-left',   label:'Overlap Left'   },
							{ value:'overlap-center', label:'Overlap Center' },
							{ value:'overlap-right',  label:'Overlap Right'  },
							{ value:'hidden',         label:'Hidden'    },
						] }
						onChange={(value) => { 
							setAttributes({ 'position': value })
						}}
					/>
					<p>This link (required) is activated when you click on the Follow Cursor. </p>
					{ attributes.linkUrl == '' && (
						<PanelRow >
							<Button
								name="link"
								icon={ iconLink }
								title={ __( 'Link' ) }
								onClick={ link }
								style={ {'paddingLeft':'0px'} }
							>Select Link</Button>
						</PanelRow>
					)}
					{ attributes.linkUrl != '' && (
						<>
						<PanelRow>
							<ExternalLink variant="link" href={attributes.linkUrl} target={attributes.linkTarget} >{attributes.linkUrl}</ExternalLink>
						</PanelRow>
						<PanelRow >
							<Button
								name="unlink"
								icon={ iconLinkOff }
								title={ __( 'Unlink' ) }
								onClick={ unlink }
								style={ {'paddingLeft':'0px'} }
							>Remove Link</Button>
							<Button
								name="link"
								icon={ iconLink }
								title={ __( 'Link' ) }
								onClick={ link }
							>Edit Link</Button>
						</PanelRow>
						</>
					)}
					{ isEditingURL && (
						<Popover>
							<LinkControl 
								value={{
									'url': attributes.linkUrl, 
									'opensInNewTab': attributes.linkTarget == '_blank' 
								}}
								onChange={ (value) => {
									setAttributes({
										'linkUrl': value.url, 
										'linkTarget': value.opensInNewTab ? '_blank': '_parent'
									}); 
								}}
								onRemove={ unlink }
							/>
						</Popover>
					)}
				</PanelBody>				
			</InspectorControls >
			<div {...useBlockProps(blockClasses)} >
				{ currentCursor() }
			</div>
		</>
	);
}
