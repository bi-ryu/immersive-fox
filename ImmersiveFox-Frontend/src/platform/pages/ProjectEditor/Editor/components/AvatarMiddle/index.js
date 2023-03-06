import * as React from 'react';
import {selectedAvatarGrid} from "../AvatarLeft/style";
import {Grid} from "@mui/material";
import CustomInput from "../../../../../Controls/CustomInput";
import {useContext} from "react";
import EditorContext from "../../../EditorContext";
import DragableComponent from "../DragableComponent";

const AvatarMiddle = ({selectedAvatar}) => {
  const {tab, audioText, setAudioText, setSelectedVoice, requestConfigs} = useContext(EditorContext);
  const maxTextLength = 4000;

  const getAvatarBackgroundStyle = (requestConfigs) => {
    if (requestConfigs.backgroundImage) {
      return {
        backgroundImage: `url('${requestConfigs.backgroundThumbnail}')`, backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat', backgroundSize: 'cover',
      }
    }
    return {background: requestConfigs.background}
  }

  return (
    <Grid sx={selectedAvatarGrid} item md={4} lg={5} sm={3} justifyContent='flex-end'>
      <DragableComponent avatarImage={selectedAvatar.thumbnail} background={getAvatarBackgroundStyle(requestConfigs)} aspectRatio = {selectedAvatar.aspect_ratio}/>
      {tab === 0 ?
        <CustomInput
          textArea={true}
          value={audioText}
          onChange={(e) => {
            setAudioText(e.target.value)
            setSelectedVoice(null)
          }}
          type={'text'}
          label={''}
          placeholder={'Enter your video script here'}
          maxRows={6}
          minRows={6}
          multiline
          fullWidth
          inputProps={{ maxLength: maxTextLength }}
        /> : null}
      {tab === 0 ?
        <Grid container alignContent={'end'} justifyContent={'end'}>
          <span className={'helper'}>{audioText.length}/{maxTextLength} left</span>
        </Grid> : null
      }
    </Grid>
  );
}

export default AvatarMiddle;
