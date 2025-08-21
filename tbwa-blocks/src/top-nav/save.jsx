import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

import { ReactComponent as LogoBackslash } from "./images/logo-backslash.svg";
import { ReactComponent as LogoTBWA } from "./images/logo-tbwa.svg";
import { ReactComponent as LogoDANBackslash } from "./images/DAN-logo-slash.svg";
import { ReactComponent as LogoDAN } from "./images/DAN-logo-6.svg";

import { ReactComponent as IconClose } from "./images/close-icon.svg";
import { ReactComponent as IconSearch } from "./images/search.svg";
import { ReactComponent as IconSearchClear } from "./images/search-clear.svg";
import { ReactComponent as IconHamburger } from "./images/hamburger-icon.svg";

const domain = window.location.hostname;

function CurrentSiteLogo() {	
	if (domain.indexOf('dan') >= 0) {
		return (
			<>
				<LogoDANBackslash className="backslash danlogo" />
				<LogoDAN className="tbwa danlogo" />
			</>
		)
	}
	return (
		<>
			<LogoBackslash className="backslash" />
			<LogoTBWA className="tbwa" />
		</>
	)
}

function CurrentSiteSlash() {	
	if (domain.indexOf('dan') >= 0) {
		return (
			<LogoDANBackslash className="backslash danlogo" />
		)
	}
	return (
		<LogoBackslash className="backslash" />
	)
}

export default function save({ attributes }) {
	const { className } = useBlockProps.save();
	
	return (

		<header className={ `${attributes.solidBG ? 'solid_bg' : ''} ${className}` } >
			<div className="tint-search"></div>
			<div className="column-outer column-outer-1" >
				<div className="column">
					<div className={`logo${domain.indexOf('dan') >= 0 ? ' danlogo' : ''}`}>
						<a href="/" rel="noopener" className={attributes.mediaUrl ? ' noDefault' : ''}>
							{!attributes.mediaUrl? <>
								{attributes.filter? (
									<CurrentSiteSlash />
								) : <CurrentSiteLogo /> }
							</> : <>
								{!attributes.filter? (
									<img 
										src={attributes.mediaUrl} 
										alt={attributes.mediaAlt} 
										title={attributes.mediaTitle} 
										loading="lazy" 
										className="logo_image"
									/>
								) : <></> }
							</>}
						</a>
					</div>
				</div>
			</div>
			<div className="column-outer column-outer-2" >
				<div className="column">
					<div className="buttons">
						<nav>
							<InnerBlocks.Content />
						</nav>
					</div>
					<div className={`logo${domain.indexOf('dan') >= 0 ? ' danlogo' : ''}`}>
						<a href="/" rel="noopener" className={attributes.mediaUrl ? ' noDefault' : ''}>
							{attributes.mediaUrl? <>
								{attributes.filter? (
									<img 
										src={attributes.mediaUrl} 
										alt={attributes.mediaAlt} 
										title={attributes.mediaTitle} 
										loading="lazy" 
										className="logo_image"
									/>
								) : <></> }						
							</> : <>
								{attributes.filter ? (
									<CurrentSiteLogo />
								):(
									<></>
								)}
							</>}
						</a>
					</div>
					<div className="search">
						<form action="/search/" >
							<input name="keywords" type="search" value="" placeholder="I'm looking for..." />
							<IconSearchClear className="search-icon-clear" />
						</form>
						<IconSearch className="search-icon show" />
					</div> 
					<div className="menu">
						<IconHamburger className="hamburger-icon show" />
						<IconClose className="close-icon" />
					</div> 
				</div>
			</div>
		</header>
	);
}
