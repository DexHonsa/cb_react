import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';


import excel from '../../img/Excel-Logo-Home-Page.png';
import logo_color from '../../img/logo_1.png';

import PortfolioItem from './portfolio_item';

class MyPortfolios extends React.Component {
constructor(props){
  super(props);
  this.state = {
    portfolios:['']
  }
}

componentDidMount(){
  console.log('mounted');
  console.log(this.props.auth.user.id);
  var that = this;
  axios.get('/api/user_portfolios/' + this.props.auth.user.id).then(function(res){
    console.log(res.data);
    that.setState({portfolios:res.data});
  })
}


  render() {
    var portfolioLink;
    if (this.props.auth.user.username == 'ntt'){
      portfolioLink = '/product/my-portfolios/applications';
    }else{
      portfolioLink = '/product/my-portfolios/portfolio';
    }
    return (
      <div>
        <div className="main-stage">

          <div className="container">
            <div className="overlay" style={{
              display: 'none'
            }}>
              <div className="add-project-popup animated fadeInUp">
                <div className="add-project-title">Add Portfolio
                  <i id="close-add-project" className="fa fa-close"/></div>
                <div className="add-project-content">
                  <div className="add-project-name-input">
                    <input type="text" placeholder="Portfolio Name"/>
                  </div>
                  <div className="drag-and-drop" style={{
                    height: 160
                  }}>
                    <div className="drag-and-drop-img">Drag and Drop Excel Files<br/>
                      <img style={{
                        width: 50
                      }} src={excel} alt/></div>
                  </div>
                  <div className="download-template-btn">Download Template &nbsp;<i className="fa fa-download"/></div>
                  <div className="done-btn">Create Portfolio</div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-4">
                <div className="side-nav">
                  <ul>
                    <li className="active">My Portfolios</li>
                  </ul>
                </div>
              </div>
              <div className="col-sm-8">
                <div className="side-stage">
                  <div className="side-stage-title">My Portfolios</div>
                  <div className="add-new-project-btn">+ Add New Portfolio</div>
                  <div className="my-projects-tabs">
                    <div className="my-projects-tab active">Recent Portfolios</div>
                    <div className="my-projects-tab">All Portfolios</div>
                  </div>
                  <div className="my-projects-container">
                  {this.state.portfolios.map(function(data, i){
                    return <PortfolioItem key={i} portfolioLink={portfolioLink} username={this.props.auth.user.username}  portfolioName={data.portfolioName}  />
                  },this)}






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
function mapStateToProps(state){
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps)(MyPortfolios);
