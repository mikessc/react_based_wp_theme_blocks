import { __ } from "@wordpress/i18n";
import {
	InspectorControls,
	MediaUploadCheck,
	MediaUpload,
	BlockControls,
	useBlockProps,
} from "@wordpress/block-editor";
import {
	ToolbarDropdownMenu,
	ToolbarButton,
	ToolbarGroup,
	PanelBody,
	PanelRow,
	SelectControl,
} from "@wordpress/components";
import "./editor.scss";
import { color } from "../_common.jsx";

import { ReactComponent as IconMediaSelect } from "./icons/media-select.svg";
import { ReactComponent as IconMediaRemove } from "./icons/media-remove.svg";

export default function Edit({ attributes, setAttributes }) {
	const selectMedia = (media) => {
		//  Large, full, then src
		var u = media.url;

		setAttributes({
			mediaId: media.id,
			mediaAlt: media.alt,
			mediaTitle: media.title,
			mediaUrl: u,
			mediaType: media.type,
			mediaMime: media.mime,
			mediaWidth: media.width,
			mediaHeight: media.height,
		});
	};

	const removeMedia = () => {
		setAttributes({
			mediaId: 0,
			mediaAlt: "",
			mediaTitle: "",
			mediaUrl: "",
			mediaType: "",
			mediaMime: "",
			mediaWidth: 0,
			mediaHeight: 0,
		});
	};

	const displayMedia = () => {
		if (attributes.mediaType == "image") {
			return (
				<img
					src={attributes.mediaUrl}
					alt={attributes.mediaAlt}
					title={attributes.mediaTitle}
					loading="lazy"
					width={attributes.mediaWidth * 0.5}
					height={attributes.mediaHeight * 0.5}
				/>
			);
		}
		return <div className="no-media-selected">No Media Selected</div>;
	};

	const displayClasses = () => {
		return [
			"proportion-" + attributes.proportion,
			"border-" + attributes.border,
			"margin-bottom-" + attributes.marginBottom,
			"media-type-" + attributes.mediaType,
		].join(" ");
	};

	// const proportionCurrentIcon = () => {
	// 	switch (attributes.proportion) {
	// 		case "8-by-4":
	// 			return IconProportion8by4;
	// 			break;
	// 		case "8-by-9":
	// 			return IconProportion8by9;
	// 			break;
	// 		case "16-by-9":
	// 			return IconProportion16by9;
	// 			break;
	// 		case "original":
	// 			return IconProportionOriginal;
	// 			break;
	// 		case "original-size":
	// 			return IconSizeOriginal;
	// 			break;
	// 	}
	// };

	// const makeControl = (icon, name, value, title) => {
	// 	return {
	// 		icon: icon,
	// 		title: title,
	// 		isActive: attributes[name] == value,
	// 		onClick: () => {
	// 			setAttributes({ [name]: value });
	// 		},
	// 	};
	// };

	return (
		<>
			<InspectorControls>
				<PanelBody title="Border" initialOpen={true}>
					<SelectControl
						value={attributes.border}
						options={[
							{ label: "None", value: "none" },
							{ label: "1px White (" + color.white + ")", value: "white" },
							{ label: "1px Black (" + color.black + ")", value: "black" },
							{
								label: "1px Dark Grey (" + color.darkGrey + ")",
								value: "dark-grey",
							},
							{
								label: "1px Light Grey (" + color.lightGrey + ")",
								value: "light-grey",
							},
						]}
						onChange={(value) => setAttributes({ border: value })}
					/>
				</PanelBody>
				<PanelBody title="Bottom Margin" initialOpen={true}>
					<SelectControl
						value={attributes.marginBottom}
						options={[
							{ label: "None", value: "none" },
							{ label: "25px", value: "25" },
							{ label: "50px", value: "50" },
						]}
						onChange={(value) => setAttributes({ marginBottom: value })}
					/>
				</PanelBody>
			</InspectorControls>
			<BlockControls group="block">
				{/* <ToolbarGroup>
					<ToolbarDropdownMenu
						icon={proportionCurrentIcon()}
						label="Proportion"
						controls={[
							makeControl(
								IconProportion16by9,
								"proportion",
								"16-by-9",
								"16:9 Resolution 1920×1080px"
							),
							makeControl(
								IconProportion8by9,
								"proportion",
								"8-by-9",
								"8:9 Resolution 976×1098px"
							),
							makeControl(
								IconProportion8by4,
								"proportion",
								"8-by-4",
								"8:4 Resolution 1280×720px"
							),
							makeControl(
								IconSizeOriginal,
								"proportion",
								"original-size",
								"Original size not fluid"
							),
							makeControl(
								IconProportionOriginal,
								"proportion",
								"original",
								"Fluid image"
							),
						]}
					/>
				</ToolbarGroup> */}
				<ToolbarGroup>
					<MediaUploadCheck>
						<MediaUpload
							value={attributes.mediaId}
							onSelect={selectMedia}
							allowedTypes={["image"]}
							render={({ open }) => (
								<ToolbarButton
									label={"Select Media"}
									icon={IconMediaSelect}
									onClick={open}
								/>
							)}
						/>
						<ToolbarButton
							label={"Remove Media"}
							icon={IconMediaRemove}
							onClick={removeMedia}
						/>
					</MediaUploadCheck>
				</ToolbarGroup>
			</BlockControls>
			<div {...useBlockProps({ className: displayClasses() })}>
				{displayMedia()}
			</div>
		</>
	);
}
