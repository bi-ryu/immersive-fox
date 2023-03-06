import * as React from 'react';
import RegistrationParent from "../RegistrationParent";
import {useCustomForm} from "../../Controls/CustomForm";
import {userLogin} from "../../apis";
import {useHistory} from "react-router-dom";
import EmailVerificationDialog from "../common/EmailVerificationDialog";
import {useContext, useState} from "react";
import AppContext from "../../../AppContext";
import {GenericForm} from "../common/GenericForm";
import {Box} from "@mui/material";
import {mainBox} from "./styled";
import {isRequired} from "../../../utils/validation/formValidations";
import {isUserLoggedIn} from "../../../utils";

const initialFormValues = {
  email: '',
  password: '',
}

const LoginForm = ({setLoginError}) => {
  if (isUserLoggedIn()) {
    window.location.replace('/avatar')
  }

  const history = useHistory();
  const {values, errors, setErrors, handleInputChange} = useCustomForm(initialFormValues);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const {setIsLoading, alertState, setAlertState} = useContext(AppContext);

  const validate = (fieldValues, errors) => {
    const new_errors = { ...errors }
    new_errors.email = isRequired(fieldValues.email)
    new_errors.password = isRequired(fieldValues.password)

    if (fieldValues.email !== initialFormValues.email)
      localStorage.removeItem('profileEmail')

    setErrors({...new_errors})
    return Object.values(new_errors).every(x => x === "")
  }

  const formInputs = [
    {
      label: "Email",
      name: "email",
      placeholder: 'Enter your email',
      value: values.email,
      onChange: (e) => {
        setLoginError('')
        handleInputChange(e)
      },
      error: errors.email,
      type: 'email',
    },
    {
      label: "Password",
      name: "password",
      placeholder: 'Enter your password',
      value: values.password,
      onChange: (e) => {
        setLoginError('')
        handleInputChange(e)
      },
      type: 'password',
      error: errors.password,
    }
  ]

  const onLoginSuccess = (res) => {
    history.push('/avatar')
  }

  const onLoginFailure = (msg, error) => {
    if (msg.includes('E-mail is not verified.')) {
      setIsDialogOpen(true)
    } else if (msg === 'Unable to log in with provided credentials.') {
      setLoginError('Sorry, your username or password is invalid. Try again with correct details.')
    } else {
      setAlertState({...alertState, open: true, severity: 'error', message: msg})
    }
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (validate(values, errors)) {
      userLogin(values, onLoginSuccess, onLoginFailure, setIsLoading)
    }
  }

  return (
    <Box sx={mainBox}>
      <EmailVerificationDialog isOpen={isDialogOpen} open={isDialogOpen} email={values.email} onClose={() => setIsDialogOpen(false)}/>
      <h1>Welcome back</h1>
      <h5>Welcome back! Please enter your details.</h5>
      <GenericForm
        inputs={formInputs}
        submitButtonLabel={'Sign in'}
        onSubmit={onSubmit}
        component={
          <>
            <p className='forgot-password' onClick={() => history.push('/forgot-password')}>Forgot password?</p>
          </>
        }
      />
    </Box>
  );
}

const Login = () => {
  const [loginError, setLoginError] = useState('');

  return (
    <RegistrationParent form={<LoginForm setLoginError={setLoginError}/>} error={loginError}/>
  );
};

export default Login;
