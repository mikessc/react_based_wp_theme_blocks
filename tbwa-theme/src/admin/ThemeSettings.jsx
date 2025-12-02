
import './ThemeSettings.scss';

import api from '@wordpress/api';

import {
	Button,
	Panel,
	PanelBody,
	PanelRow,
	Spinner,
	TextControl, 
	ToggleControl,
	SelectControl,
} from '@wordpress/components';

import {
	render,
	Fragment,
	Component,
} from '@wordpress/element';

import { __ } from '@wordpress/i18n';


class ThemeSettings extends Component {

	constructor() {
		super( ...arguments );

		//  List of blocks and categories
		wp.blockLibrary.registerCoreBlocks();
		this.blocks = wp.blocks.getBlockTypes();
		this.categories = wp.blocks.getCategories();

		//  It's okay to directly set state within construction
		this.state = {
			isAPILoaded: false,
			metaTagsEnabled: false, 
			pageTransitionEnabled: false,
			parallaxEnabled: false,
			smoothScrollEnabled: false,
			cookieNotificationEnabled: false,
			googleAnalyticsEnabled: false,
			googleAnalyticsId: '', 
			underMaintenanceEnabled: false,
			mapUpdateDataUsername: '', 
			mapUpdateDataPassword: '', 
			mapBoxAccessToken: '',
			mailchimpAPIkey: '',
			mailchimpAudienceID: '',
			compassToken: '',
			fontFamily: 'default',
			scrollingAutoNext: true,
		};

	}

	//  Load the settings
	componentDidMount() {
		api.loadPromise.then( () => {
			this.settings = new api.models.Settings();
			if (this.state.isAPILoaded === false) {
				this.settings.fetch().then( ( response ) => {
					console.log(response);
					var o = {
						isAPILoaded: true,
						metaTagsEnabled:           response['tbwa_theme_meta_tags_enabled'] === true ? true : false,
						pageTransitionEnabled:     response['tbwa_theme_page_transition_enabled'] === true ? true : false,
						parallaxEnabled:           response['tbwa_theme_parallax_enabled'] === true ? true : false,
						smoothScrollEnabled:       response['tbwa_theme_smooth_scroll_enabled'] === true ? true : false,
						cookieNotificationEnabled: response['tbwa_theme_cookie_notification_enabled'] === true ? true : false,
						googleAnalyticsEnabled:    response['tbwa_theme_google_analytics_enabled'] === true ? true : false,
						underMaintenanceEnabled:   response['tbwa_theme_under_maintenance_enabled'] === true ? true : false,
						scrollingAutoNext:		   response['tbwa_theme_scrolling_auto_next_enabled'] === true ? true : false,
					}
					o.googleAnalyticsId = '';
					if (response['tbwa_theme_google_analytics_id']) { 
						o.googleAnalyticsId = response['tbwa_theme_google_analytics_id'];
					}
					o.mapUpdateDataUsername = '';
					if (response['tbwa_theme_map_update_data_username']) { 
						o.mapUpdateDataUsername = response['tbwa_theme_map_update_data_username'];
					}
					o.mapUpdateDataPassword = '';
					if (response['tbwa_theme_map_update_data_password']) { 
						o.mapUpdateDataPassword = response['tbwa_theme_map_update_data_password'];
					}
					o.mapBoxAccessToken = '';
					if (response['tbwa_theme_mapbox_access_token']) { 
						o.mapBoxAccessToken = response['tbwa_theme_mapbox_access_token'];
					}
					o.mailchimpAPIkey = '';
					if (response['tbwa_theme_mailchimp_api_key']) { 
						o.mailchimpAPIkey = response['tbwa_theme_mailchimp_api_key'];
					}
					o.mailchimpAudienceID = '';
					if (response['tbwa_theme_mailchimp_audience_id']) { 
						o.mailchimpAudienceID = response['tbwa_theme_mailchimp_audience_id'];
					}
					o.compassToken = '';
					if (response['tbwa_theme_compass_token']) {
						o.compassToken = response['tbwa_theme_compass_token'];
					}
					o.fontFamily = 'default';
					if (response['tbwa_theme_font_family']) {
						o.fontFamily = response['tbwa_theme_font_family'];
					}
					this.setState(o);
					console.log(o);
				});
			}
		});
	}

	//  Toggle a setting
	toggle(name) { 
		this.setState({ [name]:!this.state[name] }, this.saveOption);
	}

	//  Save the states to the wp_options table
	saveOption() { 

		//  Show the spinner
		var spinner = document.getElementById('tbwa-theme-settings-spinner');
		if (spinner) { 
			spinner.style.display = 'inline';
		}

		console.log(this.state);

		//  Save settings
		new api.models.Settings({
			'tbwa_theme_meta_tags_enabled'		     : this.state.metaTagsEnabled === true ? true : false, 
			'tbwa_theme_page_transition_enabled'     : this.state.pageTransitionEnabled === true ? true : false, 
			'tbwa_theme_parallax_enabled'		     : this.state.parallaxEnabled === true ? true : false, 
			'tbwa_theme_smooth_scroll_enabled'       : this.state.smoothScrollEnabled === true ? true : false, 
			'tbwa_theme_scrolling_auto_next_enabled' : this.state.scrollingAutoNext === true ? true : false, 
			'tbwa_theme_cookie_notification_enabled' : this.state.cookieNotificationEnabled === true ? true : false, 
			'tbwa_theme_google_analytics_enabled'    : this.state.googleAnalyticsEnabled === true ? true : false, 
			'tbwa_theme_google_analytics_id'         : this.state.googleAnalyticsId,
			'tbwa_theme_under_maintenance_enabled'   : this.state.underMaintenanceEnabled === true ? true : false, 
			'tbwa_theme_map_update_data_username'    : this.state.mapUpdateDataUsername,
			'tbwa_theme_map_update_data_password'    : this.state.mapUpdateDataPassword,
			'tbwa_theme_mapbox_access_token'         : this.state.mapBoxAccessToken,
			'tbwa_theme_mailchimp_api_key'			 : this.state.mailchimpAPIkey,
			'tbwa_theme_mailchimp_audience_id'		 : this.state.mailchimpAudienceID,
			'tbwa_theme_compass_token'				 : this.state.compassToken,
			'tbwa_theme_font_family'				 : this.state.fontFamily,
		}).save().done(() => {
			
			//  Hide the spinner
			if (spinner) { 
				spinner.style.display = 'none';
			}

			console.log('Saved!');
		});

	}

	//  Render
	render() {

		//  Wait for the settings api to load
		if (!this.state.isAPILoaded) {
			return (
				<div className="wrap" >
					<h1>Loading...</h1>
				</div>
			);
		}

		//  Render the settings
		return (
			<Fragment >
				<div className="wrap" >
					<Panel>
						<PanelBody>
							<PanelRow>
								<ToggleControl
									checked={ this.state.metaTagsEnabled }
									label='Meta Tags'
									help='This adds Meta Tag title, description, keyword and image options to the right side 
										bar of Pages and Posts. These values are added to the HTML Head as Open Graph Meta tags. 
										They are used by social media to create a preview of the page. If you prefer another SEO 
										plugin like Yoast, feel free to use that and disable this. '
									onChange={ checked => this.toggle('metaTagsEnabled') }
								/>
							</PanelRow>
						</PanelBody>
						<PanelBody>
							<PanelRow>
								<ToggleControl
									checked={ this.state.pageTransitionEnabled }
									label='Page Transition'
									help='The page transitions captures all internal links, and when clicked;   
										Loads the destination HTML DOM in the background.  
										Animates the yellow slash to cover the entire page. 
										Replaces the DOM with the destination. 
										Animates the yellow slash to reveal the new page. '
									onChange={ checked => this.toggle('pageTransitionEnabled') }
								/>
							</PanelRow>
						</PanelBody>
						<PanelBody>
							<PanelRow>
								<ToggleControl
									checked={ this.state.parallaxEnabled }
									label='Parallax'
									help='Parallax Container blocks and Column blocks have parallax settings in the sidebar. 
										When parallax is enabled a CSS transform:translateY() is added to these elements 
										as the page scrolls.'
									onChange={ checked => this.toggle('parallaxEnabled') }
								/>
							</PanelRow>
						</PanelBody>
						<PanelBody>
							<PanelRow  >
								<ToggleControl
									checked={ this.state.smoothScrollEnabled }
									label='Smooth Scroll'
									help='On desktop, this replaces the normal scroll with an absolute positioned container 
										which is eased into place as the page scrolls.'
									onChange={ checked => this.toggle('smoothScrollEnabled') }
								/>
							</PanelRow>
						</PanelBody>
						<PanelBody>
							<PanelRow  >
								<ToggleControl
									checked={ this.state.scrollingAutoNext }
									label='Scrolling autonavigation next'
									help='Enable / Disable autoscrolling navigation on work posts.'
									onChange={ checked => {this.toggle('scrollingAutoNext'); console.log(checked);} }
								/>
							</PanelRow>
						</PanelBody>
						{/*
						<PanelBody>
							<PanelRow  >
								<ToggleControl
									checked={ this.state.cookieNotificationEnabled }
									label='Cookie Notification'
									help='This enables the "Do you accept cookies?" notification pop-up. '
									onChange={ checked => this.toggle('cookieNotificationEnabled') }
								/>
							</PanelRow>
						</PanelBody>
						*/}
						<PanelBody>
							<PanelRow  >
								<ToggleControl
									checked={ this.state.googleAnalyticsEnabled }
									label='Google Analytics'
									help='Enables Google Analytics, note that you must provide a valid Google Analytics GA4 measurement ID below.'
									onChange={ checked => this.toggle('googleAnalyticsEnabled') }
								/>
								<TextControl
									label='GA4 Measurement ID:'
									help='For example "G-ABCDE12345"'
									value={ this.state.googleAnalyticsId }
									onChange={ value => this.setState({ 'googleAnalyticsId':value }, this.saveOption) }
								/>
							</PanelRow>
						</PanelBody>
						<PanelBody>
							<PanelRow>
								<ToggleControl
									checked={ this.state.underMaintenanceEnabled }
									label='Under Maintenance Mode'
									onChange={ checked => this.toggle('underMaintenanceEnabled') }
								/>
							</PanelRow  >
							<PanelRow  >
								<p>
									When enabled this redirects all public pages on the site to: &nbsp; 
									<a href="{ window.location.origin+'/under-maintenance/' }">{ window.location.origin+'/under-maintenance/' }</a>.
									If that page does not exist, it will show a plain text message "Site under maintenance".
								</p>
							</PanelRow>
						</PanelBody>
					</Panel>
					<Panel>
						<PanelBody >
							<p><a href="https://www.mapbox.com" >MapBox.com</a> provides the custom styled map tiles used for the map on the Contact page. A MapBox access token is required for the map.</p>
							<PanelRow  >
								<TextControl
									label='MapBox Access Token:'
									value={ this.state.mapBoxAccessToken }
									onChange={ value => this.setState({ 'mapBoxAccessToken':value }, this.saveOption) }
								/>
							</PanelRow  >
						</PanelBody>
						<PanelBody >
							<p><strong>Map Data Feed.</strong> Basic authentication username and password uses to recieve office location data used by the map on the Contact us page.</p>
							<PanelRow  >
								<TextControl
									label='Username: '
									value={ this.state.mapUpdateDataUsername }
									onChange={ value => this.setState({ 'mapUpdateDataUsername':value }, this.saveOption) }
								/>
							</PanelRow  >
							<PanelRow  >
								<TextControl
									type='password' 
									label='Password: '
									value={ this.state.mapUpdateDataPassword }
									onChange={ value => this.setState({ 'mapUpdateDataPassword':value }, this.saveOption) }
								/>
							</PanelRow>
						</PanelBody>
					</Panel>
					<PanelBody >
						<p><strong>Mailchimp API Configuration.</strong>Vvariables needed to connect with Mailchimp subscribe API.</p>
						<PanelRow  >
							<TextControl
								label='Audience ID: '
								value={ this.state.mailchimpAudienceID }
								onChange={ value => this.setState({ 'mailchimpAudienceID':value }, this.saveOption) }
							/>
						</PanelRow  >
						<PanelRow  >
							<TextControl
								label='API key: '
								value={ this.state.mailchimpAPIkey }
								onChange={ value => this.setState({ 'mailchimpAPIkey':value }, this.saveOption) }
							/>
						</PanelRow  >
					</PanelBody>
					<PanelBody >
						<p><strong>Compass token.</strong> Needed for retrieving offices list in order to populate map.</p>
						<PanelRow  >
							<TextControl
								label='Compass Token: '
								value={ this.state.compassToken }
								onChange={ value => this.setState({ 'compassToken':value }, this.saveOption) }
							/>
						</PanelRow  >
					</PanelBody>
					<PanelBody>
						<p><strong>Default font.</strong></p>
						<SelectControl
							label="Font"
							value={ this.state.fontFamily }
							options={ [
								{ label: 'Default', value: 'default' },
								{ label: 'Korean', value: 'korean' }
							] }
							onChange={ value => this.setState({ 'fontFamily':value }, this.saveOption) }
							__nextHasNoMarginBottom
						/>
					</PanelBody>
					<PanelBody>
						<br />
						<Button
							onClick={ () => { 
								this.saveOption() 
								alert('Options saved!');
							}}
							variant='secondary'
						>
							Save
						</Button> <span id="tbwa-theme-settings-spinner"><Spinner /></span>
					</PanelBody>
				</div>
			</Fragment>
		);
	}
}



wp.domReady(function() {
	const element = document.getElementById('tbwa-theme-settings-settings-page');
	if (element) {
		render(
			<Fragment >
				<div className="wrap" >
					<h1>
						TBWA Theme Settings
					</h1>
					<p>
						These advanced features are part of the TBWA theme, and have been built to be compatible with the TBWA blocks.  
						Due to the complexity of these features, it is expected that they will interfere with other third party plugins.
						Disable these settings here to help debug any issues that arrise. 
					</p>
					<p>
						These features rely on a TBWA Blocks Page Block wrapping the whole page with container DIVs. 
						Find the Page inside the page templates.
					</p>
				</div>
				<ThemeSettings />
			</Fragment>
		, element);
	}
});


