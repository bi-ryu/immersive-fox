import * as React from 'react';
import {colors} from "../../../utils/colors";
import {CircularProgress, Grid, Modal} from "@mui/material";
import {useCustomForm} from "../../Controls/CustomForm";
import {GenericForm} from "./GenericForm";
import {isRequired} from "../../../utils/validation/formValidations";
import {useContext, useState} from "react";
import {devLogin} from "../../apis";
import AppContext from "../../../AppContext";
import {showDevLogin} from "../../../utils";

const initialFormValues = {
  username: '',
  password: '',
}

const DevLogin = (props) => {
  const isDevLoggedIn = showDevLogin();
  const [isLoading, setIsLoading] = useState(false);
  const {values, errors, setErrors, handleInputChange} = useCustomForm(initialFormValues);
  const {alertState, setAlertState} = useContext(AppContext);
  const [isOpen, setIsOpen] = useState(isDevLoggedIn);

  const formInputs = [
    {
      label: "Username",
      name: "username",
      placeholder: 'Enter username',
      value: values.username,
      onChange: handleInputChange,
      error: errors.username,
    },
    {
      label: "Password",
      name: "password",
      placeholder: 'Enter password',
      value: values.password,
      onChange: handleInputChange,
      type: 'password',
      error: errors.password,
    }
  ]

  const validate = (fieldValues, errors) => {
    const new_errors = { ...errors }
    new_errors.username = isRequired(fieldValues.username)
    new_errors.password = isRequired(fieldValues.password)
    setErrors({...new_errors})
    return Object.values(new_errors).every(x => x === "")
  }

  const onSuccess = (res) => {
    if (res.data.status) {
      setIsOpen(false)
    } else {
      setAlertState({...alertState, open: true, severity: 'error', message: 'Login failed!'})
    }
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (validate(values, errors)) {
      const data = {'username': values.username, 'password': values.password}
      devLogin(data, onSuccess, () => {}, setIsLoading)
    }
  }

  return (
    <Modal style={{background: colors.blackGray}} open={isOpen}>
      <Grid style={{width: '100vw', height: '100vh'}} container direction={'column'} alignItems={'center'} justifyContent={'center'}>
        {
          isLoading ? <CircularProgress thickness={6} size={70} sx={{color: "#FE6338FF"}} /> :
          <GenericForm
            inputs={formInputs}
            submitButtonLabel={'Login'}
            onSubmit={onSubmit}
          />
        }
      </Grid>
    </Modal>
  );
};

export default DevLogin;
