import * as React from 'react';
import {Dialog, Grid} from "@mui/material";
import {Timeout} from "../../../../../assets/icons";
import {colors} from "../../../../../utils/colors";
import CustomButton from "../../../../Controls/CustomButton";
import Button from "@mui/material/Button";

const style = {
  color: colors.white,
  background: colors.lightBlack,
  'h2': {
    fontWeight: 700,
    fontSize: 18,
    lineHeight: 2.8,
  },
  'p': {
    fontSize: 14,
  },
  '& .MuiInputBase-input': {
    border: `1px solid ${colors.lightWhite}`,
  },
  '& .MuiInputBase-input:focus': {
    border: `none`,
  },
  'div': {
    marginBottom: 1,
  },
  'button': {
    width: '40%',
    margin: 1,
  },
  'button.close': {
    textTransform: 'none',
    color: colors.intenseGray,
    border: `1px solid ${colors.intenseGray}`,
    borderRadius: 2,
    fontSize: 16,
  },
 '& .buttons': {
   marginTop: 8,
  },
}

const TimeOutModel = (props) => {
  const {isOpen, setOpen, setHelpModel} = props

  const handleClose = () => {
    setOpen(false)
  }

  const handleContactUs = () => {
    setOpen(false)
    setHelpModel(true)
  }

  return (
    <Dialog maxWidth={'sm'} open={isOpen} onClose={handleClose}>
      <Grid sx={{...style, padding: 2, paddingTop: 10, background: colors.model}}
            container direction={'column'} alignItems={'center'}
            justifyContent={'center'}>
        <Timeout />
        <br/>
        <Grid container justifyContent={'center'} alignContent={'center'}>
          <h2>Sorry but you are out of minutes</h2>
          <p>Contact us to get access to more videos.</p>
        </Grid>
        <Grid className={'buttons'} container alignContent={'center'} justifyContent={'center'}>
          <Button className={'close'} onClick={() => handleClose()}>Close</Button>
          <CustomButton onClick={handleContactUs}>Contact Us</CustomButton>
        </Grid>
      </Grid>
    </Dialog>
  );
};

export default TimeOutModel;
