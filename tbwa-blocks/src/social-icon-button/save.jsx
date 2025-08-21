import { RichText, useBlockProps } from '@wordpress/block-editor';

import { ReactComponent as ButtonInstagram } from './images/button-instagram.svg';
import { ReactComponent as ButtonTwitter } from './images/button-twitter.svg';
import { ReactComponent as ButtonLinkedIn } from './images/button-linkedin.svg';
import { ReactComponent as ButtonFacebook } from './images/button-facebook.svg';
import { ReactComponent as ButtonYoutube } from './images/button-youtube.svg';
import { ReactComponent as ButtonWeChat } from './images/button-wechat.svg';
import { ReactComponent as ButtonWeibo } from './images/button-weibo.svg';
import { ReactComponent as ButtonRed } from './images/button-red.svg';


export default function save({ attributes, className }) {
	const { icon, url, target, rel } = attributes;


	const currentButton = () => { 
		switch (attributes.icon) { 
			case 'instagram': return <ButtonInstagram />;
			case 'twitter':   return <ButtonTwitter />;
			case 'linkedin':  return <ButtonLinkedIn />;
			case 'facebook':  return <ButtonFacebook />;
			case 'youtube':  return <ButtonYoutube />;
			case 'wechat':  return <ButtonWeChat />;
			case 'weibo':  return <ButtonWeibo />;
			case 'red' : return <ButtonRed />;

		}
	}

	//   icon.charAt(0).toUpperCase() + icon.slice(1)

	return (
		<div {...useBlockProps.save()} >
			<a
				href={ url }
				title={ icon }
				target={ target }
				rel={ rel }
			>{ currentButton() }</a>
		</div>
	);
}



