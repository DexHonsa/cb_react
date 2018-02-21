import React from "react";

class AccordionItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<div>
				<div>{this.props.title}</div>
				<div>{this.props.value}</div>
			</div>
		);
	}
}
export default AccordionItem;
