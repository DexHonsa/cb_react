import React, {Component} from 'react';


import validateInput from '../validations/signup_validation';
import TextFieldGroup from './signup_text_field_group';
import {connect} from 'react-redux';
import { userSignup } from '../../actions/auth_actions';


import PropTypes from "prop-types";

class SignUpPopup extends Component {
  static contextTypes = {
    router: PropTypes.object
  }
  constructor(props){
    super(props);
    this.state = {
      popupVisible: false,
      username:'',
      email : '',
			password : '',
			passwordConfirm : '',
			errors : {},
			isLoading : ''
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
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
			this.props.userSignup(this.state).then(
				(res) => this.context.router.history.push('/product/dashboard'),
				(err) => this.setState({errors: err.response.data.errors, isLoading: false})
				);
		}
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
      that.props.hidePopup();
    },500)
    this.handleClick();
  }

  render() {
    const {username,email, password, passwordConfirm, errors} = this.state;
    return (
      <div>
        <div className={this.state.popupVisible ? "overlay animated-fast fadeOut" : "overlay animated-fast fadeIn"}>
          <div className={this.state.popupVisible ? "popup-1 animated-fast bounceOutDown" : "popup-1 animated-fast bounceInUp" } ref={node => { this.node = node; }}>
            <div className="sign-up-popup">
              <div className="popup-inner">
                <div className="popup-top">Sign Up to Commonbrain
                  <i className="fa fa-times" onClick={this.props.hidePopup}/></div>
                <div className="popup-content">

                  <div className="sign-up-input-item2">
                    <div className="sign-up-input-label">Username</div>
                    <TextFieldGroup
		                	field="username"
		                	label="Username"
		                	type="text"
		                	value={username}
		                	error={errors.username}
		                	onChange={this.onChange}
		                />
                  </div>
                  <div className="sign-up-input-item2">
                    <div className="sign-up-input-label">Email</div>
                    <TextFieldGroup
    		                	field="email"
    		                	label="Email"
    		                	type="text"
    		                	value={email}
    		                	error={errors.email}
    		                	onChange={this.onChange}
    		                />
                  </div>
                  <div className="sign-up-input-item2">
                    <div className="sign-up-input-label">Password</div>
                    <TextFieldGroup
    		                	field="password"
    		                	label="Password"
    		                	type="password"
    		                	value={password}
    		                	error={errors.password}
    		                	onChange={this.onChange}
    		                />
                  </div>
                  <div className="sign-up-input-item2">
                    <div className="sign-up-input-label">Re-type Password</div>
                    <TextFieldGroup
    		                	field="passwordConfirm"
    		                	label="Confirm Password"
    		                	type="password"
    		                	value={passwordConfirm}
    		                	error={errors.passwordConfirm}
    		                	onChange={this.onChange}
    		                />
                  </div>
                  {errors.form && <div className=" alert-danger animated fadeIn">{errors.form}</div>}
                  <div className="sign-up-btn" onClick={this.onSubmit.bind(this)}>Sign Up</div>
                  <div className="sign-up-disclaimer">Subject to Terms and Conditions</div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }

}

export default connect((state) => {return {} }, { userSignup })(SignUpPopup);;
