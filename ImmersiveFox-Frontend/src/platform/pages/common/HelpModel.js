import * as React from 'react';
import {Dialog, Grid} from "@mui/material";
import {colors} from "../../../utils/colors";
import CustomInput from "../../Controls/CustomInput";
import CustomButton from "../../Controls/CustomButton";
import emailjs from "emailjs-com";
import {CUSTOMER_SUPPORT_TEMPLATE_ID, SERVICE_ID, USER_ID} from "../../../config";
import {useCallback, useContext, useState} from "react";
import {getUserData} from "../../../utils";
import AppContext from "../../../AppContext";
import {HelpSuccess} from "../../../assets/icons";
import FileUpload from "./FileUpload";
import CloseIcon from '@mui/icons-material/Close';

const style = {
  padding: '20px 50px 40px 50px',
  color: colors.white,
  background: colors.lightBlack,
  'h1': {
    fontSize: 36,
    fontWeight: 600,
    lineHeight: 1.8,
  },
  'h2': {
    fontWeight: 600,
    fontSize: 28,
  },
  'p': {
    fontSize: 20,
  },
  '& .MuiInputBase-input': {
    border: `1px solid ${colors.lightWhite}`,
    fontSize: 16,
    fontWeight: 400,
  },
  '& .MuiInputBase-input:focus': {
    border: `1px solid ${colors.drawerSelected}`,
  },
  'div': {
    marginBottom: 1,
  },
  '& .helper': {
    marginTop: -7,
    padding: 1,
    fontSize: 16,
    zIndex: 1,
    color: colors.lightWhite,
  },
}

const HelpModel = (props) => {
  const {isOpen, setOpen} = props
  const [successOpen, setSuccessOpen] = useState(false);
  const [emailMsg, setEmailMsg] = useState('');
  const {setIsLoading, alertState, setAlertState} = useContext(AppContext);
  const userData = getUserData();
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [fileContent, setFileContent] = useState(null);

  const handleClose = () => {
    setOpen(false)
    setSuccessOpen(false)
    setSelectedFile(null)
  }

  const handleUploadError = (msg) => {
    setSelectedFile({name: 'invalid'})
    setIsUploading(false)
    setAlertState({...alertState, open: true, severity: 'error', message: msg || 'Invalid file!'})
    setSelectedFile(null)
  }

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader()
      reader.readAsDataURL(file);
      setIsUploading(true);
      reader.onabort = () => handleUploadError()
      reader.onerror = () => handleUploadError()

      reader.onload = (event) => {
        setIsUploading(false)
        setSelectedFile(file);
        setFileContent(reader.result)
      }
    })
    // eslint-disable-next-line
  }, [])

  const sendEmail = (data) => {
    setIsLoading(true)

    emailjs.send(SERVICE_ID, CUSTOMER_SUPPORT_TEMPLATE_ID, data, USER_ID).then(
      (response) => {
        if (response?.status === 200) {
          setSuccessOpen(true)
        } else {
          setAlertState({...alertState, open: true, severity: 'success', message: 'Something went wrong!'})
        }
        setIsLoading(false)
      },
      (err) => {
        setAlertState({...alertState, open: true, severity: 'success', message: 'Something went wrong!'})
        setIsLoading(false)
      }
    );
    setEmailMsg('')
    setOpen(false)
  };

  const handleSubmit = () => {
    if (!emailMsg.length) {
      setAlertState({...alertState, open: true, severity: 'error', message: 'Text required!'})
      return
    }
    const data = {
      'username': userData.name,
      'useremail': userData.email,
      'message': emailMsg,
      'content': fileContent,
      'reply_to': userData.email,
    }
    sendEmail(data)
  }

  return (
    <>
      <Dialog maxWidth={'sm'} fullWidth={true} open={isOpen} onClose={handleClose}>
        <Grid sx={style} container direction={'column'} alignItems={'center'} justifyContent={'center'}>
          <Grid container alignContent={'start'} justifyContent={'end'}>
            <CloseIcon style={{cursor: 'pointer'}} onClick={handleClose}/>
          </Grid>
          <Grid container alignContent={'start'} justifyContent={'start'}>
            <h1>Contact Us</h1>
          </Grid>
          {
            selectedFile ?
              <span style={{marginBottom: 20, color: colors.orange}}>{selectedFile.name}</span> :
              <FileUpload
                setSelectedFile={setSelectedFile}
                onDrop={onDrop}
                isUploading={isUploading}
                accept="image/*"
              />
          }
          <CustomInput
            textArea={true}
            value={emailMsg}
            onChange={(e) => setEmailMsg(e.target.value)}
            type={'text'}
            label={'Text'}
            placeholder={'Enter your text'}
            maxRows={6}
            minRows={3}
            multiline
            fullWidth
            inputProps={{ maxLength: 400 }}
          />
          <Grid container alignContent={'end'} justifyContent={'end'}>
            <span className={'helper'}>{emailMsg.length}/400 left</span>
          </Grid>
          <CustomButton onClick={handleSubmit} fullWidth>Submit</CustomButton>
        </Grid>
      </Dialog>
      <Dialog maxWidth={'sm'} open={successOpen} onClose={handleClose}>
        <Grid sx={{...style, padding: 5, background: colors.model}}
              container direction={'column'} alignItems={'center'}
              justifyContent={'center'}>
          <HelpSuccess/>
          <br/>
          <h2>Message sent</h2>
          <br/>
          <p>Email will be answered within a few days</p>
          <br/>
          <CustomButton onClick={() => handleClose()}>Ok</CustomButton>
        </Grid>
      </Dialog>
    </>
  );
};

export default HelpModel;
