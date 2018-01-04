import React from 'react';
import {NavLink, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import { logout } from './actions/auth_actions';
import logo_color from './img/logo_color_with_line.png';
import ntt_logo from './img/ntt.png';
import PropTypes from "prop-types";

class Header extends React.Component {
  static contextTypes = {
    router: PropTypes.object
  }
  constructor(props){
    super(props);
    this.state = {
      userDropdown: false,
      alertsDropdown:false,
      ntt:false
    }
  }
  componentDidMount(){
    if(this.props.auth.user.id == '5a3adb9cc786f041d850f823'){
      this.setState({ntt:true})
    }
  }
  showUserDropdown(){
    console.log(this.state.userDropdown);
    var that = this;
    if(this.state.userDropdown == false){
      this.setState({userDropdown: true});
    }else{
      this.setState({userDropdown: false});
    }
  }
  showAlertsDropdown(){
    var that = this;
    if(this.state.alertsDropdown == false){
      this.setState({alertsDropdown: true});
    }else{
      this.setState({alertsDropdown: false});
    }
  }
  logout(e){
		e.preventDefault();
		this.props.logout();
	}
  jsUcfirst(string)
  {
    if(string !== undefined){
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  }
  render(){
    var userDropdown;
    var username = this.jsUcfirst(this.props.auth.user.username);
    if(this.state.userDropdown == true){

      userDropdown = <div className="notifications-dropdown animated-fast fadeInUp">
        <div className="caret" />
        <a onClick={this.logout.bind(this)} >Logout</a><br />
        <a href="settings.html">Settings</a>
      </div>;
    }else{
      userDropdown = '';
    }
    var alertsDropdown;
    if(this.state.alertsDropdown == true){
      alertsDropdown = <div className="notifications-dropdown animated-fast fadeInUp">
        <div className="caret" />
        No New Notifications</div>;
    }else{
      alertsDropdown = '';
    }

    return(
      <div>
      <div className="main-nav">
        <div className="container nav-container">
          <div className="logo"><img src={this.state.ntt ? ntt_logo : logo_color} alt /></div>
          <div className="nav-list">
            <ul>
              <NavLink to="/product/dashboard" activeClassName="active"><li>Getting Started</li></NavLink>
              <NavLink to="/product/my-portfolios" activeClassName="active"><li>My Portfolios</li></NavLink>
              <NavLink to="/product/my-templates" activeClassName="active"><li>My Templates</li></NavLink>
            </ul>
            <ul className="login-list">
              <li>Welcome {username}</li>
              <li id="logout" onClick={this.showUserDropdown.bind(this)}><i className="fa fa-user-circle-o" />
                {userDropdown}
              </li>
              <li id="alerts" onClick={this.showAlertsDropdown.bind(this)}><i className="fa fa-bell" />
                {alertsDropdown}
              </li>
            </ul>
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
export default withRouter(connect(mapStateToProps, { logout })(Header));
