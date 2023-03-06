import * as React from 'react';
import RegistrationParent from "../RegistrationParent";
import {useCustomForm} from "../../Controls/CustomForm";
import {resetPassword} from "../../apis";
import {useContext} from "react";
import AppContext from "../../../AppContext";
import {GenericForm} from "../common/GenericForm";
import {Box} from "@mui/material";
import {mainBox} from "./styled";
import {emailValidation} from "../../../utils/validation/formValidations";

const initialFormValues = {
  email: '',
}

const ForgotPasswordForm = () => {
  const {values, errors, setErrors, handleInputChange} = useCustomForm(initialFormValues);
  const {setIsLoading, alertState, setAlertState} = useContext(AppContext);

  const validate = (fieldValues, errors) => {
    const new_errors = { ...errors }
    new_errors.email = emailValidation(fieldValues.email)
    setErrors({...new_errors})
    return Object.values(new_errors).every(x => x === "")
  }

  const formInputs = [
    {
      label: "Email",
      name: "email",
      placeholder: 'Enter your email',
      value: values.email,
      onChange: handleInputChange,
      error: errors.email,
      type: 'email',
    },
  ]

  const onLoginSuccess = (res) => {
    setAlertState({...alertState, open: true, severity: 'success', message: 'Email delivered, please check your inbox!'})
  }

  const onLoginFailure = (msg, error) => {
    setAlertState({...alertState, open: true, severity: 'error', message: msg})
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (validate(values, errors)) {
      resetPassword(values, onLoginSuccess, onLoginFailure, setIsLoading)
    }
  }

  return (
    <Box sx={mainBox}>
      <h1>Forgot password?</h1>
      <h5>Please enter your email to get a password reset link.</h5>
      <GenericForm
        inputs={formInputs}
        submitButtonLabel={'Send email'}
        onSubmit={onSubmit}
      />
    </Box>
  );
}

const ForgotPassword = () => {
  return (
    <RegistrationParent form={<ForgotPasswordForm />} />
  );
};

export default ForgotPassword;
