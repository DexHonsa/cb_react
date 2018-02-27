import React from "react";

class ImagePopup extends React.Component {
	render() {
		return (
			<div
				onClick={this.props.hide}
				className="image-popup-container animated fadeIn">
				<img style={{ maxWidth: "70%" }} src={this.props.img} />
			</div>
		);
	}
}
export default ImagePopup;
