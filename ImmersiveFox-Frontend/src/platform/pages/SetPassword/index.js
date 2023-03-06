import * as React from 'react';
import RegistrationParent from "../RegistrationParent";
import {useCustomForm} from "../../Controls/CustomForm";
import {resetPasswordConfirm} from "../../apis";
import {useHistory, useParams} from "react-router-dom";
import {useContext} from "react";
import AppContext from "../../../AppContext";
import {GenericForm} from "../common/GenericForm";
import {Box} from "@mui/material";
import {isEqual, isRequired} from "../../../utils/validation/formValidations";

const initialFormValues = {
  password1: '',
  password2: '',
}

const SetPasswordForm = () => {
  const history = useHistory();
  const {values, errors, setErrors, handleInputChange} = useCustomForm(initialFormValues);
  const {setIsLoading, alertState, setAlertState} = useContext(AppContext);
  const {id, key} = useParams();

  const validate = (fieldValues, errors) => {
    const new_errors = { ...errors }
    new_errors.password1 = isRequired(fieldValues.password1)
    new_errors.password2 = isEqual(fieldValues.password2, fieldValues.password1)
    setErrors({...new_errors})
    return Object.values(new_errors).every(x => x === "")
  }

  const formInputs = [
    {
      label: "Password",
      name: "password1",
      placeholder: 'Enter a password',
      value: values.password1,
      onChange: handleInputChange,
      type: 'password',
      error: errors.password1,
    },
    {
      label: "Repeat password",
      name: "password2",
      placeholder: 'Enter same password again',
      value: values.password2,
      onChange: handleInputChange,
      type: 'password',
      error: errors.password2,
    },
  ]

  const onSuccess = (res) => {
    setAlertState({...alertState, open: true, severity: 'success', message: 'Password has been reset, login with new password!'})
    history.push('/login')
  }

  const onFailure = (msg, error) => {
    setAlertState({...alertState, open: true, severity: 'error', message: msg})
  }

  const onSubmit = (e) => {
    e.preventDefault();

    if (validate(values, errors)) {
      const data = {
        new_password1: values.password1,
        new_password2: values.password2,
        uid: id,
        token: key,
      }
      resetPasswordConfirm(data, onSuccess, onFailure, setIsLoading)
    }
  }

  return (
    <Box>
      <h1>Create a password</h1>
      <br/>
      <GenericForm inputs={formInputs} submitButtonLabel={'Set password'} onSubmit={onSubmit}/>
    </Box>
  );
}

const SetPassword = () => {
  return (
    <RegistrationParent form={<SetPasswordForm />} />
  );
};

export default SetPassword;
