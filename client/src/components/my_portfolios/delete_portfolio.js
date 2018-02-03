import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import PropTypes from "prop-types";


class DeletePortfolio extends Component {
  static contextTypes = {
    router: PropTypes.object
  }
  constructor(props) {
    super(props);
    this.state = {
      popupVisible:false
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }
onSubmit(){
  axios.post('/api/deletePortfolio',{portfolioId:this.props.portfolioId}).then(
    (res) => this.context.router.history.push('/product/my-portfolios')
  )
}
componentDidMount(){
  document.addEventListener('click', this.handleOutsideClick, false);
}
handleClick() {
  document.addEventListener('click', this.handleOutsideClick, false);
  this.setState(prevState => ({
     popupVisible: !prevState.popupVisible,
  }));
}


handleOutsideClick(e) {
  var that = this;
  if (this.node.contains(e.target)) {
    return;
  }
  setTimeout(function(){
    that.props.hide();
  },500)
  this.handleClick();
}
unmount(){
  setTimeout(function(){
    this.props.hide();
  },300)
}


  render() {
    if(!this.state.popupVisible){
      this.unmount.bind(this)
    }
    return (
      <div className={this.state.popupVisible ? "overlay animated-fast fadeOut" : "overlay animated-fast fadeIn"}>
        <div className={this.state.popupVisible ? "upload-popup animated-fast bounceOutDown" : "upload-popup animated-fast bounceInUp" } ref={node => { this.node = node; }}>
          <div className="upload-popup-top">Confirm Delete <i onClick={this.props.hide} className="fa fa-times"></i></div>
          <div className="upload-popup-content">
          <form onSubmit={this.onFormSubmit}>
            <div style={{textAlign:'center',padding: '15px 0px',fontSize: '12pt', fontWeight: 500}}>Are you sure you want to delete this portfolio?<br /> (Cannot be undone)</div>
            <div onClick={this.onSubmit.bind(this)} className="add-new-project-btn delete-portfolio-btn">Delete Portfolio</div>
            </form>
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

export default connect(mapStateToProps)(DeletePortfolio);
