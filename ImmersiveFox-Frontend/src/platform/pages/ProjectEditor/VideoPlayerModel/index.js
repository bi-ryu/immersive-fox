import * as React from 'react';
import ReactPlayer from "react-player";
import {colors} from "../../../../utils/colors";
import {CircularProgress, Dialog, Grid} from "@mui/material";

const style = {
  padding: 8,
  color: colors.white,
  background: colors.lightBlack,
  'video': {
    border: `12px solid ${colors.blackGray}`,
    borderRadius: 4,
  }
}

const VideoPlayerModel = ({url, isOpen, onClose}) => {
  return (
    <Dialog maxWidth={'lg'} fullWidth={true} open={isOpen} onClose={onClose}>
      <Grid sx={style} container alignContent={'center'} justifyContent={'center'}>
        {
           url ?
           <ReactPlayer width={1000} height={575} url={url} controls playsinline/> :
           <CircularProgress thickness={5} size={70} sx={{color: colors.orange}}/>
        }
      </Grid>
    </Dialog>
  );
};

export default VideoPlayerModel;