import React from 'react';
import {NavLink} from 'react-router-dom';
import logo_grey from '../img/logo_grey.png';
import logo_color from '../img/logo_color_with_line.png';
import computer from '../img/computer.png';
import logo_white from '../img/logo_white.png';
import SignUpPopup from './login/sign_up_popup';

class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      signupPopup:false
    }
  }
  showSignupPopup(){
    this.setState({
      signupPopup: !this.state.signupPopup
    })
  }
  render() {
    return (
      <div>
        {this.state.signupPopup && <SignUpPopup hidePopup={this.showSignupPopup.bind(this)} />}
        <div>
          <div className="css-main-nav">
            <div className="container">
              <div className="css-logo">
                <img alt="" src={logo_white}/>
              </div>
              {/*<ul className="css-nav-list">
                <li className="css-services-btn">Services</li>
                <li className="css-aboutus-btn">About Us</li>
              </ul>*/}
              <ul className="css-login-list">

                  <NavLink to="login"><li>Login</li></NavLink>

                <li>
                  <div onClick={this.showSignupPopup.bind(this)} className="css-signup-btn">Sign Up</div>
                </li>
              </ul>
            </div>
          </div>
          <div className="css-mobile-nav">
            <div className="css-mobile-nav-toggle"><i className="fa fa-bars"/></div>
            <div className="css-mobile-nav-list">
              <ul>
                <li className="css-services-btn">Services</li>
                <li className="css-aboutus-btn">About Us</li>
              </ul>
            </div>
          </div>
          <div className="css-section-a1">
            <div className="css-main-logo-container wow animated fadeInUp"><img alt="" src={logo_color}/></div>
          </div>
          <div className="css-section-a" id="services">
            <div className="container">
              <div className="row">
                <div className="css-section-header col-sm-5 wow animated fadeInLeft" style={{
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <div>
                    <h1>Let us help you find common ground with your data.</h1>
                    <p>CommonBrain is a business intelligence tool that publishes results to the web.  The software is nimble, fast and powerful to use.  CommonBrain has multiple applications and has been deployed by cryptocurrency startups to Fortune 500 companies.  </p>
                  </div>
                </div>
                <div className="css-computer-container col-sm-7 wow animated fadeInRight">
                  <img alt="" src={computer}/>
                </div>
              </div>
            </div>
          </div>
          {/*<div className="css-section-b" id="aboutus">
            <div className="container">
              <div className="row">
                <div className="col-sm-6 wow animated fadeInLeft">
                  <img alt="" style={{
                    width: '100%',
                    padding: 25
                  }} src={logo_grey}/>
                </div>
                <div className="css-paragraphs col-sm-6 wow animated fadeInRight" style={{
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <div>
                    CommonBrain partners with leading companies in the financial services, financial technology, legal technology, governance, risk &amp; compliance and spaces. CommonBrain offers a common-sense approach taking advantage of publicly available information from key data partners, and our own proprietary databases. CommonBrain offers consultative solutions as opposed to just dumping off data sets that may or may not be relevant to your business.</div>
                </div>
              </div>
            </div>
          </div>*/}
          <div className="css-section-c">
            <div className="container">
              <div className="row" style={{
                display: 'flex',
                justifyContent: 'center'
              }}>
                <div className="col-sm-6 message-box wow animated fadeInUp">
                  <h1>Want More Information?</h1>
                  <p>We will send you an email with more detailed information regarding CommonBrain!</p>
                  <div className="css-login-input">
                    <input id="email" type="text" placeholder="Email"/>
                  </div>
                  <div className="css-login-input">
                    <input id="name" type="text" placeholder="Name"/>
                  </div>
                  <div className="css-login-input">
                    <input id="company" type="text" placeholder="Company"/>
                  </div>
                  <div className="css-login-input">
                    <div className="css-submit-btn">Submit</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="css-footer">
            Copyright 2017 CommonBrain
          </div>
        </div>

      </div>
    );
  }
}

export default Home;
