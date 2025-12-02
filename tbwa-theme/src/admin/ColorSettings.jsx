
import './ThemeSettings.scss';

import api from '@wordpress/api';

import {
	Button,
	Panel,
	PanelBody,
	PanelRow,
	Spinner,
	TextControl, 
	Flex,
	FlexItem,
	ToggleControl,
} from '@wordpress/components';

import {
	render,
	Fragment,
	Component,
} from '@wordpress/element';

import { __ } from '@wordpress/i18n';


class ColorSettings extends Component {

	constructor() {
		super( ...arguments );

		//  List of blocks and categories
		wp.blockLibrary.registerCoreBlocks();
		this.blocks = wp.blocks.getBlockTypes();
		this.categories = wp.blocks.getCategories();

		//  It's okay to directly set state within construction
		this.state = {
			isAPILoaded: false,
			tbwa_theme_color_black : '#0A0A0D',
			tbwa_theme_color_white : '#FFFFFF',
			tbwa_theme_color_yellow : '#FECC00',
			tbwa_theme_color_yellow_inverted : '#0133FF',
			tbwa_theme_color_dark_grey : '#4D4D4D',
			tbwa_theme_color_light_grey : '#BDBDBD',
			tbwa_theme_color_error_red : '#E45A3B',
			tbwa_theme_color_legal_nav_grey : '#868686',
			tbwa_theme_color_white_hint : '#868686',
			tbwa_theme_color_white_hint : '#000000',
			tbwa_theme_color_white_disabled : '#D0D0D0',
			tbwa_theme_color_black_hint : '#D0D0D0',
			tbwa_theme_color_black_disabled : '#4D4D4D',
			tbwa_theme_color_invert_links : false,
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
					};
					o.tbwa_theme_color_black = response['tbwa_theme_color_black'] || '#0A0A0D';
					o.tbwa_theme_color_white = response['tbwa_theme_color_white'] || '#FFFFFF';
					o.tbwa_theme_color_yellow = response['tbwa_theme_color_yellow'] || '#FECC00';
					o.tbwa_theme_color_yellow_inverted = response['tbwa_theme_color_yellow_inverted'] || '#0133FF';
					o.tbwa_theme_color_dark_grey = response['tbwa_theme_color_dark_grey'] || '#4D4D4D';
					o.tbwa_theme_color_light_grey = response['tbwa_theme_color_light_grey'] || '#BDBDBD';
					o.tbwa_theme_color_error_red = response['tbwa_theme_color_error_red'] || '#E45A3B';
					o.tbwa_theme_color_legal_nav_grey = response['tbwa_theme_color_legal_nav_grey'] || '#868686';
					o.tbwa_theme_color_white_hint = response['tbwa_theme_color_white_hint'] || '#868686';
					o.tbwa_theme_color_white_hint = response['tbwa_theme_color_white_hint'] || '#000000';
					o.tbwa_theme_color_white_disabled = response['tbwa_theme_color_white_disabled'] || '#D0D0D0';
					o.tbwa_theme_color_black_hint = response['tbwa_theme_color_black_hint'] || '#D0D0D0';
					o.tbwa_theme_color_black_disabled = response['tbwa_theme_color_black_disabled'] || '#4D4D4D';
					o.tbwa_theme_color_invert_links = response['tbwa_theme_color_invert_links'] || false;
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
			'tbwa_theme_color_black'			: this.state.tbwa_theme_color_black,
			'tbwa_theme_color_white'			: this.state.tbwa_theme_color_white,
			'tbwa_theme_color_yellow'			: this.state.tbwa_theme_color_yellow,
			'tbwa_theme_color_yellow_inverted'	: this.state.tbwa_theme_color_yellow_inverted,
			'tbwa_theme_color_dark_grey'		: this.state.tbwa_theme_color_dark_grey,
			'tbwa_theme_color_light_grey'		: this.state.tbwa_theme_color_light_grey,
			'tbwa_theme_color_error_red'		: this.state.tbwa_theme_color_error_red,
			'tbwa_theme_color_legal_nav_grey'	: this.state.tbwa_theme_color_legal_nav_grey,
			'tbwa_theme_color_white_hint'		: this.state.tbwa_theme_color_white_hint,
			'tbwa_theme_color_white_hint'		: this.state.tbwa_theme_color_white_hint,
			'tbwa_theme_color_white_disabled'	: this.state.tbwa_theme_color_white_disabled,
			'tbwa_theme_color_black_hint'		: this.state.tbwa_theme_color_black_hint,
			'tbwa_theme_color_black_disabled'	: this.state.tbwa_theme_color_black_disabled,
			'tbwa_theme_color_invert_links'		: this.state.tbwa_theme_color_invert_links,
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
									checked={ this.state.tbwa_theme_color_invert_links }
									label='Invert links color'
									help='This will make the links to get inverted color so they will have mor contrast on light backgrounds. '
									onChange={ checked => this.toggle('tbwa_theme_color_invert_links') }
								/>
							</PanelRow>
						</PanelBody>
						<PanelBody>
							<PanelRow  >
								<Flex gap={2} justify="flex-start">
									<FlexItem>
										<TextControl
											label='Black:'
											value={ this.state.tbwa_theme_color_black }
											onChange={ value => this.setState({ 'tbwa_theme_color_black':value }, this.saveOption) }
										/><br />
									</FlexItem>
									<FlexItem>
										<TextControl
											label='White:'
											value={ this.state.tbwa_theme_color_white }
											onChange={ value => this.setState({ 'tbwa_theme_color_white':value }, this.saveOption) }
										/><br />
									</FlexItem>
									<FlexItem>
										<TextControl
											label='Yellow:'
											value={ this.state.tbwa_theme_color_yellow }
											onChange={ value => this.setState({ 'tbwa_theme_color_yellow':value }, this.saveOption) }
										/><br />
									</FlexItem>
									<FlexItem>
										<TextControl
											label='Yellow Inverted:'
											value={ this.state.tbwa_theme_color_yellow_inverted }
											onChange={ value => this.setState({ 'tbwa_theme_color_yellow_inverted':value }, this.saveOption) }
										/><br />
									</FlexItem>
								</Flex>
								</PanelRow  >
						</PanelBody>
						<PanelBody>
							<PanelRow  >
								<Flex gap={2} justify="flex-start">
									<FlexItem>
										<TextControl
											label='Dark Grey:'
											value={ this.state.tbwa_theme_color_dark_grey }
											onChange={ value => this.setState({ 'tbwa_theme_color_dark_grey':value }, this.saveOption) }
										/><br />
									</FlexItem>
									<FlexItem>
										<TextControl
											label='Light Grey:'
											value={ this.state.tbwa_theme_color_light_grey }
											onChange={ value => this.setState({ 'tbwa_theme_color_light_grey':value }, this.saveOption) }
										/><br />
									</FlexItem>
									<FlexItem>
										<TextControl
											label='Legal Nav Grey:'
											value={ this.state.tbwa_theme_color_legal_nav_grey }
											onChange={ value => this.setState({ 'tbwa_theme_color_legal_nav_grey':value }, this.saveOption) }
										/><br />
									</FlexItem>
								</Flex>
								</PanelRow  >
						</PanelBody>
						<PanelBody>
							<PanelRow  >
								<Flex gap={2} justify="flex-start">
									<FlexItem>
										<TextControl
											label='Error Red:'
											value={ this.state.tbwa_theme_color_error_red }
											onChange={ value => this.setState({ 'tbwa_theme_color_error_red':value }, this.saveOption) }
										/><br />
									</FlexItem>
									<FlexItem>
										<TextControl
											label='White Hint:'
											value={ this.state.tbwa_theme_color_white_hint }
											onChange={ value => this.setState({ 'tbwa_theme_color_white_hint':value }, this.saveOption) }
										/><br />
									</FlexItem>
									<FlexItem>
										<TextControl
											label='White Disabled:'
											value={ this.state.tbwa_theme_color_white_disabled }
											onChange={ value => this.setState({ 'tbwa_theme_color_white_disabled':value }, this.saveOption) }
										/><br />
									</FlexItem>
									<FlexItem>
										<TextControl
											label='Black Hint:'
											value={ this.state.tbwa_theme_color_black_hint }
											onChange={ value => this.setState({ 'tbwa_theme_color_black_hint':value }, this.saveOption) }
										/><br />
									</FlexItem>
									<FlexItem>
										<TextControl
											label='Black Disabled:'
											value={ this.state.tbwa_theme_color_black_disabled }
											onChange={ value => this.setState({ 'tbwa_theme_color_black_disabled':value }, this.saveOption) }
										/><br />
									</FlexItem>
								</Flex>							
							</PanelRow  >
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
					</Panel>
				</div>
			</Fragment>
		);
	}
}



wp.domReady(function() {
	const element = document.getElementById('tbwa-theme-color-settings-page');
	if (element) {
		render(
			<Fragment >
				<div className="wrap" >
					<h1>
						TBWA Theme Color Settings
					</h1>
					<p>
						This section is to override default theme color settings.
					</p>
					<p>
						Proceed carefully.
					</p>
				</div>
				<ColorSettings />
			</Fragment>
		, element);
	}
});


