import { __ } from "@wordpress/i18n";
import { useBlockProps } from "@wordpress/block-editor";

export default function save({ attributes }) {
	const displayMedia = () => {
		if (attributes.mediaType == "image") {
			return (
				<div
					className="sprite"
					// style={`background-image:url(${attributes.mediaUrl})`}
				/>
			);
		}
		return "";
	};

	const displayClasses = () => {
		var a = [];
		a.push("proportion-" + attributes.proportion);
		if (attributes.border != "none") {
			a.push("border-" + attributes.border);
		}
		if (attributes.marginBottom != "none") {
			a.push("margin-bottom-" + attributes.marginBottom);
		}
		a.push("media-type-" + attributes.mediaType);
		return a.join(" ");
	};

	if (attributes.mediaType == "") {
		return "";
	}

	return (
		<div
			{...useBlockProps.save({ className: displayClasses() })}
			data-sprite-url={attributes.mediaUrl}
		>
			{displayMedia()}
		</div>
	);
}
