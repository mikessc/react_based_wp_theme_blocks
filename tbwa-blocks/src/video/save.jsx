import { __ } from "@wordpress/i18n";
import { useBlockProps } from "@wordpress/block-editor";

import { ReactComponent as FullScreenMax } from "./images/full-screen.svg";
import { ReactComponent as Volume0 } from "./images/volume-0.svg";
import { ReactComponent as Volume33 } from "./images/volume-33.svg";
import { ReactComponent as Volume66 } from "./images/volume-66.svg";
import { ReactComponent as Volume100 } from "./images/volume-100.svg";
import { ReactComponent as TouchscreenPlay } from "./images/play.svg";

//  Save
export default function save({ attributes }) {
	const DisplayPreview = () => {
		const media = attributes.preview;
		if (media.type == "image") {
			return (
				<img
					src={media.url}
					alt={media.alt}
					loading="lazy"
					width="400"
					height="300"
				/>
			);
		}
		if (media.type == "video") {
			return (
				<video
					width="1920"
					height="1080"
					autoPlay
					loop
					muted
					webkit-playsInline
					playsInline
				>
					<source src={media.url} type={media.mime} />
				</video>
			);
		}
	};

	const DisplayMain = () => {
		const media = attributes.principal;
		if (media.type == "video") {
			return (
				<video width="1920" height="1080" paused playsinline>
					<source src={media.url} type={media.mime} />
				</video>
			);
		}
	};

	return (
		<div {...useBlockProps.save()}>
			<div className="media">
				<div className="preview">
					<DisplayPreview />
				</div>
				<div className="principal">
					<DisplayMain />
				</div>
				<div className="overlay"></div>
				<TouchscreenPlay className="touchscreen-play" />
			</div>
			<div className="controls">
				<div className="volume">
					<Volume0 className="volume-0" />
					<Volume33 className="volume-33" />
					<Volume66 className="volume-66" />
					<Volume100 className="volume-100" />
				</div>
				<div className="duration">
					<span></span>
				</div>
				<div className="bar">
					<div className="base"></div>
					<div className="progress"></div>
					<div className="knob"></div>
				</div>
				<div className="fullscreen">
					<FullScreenMax className="fullscreen-max" />
				</div>
			</div>
		</div>
	);
}
