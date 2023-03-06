import * as React from 'react';
import {Avatar, AvatarGroup, Button, Grid} from "@mui/material";
import styles from "./styles.module.scss";
import {backButtonStyle, avatarIcons, mainGrid} from "./styled";
import {useHistory} from "react-router-dom";
import {BackIcon} from "../../../assets/icons";
import {avatar0, avatar1, avatar2, avatar3, avatar4} from "../../../assets/images/";

const avatars = [avatar0, avatar1, avatar2, avatar3, avatar4]

const introObj = {
    title: "Generate Your Video Content in Hours. Not Weeks.",
    subTitle:
      "We create AI-generated microlearning videos from any text for LMS and corporate communication.",
};

const RegistrationParent = ({form, error}) => {
  const history = useHistory();
  const bottom_msg = window.location.href.includes('/signup') ? 'Already' : 'Don’t'

  const signUpPage = () => {
    history.push(bottom_msg === 'Already' ? '/login' : '/signup')
  }

  return (
    <Grid
      sx={mainGrid}
      container
      spacing={0}
      direction="row"
      alignItems='center'
      justifyContent="center"
      style={{minHeight: '100vh'}}
    >
      <Grid item xs={5}>
        <Grid container className={styles.signup_left}>
          <Button href={'/'} sx={backButtonStyle}><BackIcon />&nbsp;&nbsp;Back</Button>
          <Grid item xs={6}>
            {form}
          </Grid>
        </Grid>
        {/*<p className={'footer'}>*/}
        {/*  {bottom_msg} have an account? <b onClick={signUpPage}>Click here</b>*/}
        {/*</p>*/}
        <br/>
        {
          error ?
          <div className={'error'}>
            <p>{error}</p>
          </div> : null
        }
      </Grid>
      <Grid item xs={7}>
        <Grid container className={styles.signup_right}>
          <Grid item>
            <h4>IMMERSIVE <b>FOX</b></h4>
            <br/><br/>
            <h1>{introObj.title}</h1>
            <h5>{introObj.subTitle}</h5>
            <AvatarGroup sx={avatarIcons} spacing={15}>
              {avatars.map((a, key) => <Avatar key={key} alt="Avatar Icon" src={a} />)}
            </AvatarGroup>
            <h5>Join 40,000+ users</h5>
            <p>© 2019. All rights reserved.</p>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default RegistrationParent;
