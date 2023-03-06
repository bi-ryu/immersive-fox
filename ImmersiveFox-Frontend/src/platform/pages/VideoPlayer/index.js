import React, {useEffect, useState} from 'react';
import ReactPlayer from "react-player";
import {Grid} from "@mui/material";
import {colors} from "../../../utils/colors";
import {Logo} from "../../../assets/icons";
import {useParams} from "react-router-dom";
import {updateVideoOpenedCounts} from '../../apis';

const style = {
  height: '100vh',
  width: '100vw',
  'video': {
    border: `12px solid ${colors.blackGray}`,
    borderRadius: 4,
  },
  '& .logo': {
    cursor: 'pointer',
  }
}

export const VideoPlayer = ({id}) => {
  const url = `https://storage.googleapis.com/shareable-video/${id}.mp4`

  const smallScreen = window.innerWidth <= 900
  let playerWidth = '72%'
  let playerHeight = '80%'
  if (smallScreen) {
    playerWidth = 360
    playerHeight = 220
  }

  return (
    <Grid sx={style} container direction={'column'} alignItems={'center'} justifyContent={'center'}>
      <Logo className={'logo'} onClick={() => window.location.replace('/')}/>
      <br/><br/>
      <ReactPlayer width={playerWidth} height={playerHeight} url={url} controls playsinline />
    </Grid>
  );
};

const VideoPlayerPage = (props) => {
  const {video_id, id} = useParams();
  const [, setIsLoading] = useState(false);
  console.log("video page")
  useEffect(() => {
    const data = {"video_id": video_id}
    updateVideoOpenedCounts(data, (response) => {
      console.log(response)
    },
    () => {
      console.log("this is not working")
    },
    setIsLoading
    );
  }, [video_id, id])
  return <VideoPlayer id={id}/>
}

export default VideoPlayerPage;