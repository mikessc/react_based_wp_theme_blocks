import { __ } from "@wordpress/i18n";
import {
	InspectorControls,
	MediaUploadCheck,
	MediaUpload,
	InnerBlocks,
	useBlockProps,
} from "@wordpress/block-editor";
import {
	PanelBody,
	PanelRow,
	SelectControl,
	Button,
} from "@wordpress/components";

import "./editor.scss";

//  Display a media item - image / video / none
const DisplayMedia = ({ media, className }) => {
	if (media) {
		if (media.type == "image") {
			return (
				<img
					className={className}
					src={media.url}
					alt={media.alt}
					loading="lazy"
					width="400"
					height="300"
				/>
			);
		}
		// if (media.type == "video") {
		// 	return (
		// 		<video
		// 			className={className}
		// 			width="400"
		// 			height="300"
		// 			autoPlay
		// 			loop
		// 			muted
		// 		>
		// 			<source src={media.url} type={media.mime} />
		// 		</video>
		// 	);
		// }
	}
	return "";
};

//  Select and display selected media
const MediaControl = ({ name, allowedTypes, attributes, setAttributes }) => {
	const select = (media) => {
		var u = media.url;
		// if (media.sizes) {
		// 	if (media.sizes.large) {
		// 		u = media.sizes.large.url;
		// 	} else if (media.sizes.full) {
		// 		u = media.sizes.full.url;
		// 	}
		// }
		setAttributes({
			id: media.id,
			alt: media.alt,
			title: media.title,
			url: u,
			type: media.type,
			mime: media.mime,
		});
	};

	const remove = (bkgFore) => {
		setAttributes({
			id: 0,
			alt: "",
			title: "",
			url: "",
			type: "",
			mime: "",
		});
	};

	return (
		<MediaUploadCheck>
			<MediaUpload
				value={attributes.id}
				onSelect={select}
				allowedTypes={allowedTypes}
				render={({ open }) => {
					return (
						<div className="wp-block-tbwa-blocks-section-with-spritesheet-media-media-select">
							<div onClick={open}>
								{attributes.url == "" ? (
									<button>{name}</button>
								) : (
									<DisplayMedia media={attributes} />
								)}
							</div>
							{attributes.url != "" && (
								<Button variant="link" onClick={remove}>
									Remove
								</Button>
							)}
						</div>
					);
				}}
			/>
		</MediaUploadCheck>
	);
};

export default function Edit({ attributes, setAttributes }) {
	const classes = {
		className: [
			"media-position-" + attributes.mediaPosition,
			"media-type-" + attributes.mediaType,
			"background-" + attributes.background,
		].join(" "),
	};

	return (
		<>
			<InspectorControls>
				<PanelBody
					title="Background Color"
					initialOpen={false}
					className="wp-block-tbwa-blocks-section-with-spritesheet-media-inspector"
				>
					<SelectControl
						value={attributes.background}
						options={[
							{ label: "Black background", value: "black" },
							{ label: "White background", value: "white" },
						]}
						onChange={(value) => setAttributes({ background: value })}
					/>
				</PanelBody>
				<PanelBody
					title="Desktop Media"
					initialOpen={true}
					className="wp-block-tbwa-blocks-section-with-spritesheet-media-inspector"
				>
					<SelectControl
						label="Layout Position"
						value={attributes.mediaPosition}
						options={[
							{ label: "Right Aligned", value: "square-right" },
							{ label: "Fit to column", value: "cover-column" },
							{ label: "Fit to window", value: "cover-page" },
						]}
						onChange={(value) => setAttributes({ mediaPosition: value })}
					/>
					<MediaControl
						name="Select Desktop Media"
						allowedTypes={["image"]}
						attributes={attributes.mediaDesktop}
						setAttributes={(mediaAttributes) => {
							setAttributes({ mediaDesktop: mediaAttributes });
						}}
					/>
				</PanelBody>
				{/* <PanelBody
					title="Mobile Media"
					initialOpen={true}
					className="wp-block-tbwa-blocks-section-with-spritesheet-media-inspector"
				>
					<MediaControl
						name="Select Mobile Media (8:9)"
						allowedTypes={["image", "video"]}
						attributes={attributes.mediaMobile}
						setAttributes={(mediaAttributes) => {
							setAttributes({ mediaMobile: mediaAttributes });
						}}
					/>
				</PanelBody> */}
			</InspectorControls>
			<div {...useBlockProps(classes)}>
				<div className="column-outer">
					<div className="media">
						<DisplayMedia media={attributes.mediaDesktop} className="desktop" />
					</div>
					<div className="column-inner">
						<div className="column-inner-inner">
							<InnerBlocks template={[]} />
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
