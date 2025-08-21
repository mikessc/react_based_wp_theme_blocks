
import { registerPlugin } from '@wordpress/plugins';
import MetaTagsSidebar from './MetaTagsSidebar.jsx';
import LeadershipSidebar from './LeadershipSidebar.jsx';
import ClientNameSidebar from './ClientNameSidebar.jsx';
import NewsExternalLink from './NewsExternalLink.jsx';
import NewsAuthor from './NewsAuthor.jsx';
import ThemeSettings from './ThemeSettings.jsx';
import ColorSettings from './ColorSettings.jsx';
import './index.scss';
import '../frontend/tags.scss';

registerPlugin('tbwa-leadership-sidebar', {
	icon: null,
	render() {
		return(<LeadershipSidebar />);
	}
});

registerPlugin('tbwa-meta-tags-sidebar', {
	icon: null,
	render() {
		return(<MetaTagsSidebar />);
	}
});

registerPlugin('tbwa-meta-client-name-sidebar', {
	icon: null,
	render() {
		return(<ClientNameSidebar />);
	}
});

registerPlugin('tbwa-meta-news-external-link-sidebar', {
	icon: null,
	render() {
		return(<NewsExternalLink />);
	}
});

registerPlugin('tbwa-meta-news-author-sidebar', {
	icon: null,
	render() {
		return(<NewsAuthor />);
	}
});






