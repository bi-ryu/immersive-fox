import * as React from 'react';
import {Grid} from "@mui/material";
import {emptyCard} from "./style";
import {logoMini} from "../../../../assets/images";

const EmptyCard = (props) => {
  return (
    <Grid sx={emptyCard} container direction={'column'} justifyContent={'center'} alignContent={'center'}>
      <div className={'inner-box'}>
        <img className='logo' src={logoMini} alt={'logo'}/>
        <h1>Here will be the videos that you generate</h1>
      </div>
    </Grid>
  );
};

export default EmptyCard;