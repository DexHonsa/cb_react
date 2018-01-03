import React, { Component } from 'react';
import axios, { post } from 'axios';
import {connect} from 'react-redux';

class AddPortfolioPopup extends Component {

  constructor(props){
    super(props);
    this.state = {
      portfolioName:''
    }
  }

onSubmit(){
  var data = {
    portfolioName:this.state.portfolioName,
    userId:this.props.auth.user.id
  };
  var that = this;
  axios.post('/api/addPortfolio', data).then(function(res){
  //  that.props.hide();
  });
  this.props.hide();
}
onChange(e){
  this.setState({portfolioName:e.target.value})
}
  render() {
    return (
      <div className="overlay animated fadeIn">
        <div className="upload-popup animated fadeInUp">
          <div className="upload-popup-top">Add Portfolio<i onClick={this.props.hide} className="fa fa-times"></i></div>
          <div className="upload-popup-content">

            <input onChange={this.onChange.bind(this)} type="text" className="project-name-input" placeholder="Porfolio Name"/>
            <button onClick={this.onSubmit.bind(this)} type="submit" className="add-new-project-btn">Create Portfolio</button>

          </div>


        </div>
      </div>
    );
  }

}

function mapStateToProps(state){
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps)(AddPortfolioPopup);
