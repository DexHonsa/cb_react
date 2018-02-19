import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";

class AddPortfolioPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      portfolioName: ""
    };
  }

  onSubmit() {
    var data = {
      portfolioName: this.state.portfolioName,
      userId: this.props.auth.user.id
    };
    var that = this;
    axios.post("/api/addPortfolio", data).then(
      res => {
        that.props.hide();
      },
      err => console.log(err)
    );
  }
  onChange(e) {
    this.setState({ portfolioName: e.target.value });
  }
  render() {
    return (
      <div className="overlay animated-fast fadeIn">
        <form onSubmit={this.onSubmit.bind(this)}>
          <div className="upload-popup animated-fast bounceInUp">
            <div className="upload-popup-top">
              Add Portfolio<i
                onClick={this.props.hide}
                className="fa fa-times"
              />
            </div>
            <div className="upload-popup-content">
              <input
                onChange={this.onChange.bind(this)}
                type="text"
                className="project-name-input"
                placeholder="Porfolio Name"
              />
              <button type="submit" className="add-new-project-btn">
                Create Portfolio
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps)(AddPortfolioPopup);
