import React, { Component } from "react";
import axios from "axios";
import { Bar, Scatter, Pie } from "react-chartjs-2";
import ReactTooltip from "react-tooltip";
import CBrainBarChart from "./bar_chart";
import ImagePopup from "./image_popup";
class DetailBlock extends Component {
	constructor(props) {
		super(props);
		this.state = {
			blockDetails: [],
			isLoading: true,
			tabName: "",
			portfolioItemId: this.props.portfolioItemId,
			ReactTooltip: false,
			isVisible: false,
			popupVisible: false,
			imageLink: ""
		};
	}
	componentDidMount() {
		var that = this;
		var data = {
			activeSideTabName: this.props.activeSideTabName,
			majorCategory: this.props.mainCategory,
			portfolioItemId: this.state.portfolioItemId
		};
		axios.post("/api/getBlock", data).then(res => {
			if (res.data[0] !== undefined) {
				that.setState({
					tabName: res.data[0]["Tab Name"],
					blockDetails: res.data,
					isLoading: false
				});
			}

			if (that.props.tabName === that.state.tabName) {
				that.setState({ isVisible: true });
			}
		});
	}
	componentWillReceiveProps(nextProps) {
		this.setState({ isVisible: false });
		if (nextProps.tabName === this.state.tabName) {
			this.setState({ isVisible: true });
		}
	}

	truncate(string) {
		if (string.length > 25) return string.substring(0, 25) + "...";
		else return string;
	}
	activateTooltip() {
		if (this.state.ReactTooltip === false) {
			this.setState({ ReactTooltip: true });
		} else {
		}
	}
	showImagePopup(imageLink) {
		this.setState({ imageLink: imageLink, popupVisible: true });
	}
	hidePopup() {
		this.setState({ popupVisible: false });
	}
	render() {
		return (
			<div>
				{this.state.popupVisible && (
					<ImagePopup
						hide={this.hidePopup.bind(this)}
						img={this.state.imageLink}
					/>
				)}
				<div
					style={
						this.state.isVisible ? { display: "block" } : { display: "none" }
					}>
					{this.state.ReactTooltip ? <ReactTooltip effect="solid" /> : null}
					{this.state.hasChart && <CBrainBarChart />}
					<div
						style={
							!this.state.hasChart ? { display: "block" } : { display: "none" }
						}
						className="basic-detail-block">
						<div className="basic-detail-main-title">
							{this.props.mainCategory}
						</div>

						<div className="basic-detail-block-detail-container">
							{this.state.blockDetails.map(function(data, i, array) {
								if (data["Tab Name"] === this.props.tabName) {
									var hasSource = false;
									var truncated = false;
									var isEmail = false;
									var isValue = true;
									var titleTruncated = false;
									var hasImage = false;
									if (
										data["Source File"] !== "--" &&
										data["Source File"] !== undefined
									) {
										hasSource = true;
										isValue = false;
										var dataLink;
										dataLink = "http://" + data["Source File"];
										if (
											dataLink.indexOf(".jpg") > -1 ||
											dataLink.indexOf(".png") > -1
										) {
											hasImage = true;
											hasSource = false;
											isValue = false;
										}
									}
									var newDataValue = [];
									var value = data["Value"];
									var hoverMessage = data["Hover Message"];
									var dataTitle = data["Specific Category"];
									if (typeof value === "string") {
										if (value.indexOf(".com") > -1 && value.indexOf("@") > -1) {
											isEmail = true;
											isValue = false;
										}
										value = this.truncate(value);
										if (value.length > 25) {
											truncated = true;
										}
									}

									if (dataTitle.length > 25) {
										titleTruncated = true;
									}
									if (typeof data["Specific Category"] === "string") {
										dataTitle = this.truncate(dataTitle);
									}
									if (
										value !== undefined &&
										value.toString().indexOf("T") > -1
									) {
										newDataValue = value.split("T00");
									} else {
										newDataValue[0] = value;
									}
									if (data["Hover Message"] != null) {
									} else {
										hoverMessage = "";
									}
									if (newDataValue[0] === undefined) {
										newDataValue[0] = "--";
									}
									if (i + 1 >= array.length) {
										this.activateTooltip();
									}
									return (
										<div
											key={i}
											className="basic-detail-block-detail-item animated-fast fadeIn">
											<div
												className="basic-detail-block-title"
												data-tip={
													titleTruncated ? data["Specific Category"] : null
												}>
												{dataTitle}
											</div>

											<div
												className="basic-detail-block-value"
												data-tip={
													truncated
														? data["Value"] + "  " + hoverMessage
														: hoverMessage
												}>
												{hasSource && (
													<a target="_blank" href={dataLink}>
														{" "}
														{newDataValue[0]}{" "}
													</a>
												)}
												{isEmail && (
													<a href={"mailto:" + newDataValue[0]}>
														{" "}
														{newDataValue[0]}{" "}
													</a>
												)}
												{isValue && newDataValue[0]}
												{hasImage && (
													<div
														className="has-image"
														onClick={() => this.showImagePopup(dataLink)}>
														{newDataValue[0]}
													</div>
												)}
											</div>
										</div>
									);
								}

								return "";
							}, this)}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default DetailBlock;
