import React from "react";
import axios from "axios";

class NewProperty extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			portfolioItemId: this.props.match.params.id,
			workbook: {},
			sheets: [],
			isLoaded: false,
			sideTabs: []
		};
	}
	removeDuplicates(arr) {
		let unique_array = [];
		for (let i = 0; i < arr.length; i++) {
			if (unique_array.indexOf(arr[i]) == -1) {
				unique_array.push(arr[i]);
			}
		}
		return unique_array;
	}
	componentDidMount() {
		var data = {
			portfolioItemId: this.state.portfolioItemId
		};
		var that = this;
		axios.post("/api/getNewUpload", data).then(res => {
			console.log(res.data.workbook);
			var sideTabs = [];
			for (
				var i = 0,
					len = Object.keys(res.data.workbook.Sheets["CommonBrain"]).length;
				i < len;
				i++
			) {
				if (
					Object.keys(res.data.workbook.Sheets["CommonBrain"])[i].indexOf("A") >
					-1
				) {
					if (i > 4) {
						var letter = Object.keys(res.data.workbook.Sheets["CommonBrain"])[
							i
						];
						sideTabs.push(res.data.workbook.Sheets["CommonBrain"][letter].v);
					}
					console.log("has a A!!!");
				}
			}
			var newSidetabs = that.removeDuplicates(sideTabs);
			this.setState({
				workbook: res.data.workbook,
				sheets: res.data.workbook.SheetNames,
				sideTabs: newSidetabs,
				isLoaded: true
			});
		});
	}
	render() {
		return (
			<div className="main-stage">
				<div className="container">
					<div className="row">
						<div className="col-sm-3">
							<div className="side-nav">
								<ul>
									{this.state.isLoaded &&
										this.state.sideTabs.map(function(data, i) {
											return <li key={i}>{data}</li>;
										}, this)}
								</ul>
							</div>
						</div>
						<div className="col-sm-9">
							<div className="side-stage">
								<div className="property-top-container">
									<div className="property-img">
										<div className="property-main-title">
											{this.state.isLoaded && this.state.workbook.SheetNames[0]}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default NewProperty;
