import * as React from 'react';
import {Avatar, Dialog, Grid} from "@mui/material";
import emailIcon from '../../../assets/images/Common/emailIcon.png';
import CustomButton from "../../Controls/CustomButton";
import {dialogBox, dialogGrid} from "../Signup/styled";
import {useContext, useEffect, useState} from "react";
import {sendEmailVerification} from "../../apis";
import AppContext from "../../../AppContext";


const EmailVerificationDialog = (props) => {
  const {onClose, email, isOpen=false, timer=30, ...other} = props
  const [counter, setCounter] = useState(timer);
  const {alertState, setAlertState, setIsLoading} = useContext(AppContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCounter(counter ? counter - 1 : counter)
    }, 1000)

    return () => clearTimeout(timer)
  })

  useEffect(() => {
    setCounter(timer)
    // eslint-disable-next-line
  }, [isOpen])

  const handleEmailVerificationClick = (email) => {
    if (counter < 1) {
     sendEmailVerification(
       {'email': `${email}`},
       () => {
           setCounter(timer);
           setAlertState({...alertState, open: true, severity: 'success', message: 'Email verification sent.'})},
        () => {},
       setIsLoading
      )
    }
  }

  return (
    <Dialog sx={dialogBox} fullWidth maxWidth="md" {...other}>
      <Grid sx={dialogGrid} container direction={'column'} rowGap={2}>
        <Avatar
          sx={{height: '200px', width: '200px'}}
          variant={'square'}
          alt="Email Icon"
          src={emailIcon}
        />
        <h1>Verify your email</h1>
        <p>
          We’ve sent an email to <b>{email}</b>. Please verify your email address by clicking on the link in the email.
          The link will expire in 24 hours.
        </p>
        <p className={'bottom'}>
          If you have not received any email, please&nbsp;
          <b className={counter ? '' : 'click'} onClick={() => handleEmailVerificationClick(email)}>Click here</b>
          <span>{counter ? ` in ${counter} seconds ` : " "}</span>
          to resend or create account with another email.
        </p>
        <CustomButton sx={{width: '150px'}} size={'large'} onClick={onClose}>Exit</CustomButton>
      </Grid>
    </Dialog>
  );
};

export default EmailVerificationDialog;
