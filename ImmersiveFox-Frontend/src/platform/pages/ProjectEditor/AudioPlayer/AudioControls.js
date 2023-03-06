import * as React from 'react';
import {IconPause, IconPlay} from "../../../../assets/icons";

const AudioControls = (props) => {
  const {isPlaying, onPlayPauseClick} = props
  return (
    <>
      {
        isPlaying ?
        <IconPause className={'play-button'} onClick={() => onPlayPauseClick(false)}/> :
        <IconPlay className={'play-button'} onClick={() => onPlayPauseClick(true)}/>
      }

    </>
  );
};

export default AudioControls;