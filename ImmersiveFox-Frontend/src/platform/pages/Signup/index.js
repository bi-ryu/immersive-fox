import * as React from 'react';
import RegistrationParent from "../RegistrationParent";
import {useCustomForm} from "../../Controls/CustomForm";
import {Box} from "@mui/material";
import {userSignUp} from "../../apis";
import EmailVerificationDialog from "../common/EmailVerificationDialog";
import {useContext, useState} from "react";
import AppContext from "../../../AppContext";
import {GenericForm} from "../common/GenericForm";
import {emailValidation, isEqual, isRequired, textValidation} from "../../../utils/validation/formValidations";
import {dialogBox} from "./styled";

const initialFormValues = {
  name: '',
  email: '',
  password1: '',
  password2: '',
}

const SignUpForm = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const {setIsLoading, alertState, setAlertState} = useContext(AppContext);
  const {values, errors, setErrors, handleInputChange} = useCustomForm(initialFormValues);

  const validate = (fieldValues, errors) => {
    const new_errors = { ...errors }
    new_errors.name = textValidation(fieldValues.name)
    new_errors.email = emailValidation(fieldValues.email)
    new_errors.password1 = isRequired(fieldValues.password1)
    new_errors.password2 = isEqual(fieldValues.password2, fieldValues.password1)
    setErrors({...new_errors})
    return Object.values(new_errors).every(x => x === "")
  }

  const onSuccess = () => {
    setIsDialogOpen(true)
  }

  const onFailure = (msg) => {
    setAlertState({...alertState, open: true, severity: 'error', message: msg})
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if (validate(values, errors)) {
      userSignUp({'first_name': values.name, ...values}, onSuccess, onFailure, setIsLoading)
    }
  }

  const formInputs = [
    {
      label: "Name*",
      name: "name",
      placeholder: 'Enter your name',
      value: values.name,
      onChange: handleInputChange,
      error: errors.name,
    },
    {
      label: "Email*",
      name: "email",
      placeholder: 'Enter your email',
      value: values.email,
      onChange: handleInputChange,
      type: 'email',
      error: errors.email,
    },
    {
      label: "Password*",
      name: "password1",
      placeholder: 'Enter a password',
      value: values.password1,
      onChange: handleInputChange,
      type: 'password',
      error: errors.password1,
    },
    {
      label: "Repeat password*",
      name: "password2",
      placeholder: 'Enter same password again',
      value: values.password2,
      onChange: handleInputChange,
      type: 'password',
      error: errors.password2,
    },
  ]

  return (
    <Box sx={dialogBox}>
      <EmailVerificationDialog isOpen={isDialogOpen} open={isDialogOpen} email={values.email} onClose={() => setIsDialogOpen(false)}/>
      <h1>Sign Up</h1>
      <br/>
      <GenericForm inputs={formInputs} submitButtonLabel={'Sign up'} onSubmit={onSubmit}/>
    </Box>
  );
}

const SignUp = () => {
  return (
    <RegistrationParent form={<SignUpForm />} />
  );
};

export default SignUp;
