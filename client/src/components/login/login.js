import React from 'react';
import TextFieldGroup from './text_field_group';
import validateInput from '../validations/signin_validation';

import PropTypes from "prop-types";
import {connect} from 'react-redux';
import { userLogin } from '../../actions/auth_actions';
import SignUpPopup from './sign_up_popup.js';
import logo_color from '../../img/logo_color_with_line.png';
import logo_white from '../../img/logo_white.png';



class Login extends React.Component {
  static contextTypes = {
    router: PropTypes.object
  }
  constructor(props) {
  		super(props);
  		this.state = {
  			username : '',
  			password : '',
  			errors : {},
  			isLoading : '',
        signupPopup:false
  		}

  		this.onSubmit = this.onSubmit.bind(this);
  		this.onChange = this.onChange.bind(this);
  	}
  isValid(){
		const { errors, isValid } = validateInput(this.state);
		if(!isValid){
			this.setState({
				errors : errors
			})
		}
		return isValid;
	}
	onChange(e){
		this.setState({
			[e.target.name] : e.target.value
		})
	}
	onSubmit(e){
		if(this.isValid()){
			e.preventDefault();
			 this.setState({errors: {}, isLoading: true});
			this.props.userLogin(this.state).then(
				(res) => this.context.router.history.push('/product/dashboard'),
				(err) => {
            console.log('an error has occured');
          if(err.data === undefined){

            return this.setState({errors: err.response.data.errors, isLoading: false});
          }else{

            return this.setState({errors: err.data.errors, isLoading: false});
          }

        }
				);
		}
	}
  showSignupPopup(){
    this.setState({
      signupPopup: !this.state.signupPopup
    })
  }
  render() {
    const {username, password, errors} = this.state;
    var signupPopup;
    if(this.state.signupPopup){
      signupPopup = <SignUpPopup hidePopup={this.showSignupPopup.bind(this)}/>
    }else{
      signupPopup = null;
    }

    return (
      <div>
        <div>
        {signupPopup}
          <div className="css-main-nav">
            <div className="container">
              <div className="css-logo">
                <img src={logo_white} alt=""/>
              </div>

              <ul className="css-login-list">

                  <li>Login</li>

                <li>
                  <div className="css-signup-btn" onClick={this.showSignupPopup.bind(this)}>Sign Up</div>
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
          <div className="css-login-section">
            <div className="container">
              <div className="row">
                <div className="col-sm-6">
                  <div className="css-login-title">Login To CommonBrain</div>
                  <form onSubmit={this.onSubmit.bind(this)}>
                  <div className="css-login-inputs">
                    <div className="css-login-input-item">
                    <TextFieldGroup
		                	field="username"
		                	label="username"
		                	type="text"
		                	value={username}
		                	error={errors.username}
		                	onChange={this.onChange}
		                />


                    </div>
                    <div className="css-login-input-item">
                        <TextFieldGroup
                        field="password"
                        label="password"
                        type="password"
                        value={password}
                        error={errors.password}
                        onChange={this.onChange}
                      />
                    </div>
                    <div className="css-error-msg">Your Informarion Is Incorrect</div>
                    {errors.form && <div className=" alert-danger animated fadeIn">{errors.form}</div>}
                    <button type="submit" className="css-login-btn">Login</button>
                  </div>
                  </form>
                </div>
                <div className="col-sm-6" style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <div className="css-main-logo-container wow animated fadeInUp"><img src={logo_color} alt=""/></div>
                </div>
              </div>
            </div>
          </div>
          <div className="css-footer">
            Copyright 2017 CommonBrain
          </div>
        </div>

      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps, {userLogin})(Login);
