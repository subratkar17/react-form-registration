import React, { Component } from "react";
import {ErrorFile} from "./ErrorFile"
const divStyle = {
  border: '1 px solid red'
};
class RegisterForm extends Component {
    constructor () {
        super();
        this.state = {
          firstName:'',
          lastName:'',
          zipCode:'',
          email: '',
          userName:'',
          password: '',
          confirmPassword:'',
          formErrors: {email:'', userName: '', password: '', confirmPassword:''},
          emailValid: false,
          userNameValid:false,
          passwordValid: false,
          cnfpwdValid:false,
          valid: false
        }
      }
    
     

      handleUserInput = (event) =>{
          var name = event.target.name;
          var value = event.target.value;
          console.log(event)
          this.setState({[name]:value},
            () => {this.validateField(name, value)})
        
      }
      
     

      validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let formErrorsCss=this.state.formErrorsCss;
        let emailValid = this.state.emailValid;
        let userNameValid = this.state.userNameValid;
        let passwordValid = this.state.passwordValid;
        let cnfpwdValid = this.state.cnfpwdValid;
        let firstnameValid = this.state.firstName;
        let lastnameValid = this.state.lastname;

        let cp;

        switch(fieldName) {
          
          case 'lastName':
          lastnameValid = this.state.lastName.length>3
          fieldValidationErrors.lastname =  lastnameValid? '' : ' is too short';
          if(!lastnameValid)
            {
              document.getElementById('lastName').style.borderColor = "red";
            }

            else{
              document.getElementById('lastName').style.borderColor = "blue";
              lastnameValid=true;
            }

            break;

          case 'firstName':
          firstnameValid = this.state.firstName.length>3
          fieldValidationErrors.firstName =  firstnameValid? '' : ' is too short';
          if(!firstnameValid)
            {
              document.getElementById('name').style.borderColor = "red";

            }
            else{
              document.getElementById('name').style.borderColor = "blue";
              firstnameValid=true;
            }

            break;
            
            case 'email':
            emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
            
            //fieldValidationErrors.email = emailValid ? '' : ' is invalid';
            if(!emailValid)
            {
              document.getElementById('email').style.borderColor = "red";

            }
            else{
              document.getElementById('email').style.borderColor = "blue";
              emailValid=true;
            }

            break;

            case 'userName':
            userNameValid= value.match(/^([a-z][A-Z]+)$/i) && this.state.userName.length>2;
            fieldValidationErrors.userName = userNameValid ? '' : ' is invalid';
            fieldValidationErrors.userName = userNameValid ? '' : ' is too Short';
            if(!userNameValid)
            {
              document.getElementById('userName').style.borderColor = "red";

            }
            else{
              document.getElementById('userName').style.borderColor = "blue";
              userNameValid=true;

            }
            break;
          case 'password':
            passwordValid = value.length >= 6;
            
            fieldValidationErrors.password = passwordValid ? '': ' is too short';
            if( value===null || value =='' || !passwordValid)
            {
              document.getElementById('password').style.borderColor = "red";

            }
            else{
              cp=value;
              document.getElementById('password').style.borderColor = "blue";

            }
            break;
          case 'confirmPassword':
          if(this.state.confirmPassword ===  this.state.password)
          {
          //  cnfpwdValid=true;
            document.getElementById('confirmPassword').style.borderColor = "blue";
            fieldValidationErrors.confirmPassword =  '';


          }
          else{
            document.getElementById('confirmPassword').style.borderColor = "red";
            fieldValidationErrors.confirmPassword =  ' is not match';

          }
          
            break;
          default:
            break;
        }
        this.setState({formErrors: fieldValidationErrors,
                        emailValid: this.state.emailValid,
                        userNameValid: this.state.userNameValid,
                        passwordValid: passwordValid,
                        cnfpwdValid: cnfpwdValid

                      }, this.validateForm);

                      
      }
      validateForm() {
        var x=this.state.emailValid || this.state.userNameValid ||  this.state.passwordValid || this.state.cnfpwdValid
        this.setState({ valid : x });
      }
    
      errorClass(error) {
        return(error.length === 0 ? '' : 'has-error');
      }
      handleSubmit= ()=>{
        alert('Sucessfully registered')

      }
  render() {
    return (
      <div>
        <form name="registerForm" onSubmit={this.handleSubmit}>
          <h1>Register</h1>
          <p>Join the community and improve your game with <b> ANGULAR </b></p>

          <fieldset>
          <div className="input-container">
		    	<i className="fa fa-user iconPos"></i>
            <input type="text" 
            placeholder="First Name"
            id="name" name="firstName"
             ref="firstName"
             value={this.state.firstName}
             onChange={this.handleUserInput}
             />
            </div>

            <div className="input-container">
			       <i className="fa fa-user iconPos"></i>
            <input type="text" id="lastName" 
            name="lastName" 
            placeholder="Last Name"
            ref="lastName"
            value={this.state.lastName}
            onChange={this.handleUserInput}
            
            />
            </div>
            <div className="input-container">
			      <i className="fa fa-map-marker iconPos"></i>
            <input type="password"
             id="zipCode"
            name="zipCode"
            placeholder="Zip Code"
            ref="zipCode"
            value={this.state.zipCode}  
            onChange={this.handleUserInput}
               />
            </div>
            <div className="input-container">
			<i className="fa fa-envelope iconPos"></i>
            <input type="email" id="email"
             name="email" placeholder="Email"
             ref="email" value={this.state.email}
             onChange={this.handleUserInput} required
             />
            </div>
            <div className="input-container">
			<i className="fa fa-user iconPos"></i>
            <input type="text" id="userName"
             name="userName" placeholder="UserName"
             ref="userName" value={this.state.userName} 
             onChange={this.handleUserInput} required
                          />
            </div>
            <div className="input-container">
			<i className="fa fa-unlock iconPos"></i>
            <input type="password" id="password" 
            name="password" placeholder="Password"
            ref="password" value={this.state.password}
            onChange={this.handleUserInput} required
            />
            </div>
            <div className="input-container">
			<i className="fa fa-lock iconPos"></i>
            <input type="password" id="confirmPassword"
             name="confirmPassword" placeholder="Confirm Password"
             ref="confirmPassword" value={this.state.confirmPassword}
             onChange={this.handleUserInput} required
             />
            </div>
          </fieldset>
          <p>By registering you agree to our terms and privacy policy</p>
          <div className="error">
          <ErrorFile formErrors={this.state.formErrors}  />
          </div>
          <button type="submit" disabled={!this.state.valid}>Sign Up</button>
        </form>
      </div>
    );
  }
}
export default RegisterForm;
