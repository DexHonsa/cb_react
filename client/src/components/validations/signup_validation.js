import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput(data){
	var errors = {};

	if(Validator.isEmpty(data.username)){
		errors.username = "This field is required";
	}
	if(Validator.isEmpty(data.email)){
		errors.email = "This field is required";
	}
	if(!Validator.isEmail(data.email)){
		errors.email = "Not a valid email";
	}
	if(Validator.isEmpty(data.password)){
		errors.password = "This field is required";
	}
	if(Validator.isEmpty(data.passwordConfirm)){
		errors.passwordConfirm = "This field is required";
	}
	if(!Validator.equals(data.password, data.passwordConfirm)){
		errors.passwordConfirm = "Passwords don't match";
	}




	return {
		errors,
		isValid: isEmpty(errors)
	};
}
