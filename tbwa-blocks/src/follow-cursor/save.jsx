import { useBlockProps } from '@wordpress/block-editor';

import { ReactComponent as FollowCursorServices               } from './images/services.svg';
import { ReactComponent as FollowCursorArrowDownLeft          } from './images/arrow-down-left.svg';
import { ReactComponent as FollowCursorArrowDownRight         } from './images/arrow-down-right.svg';
import { ReactComponent as FollowCursorArrowDown              } from './images/arrow-down.svg';
import { ReactComponent as FollowCursorArrowLeft              } from './images/arrow-left.svg';
import { ReactComponent as FollowCursorArrowRight             } from './images/arrow-right.svg';
import { ReactComponent as FollowCursorArrowUpLeft            } from './images/arrow-up-left.svg';
import { ReactComponent as FollowCursorArrowUpRight           } from './images/arrow-up-right.svg';
import { ReactComponent as FollowCursorArrowUp                } from './images/arrow-up.svg';
import { ReactComponent as FollowCursorBackslashEdges         } from './images/backslash-edges.svg';
import { ReactComponent as FollowCursorDiversity              } from './images/diversity.svg';
import { ReactComponent as FollowCursorDownloadTheEdgesReport } from './images/download-the-edges-report.svg';
import { ReactComponent as FollowCursorDownload               } from './images/download.svg';
import { ReactComponent as FollowCursorGo                     } from './images/go.svg';
import { ReactComponent as FollowCursorIntelligence           } from './images/intelligence.svg';
import { ReactComponent as FollowCursorPause                  } from './images/pause.svg';
import { ReactComponent as FollowCursorPlay                   } from './images/play.svg';
import { ReactComponent as FollowCursorReadMore               } from './images/read-more.svg';
import { ReactComponent as FollowCursorNextX                  } from './images/next-x.svg';

export default function save({ attributes }) {


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

	const blockClasses = {
		'className':'position-'+attributes.position+' size-'+attributes.size+' color-'+attributes.color
	};

	return (
		<div {...useBlockProps.save(blockClasses)}  >
			<a 
				href={ attributes.linkUrl } 
				target={ attributes.linkTarget } 
				title={ attributes.cursorName }
				data-cursor={ attributes.cursor } 
				data-cursor-position={ attributes.position } 
				data-cursor-size={ attributes.size } 
				data-cursor-color={ attributes.color } 
				rel="noopener" >{ currentCursor() }</a>
		</div>
	);
}
