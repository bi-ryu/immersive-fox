import * as React from 'react';
import {Grid} from "@mui/material";
import BasePage from "../BasePage";
import {mainGridProps} from "./style";
import AvatarLeft from "./components/AvatarLeft";
import {useContext, useEffect, useState} from "react";
import AppContext from "../../../../AppContext";
import {getAvatars, sendVideoGenerationRequest} from "../../../apis";
import {conditionalRender, isUserLoggedIn, url} from "../../../../utils";
import CustomButton from "../../../Controls/CustomButton";
import {useHistory} from "react-router-dom";
import TimeoutModel from "./components/TimeoutModel";
import HelpModel from "../../common/HelpModel";
import EditorContext, {initialValues} from "../EditorContext";
import AvatarRight from "./components/AvatarRight";
import useAxios from "axios-hooks";
import AvatarMiddle from "./components/AvatarMiddle";
import AvatarBackground from "./components/AvatarBackground";
import {colors} from "../../../../utils/colors";

const initialConfigs = {
  background: colors.white,
  circleBackground: colors.orange,
  backgroundImage: null,
  backgroundType: 'color',
  backgroundImageUpload: null,
}

const Editor = () => {
  if (!isUserLoggedIn()) {
    window.location.replace('/login')
  }

  const history = useHistory();
  const [avatarTab, setAvatarTab] = useState('avatar');
  const [avatarSelection, setAvatarSelection] = useState('system-avatar');
  const [avatarPositionTab, setAvatarPositionTab] = useState('center');
  const [avatarSize, setAvatarSize] = useState(75);
  const [avatarShape, setAvatarShape] = useState('original');
  const [xPosition, setXPosition] = useState(0.1);
  const [yPosition, setYPosition] = useState(0);
  const [avatarOffsetX, setAvatarOffsetX] = useState(0);
  const [avatarOffsetY, setAvatarOffsetY] = useState(0);
  const [avatarBackgroundTab, setAvatarBackgroundTabTab] = useState('color');
  const [selectedFile, setSelectedFile] = useState(null);
  const [audioTime, setAudioTime] = useState(null);
  const [audioSubmitted, setAudioSubmitted] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [allAvatars, setAllAvatars] = useState([]);
  const [openTimeoutModel, setOpenTimeoutModel] = useState(false);
  const [helpModel, setHelpModel] = useState(false);
  const {setIsLoading, alertState, setAlertState} = useContext(AppContext);
  const [tab, setTab] = useState(0);
  const [audioText, setAudioText] = useState('');
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [audioUrl, setAudioUrl] = useState('');
  const [requestConfigs, setRequestConfigs] = useState(initialConfigs);
  const [avatarWidth, setAvatarWidth] = useState();
  const [avatarHeight, setAvatarHeight] = useState();

  const [{ data: voices }] = useAxios(
    {url: url(`/text_to_audio_voices/?gender=${selectedAvatar && selectedAvatar.gender}`)}
  )
  const [{ data: descript_voices }] = useAxios(
    {url: url(`/descript_audio_voices/?gender=${selectedAvatar && selectedAvatar.gender}`)}
  )

  
  const contextValues = {
    selectedFile: selectedFile,
    setSelectedFile: setSelectedFile,
    audioSubmitted: audioSubmitted,
    setAudioSubmitted: setAudioSubmitted,
    audioTime: audioTime,
    setAudioTime: setAudioTime,
    tab: tab,
    setTab: setTab,
    audioText: audioText,
    setAudioText: setAudioText,
    selectedVoice,
    setSelectedVoice,
    voices,
    descript_voices,
    audioUrl,
    setAudioUrl,
    requestConfigs,
    setRequestConfigs,
    avatarBackgroundTab,
    setAvatarBackgroundTabTab,
    avatarPositionTab,
    setAvatarPositionTab,
    avatarSize,
    setAvatarSize,
    xPosition,
    setXPosition,
    yPosition,
    setYPosition,
    avatarShape,
    setAvatarShape,
    avatarSelection,
    setAvatarSelection,
    setAvatarWidth,
    setAvatarHeight,
    avatarWidth,
    avatarHeight,
    avatarOffsetX,
    avatarOffsetY,
    setAvatarOffsetX,
    setAvatarOffsetY
  }

  const onSuccess = () => {
    setAlertState({...alertState, open: true, severity: 'success', message: 'Video generation has been requested!'})
    history.push('/saved')
  }

  const onFailure = (msg, error) => {
    if (msg === 'Buy more time') {
      setOpenTimeoutModel(true)
    } else {
      setAlertState({...alertState, open: true, severity: 'error', message: msg})
    }
  }

  const onAvatarSuccess = (response) => {
    setAllAvatars(response.data.results)
    if (response.data.results && response.data.results.length) {
      setSelectedAvatar(response.data.results[0])
    }
  }

  const onAvatarFailure = (msg, error) => {
    setAlertState({...alertState, open: true, severity: 'error', message: msg})
  }

  const handleClick = () => {
    if (tab === 1 && !(selectedFile && audioSubmitted && audioTime)) {
      const error = 'Please submit an audio file in the right box!'
      setAlertState({...alertState, open: true, severity: 'error', message: error})
    }
    else if (!(audioUrl && audioTime)) {
      const error = 'Please use a voice'
      setAlertState({...alertState, open: true, severity: 'error', message: error})
    }
    else {
      const formData = new FormData();
      formData.append("avatar", selectedAvatar.id);

      formData.append("audio_url",  audioUrl);

      if (tab === 0)
        formData.append("text", audioText);

      if (requestConfigs.backgroundImage) {
        formData.append('background_image', requestConfigs.backgroundImage)
      }
      else {
        formData.append('background_color', requestConfigs.background)
      }

      if (requestConfigs.backgroundVideo) {
        formData.append('background_video', requestConfigs.backgroundVideo)
      }
      if (avatarShape === 'circle') {
        formData.append('circle_background', requestConfigs.circleBackground)
      }
      formData.append("audio_time", Math.ceil(audioTime/60) * 60);
      formData.append("avatar_size", avatarSize);
      formData.append("x_position", xPosition);
      formData.append("y_position", yPosition);
      sendVideoGenerationRequest(formData, onSuccess, onFailure, setIsLoading)
    }
  }

  useEffect(() => {
    getAvatars(onAvatarSuccess, onAvatarFailure, setIsLoading, avatarSelection === 'user-avatar')
    // eslint-disable-next-line
  }, [avatarSelection])

  return (
    <BasePage
      leftComponents={<h3>Project Name</h3>}
      rightComponents={[
        <CustomButton key={'generate-video'} onClick={handleClick}>Generate Video</CustomButton>
      ]}
      tabOnChange={setAvatarTab}
      tabValue={avatarTab}
    >
      <EditorContext.Provider value={{...initialValues, ...contextValues}}>
        <Grid container {...mainGridProps}>
          {
            conditionalRender(
              selectedAvatar,
              <>
                {
                  avatarTab === 'background' ?
                  <AvatarBackground /> :
                  <AvatarLeft
                    selectedAvatar={selectedAvatar}
                    setSelectedAvatar={setSelectedAvatar}
                    avatars={allAvatars}
                    avatarSelection={avatarSelection}
                    setAvatarSelection={setAvatarSelection}
                    setHelpModel={setHelpModel}
                  />
                }
                <AvatarMiddle selectedAvatar={selectedAvatar} />
                <AvatarRight />
              </>, null)
          }
        </Grid>
        <TimeoutModel isOpen={openTimeoutModel} setOpen={setOpenTimeoutModel} setHelpModel={setHelpModel}/>
        <HelpModel isOpen={helpModel} setOpen={setHelpModel}/>
      </EditorContext.Provider>
    </BasePage>
  );
}

export default Editor;