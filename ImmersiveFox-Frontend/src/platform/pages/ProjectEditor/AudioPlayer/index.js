import * as React from 'react';
import {useContext, useEffect, useRef, useState, useCallback} from "react";
import AudioControls from "./AudioControls";
import {CircularProgress, Grid, Slider} from "@mui/material";
import {playerGrid} from "./styles";
import Button from "@mui/material/Button";
import {Check} from "../../../../assets/icons";
import CustomButton from "../../../Controls/CustomButton";
import EditorContext from "../EditorContext";
import {colors} from "../../../../utils/colors";

const AudioPlayer = (props) => {
  const {audioSrc, audioProvider, label="My Voice", setAudioTime=null} = props
  const {audioTime} = useContext(EditorContext);
  const [trackProgress, setTrackProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio(audioSrc));
  const intervalRef = useRef();
  const { duration } = audioRef.current;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const startTimer = useCallback(() => {
    let intervalTime = audioProvider === "descript" ? 400: 1000;
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        setTrackProgress(0);
        setIsPlaying(false);
      } else {
        setTrackProgress(audioRef.current.currentTime);
        console.log(audioRef.current.currentTime);
      }
    }, intervalTime);

  });

  const onScrub = (value) => {
    clearInterval(intervalRef.current);
    audioRef.current.currentTime = value;
    setTrackProgress(audioRef.current.currentTime);
  };

  const onScrubEnd = () => {
    if (!isPlaying) {
      setIsPlaying(true);
    }
    startTimer();
  };

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
      startTimer();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, startTimer]);

  useEffect(() => {
    return () => {
      // eslint-disable-next-line
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    let intervalTime = audioProvider === "descript" ? 200: 500;
    const interval = setInterval(() =>
      {
        if (setAudioTime && !audioTime) {
          setAudioTime(Math.round(audioRef.current.duration))
        }
      }, intervalTime
    )
    return () => clearInterval(interval)
  }, )

  return (
    <Grid sx={playerGrid} container justifyContent={'center'}  alignContent={'center'}>
      <Grid className={'audio-play-button'} container justifyContent={'space-between'} alignContent='center'>
        {audioTime ?
          <AudioControls
            isPlaying={isPlaying}
            onPlayPauseClick={setIsPlaying}
          /> :
          <CircularProgress thickness={3} size={35} sx={{color: colors.orange}}/>
        }
        <Button className={'text-button'}>{label}</Button>
        <CustomButton endIcon={<Check />} className={'selected'}>Use</CustomButton>
      </Grid>
      <Grid className={'audio-slider'} container justifyContent={'center'} alignContent={'center'}>
          <Slider
            aria-label="Always visible"
            value={trackProgress}
            step={1}
            min={0}
            max={duration || 0}
            scale={(value) => 2 ** value}
            onChange={(e) => onScrub(e.target.value)}
            onMouseUp={onScrubEnd}
            onKeyUp={onScrubEnd}
            // getAriaValueText={() => trackProgress - 100}
            valueLabelFormat={value => <div>
              {duration ?
                `${new Date(trackProgress * 1000).toISOString().substr(14, 5)} 
                - ${new Date(duration * 1000).toISOString().substr(14, 5)}` :
                ''}
            </div>}
            // valueLabelDisplay="auto"
          />
      </Grid>
    </Grid>
  );
};

export default AudioPlayer;