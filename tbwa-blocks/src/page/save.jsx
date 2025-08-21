import { __ } from '@wordpress/i18n';
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

import { ReactComponent as FollowCursorServices               } from './follow-cursor/services.svg';
import { ReactComponent as FollowCursorArrowDownLeft          } from './follow-cursor/arrow-down-left.svg';
import { ReactComponent as FollowCursorArrowDownRight         } from './follow-cursor/arrow-down-right.svg';
import { ReactComponent as FollowCursorArrowDown              } from './follow-cursor/arrow-down.svg';
import { ReactComponent as FollowCursorArrowLeft              } from './follow-cursor/arrow-left.svg';
import { ReactComponent as FollowCursorArrowRight             } from './follow-cursor/arrow-right.svg';
import { ReactComponent as FollowCursorArrowUpLeft            } from './follow-cursor/arrow-up-left.svg';
import { ReactComponent as FollowCursorArrowUpRight           } from './follow-cursor/arrow-up-right.svg';
import { ReactComponent as FollowCursorArrowUp                } from './follow-cursor/arrow-up.svg';
import { ReactComponent as FollowCursorBackslashEdges         } from './follow-cursor/backslash-edges.svg';
import { ReactComponent as FollowCursorDiversity              } from './follow-cursor/diversity.svg';
import { ReactComponent as FollowCursorDownloadTheEdgesReport } from './follow-cursor/download-the-edges-report.svg';
import { ReactComponent as FollowCursorDownload               } from './follow-cursor/download.svg';
import { ReactComponent as FollowCursorGo                     } from './follow-cursor/go.svg';
import { ReactComponent as FollowCursorIntelligence           } from './follow-cursor/intelligence.svg';
import { ReactComponent as FollowCursorPause                  } from './follow-cursor/pause.svg';
import { ReactComponent as FollowCursorPlay                   } from './follow-cursor/play.svg';
import { ReactComponent as FollowCursorReadMore               } from './follow-cursor/read-more.svg';
import { ReactComponent as FollowCursorNextX                  } from './follow-cursor/next-x.svg';

 
export default function save({ attributes }) {
	return (
		<div {...useBlockProps.save()} >
			<div id='smooth-scroll-wrapper-outer' >
				<div id='smooth-scroll-wrapper-inner' >
					<div id='page-transition-wrapper' >
						<InnerBlocks.Content />
					</div>
				</div>
			</div>
			<div id='follow-cursor' >
				<FollowCursorServices               className='services' />
				<FollowCursorArrowDownLeft          className='arrow-down-left' />	
				<FollowCursorArrowDownRight         className='arrow-down-right' />
				<FollowCursorArrowDown              className='arrow-down' />
				<FollowCursorArrowLeft              className='arrow-left' />
				<FollowCursorArrowRight             className='arrow-right' />
				<FollowCursorArrowUpLeft            className='arrow-up-left' />
				<FollowCursorArrowUpRight           className='arrow-up-right' />
				<FollowCursorArrowUp                className='arrow-up' />
				<FollowCursorBackslashEdges         className='backslash-edges' />
				<FollowCursorDiversity              className='diversity' />
				<FollowCursorDownloadTheEdgesReport className='download-the-edges-report' />
				<FollowCursorDownload               className='download' />
				<FollowCursorGo                     className='go' />
				<FollowCursorIntelligence           className='intelligence' />
				<FollowCursorPause                  className='pause' />
				<FollowCursorPlay                   className='play' />
				<FollowCursorReadMore               className='read-more' />
				<FollowCursorNextX                  className='next-x' />
			</div>
			<div id='cookie-notification-overlay' ></div>
			<div id='page-transition-overlay' ></div>
		</div>
	);
}


  