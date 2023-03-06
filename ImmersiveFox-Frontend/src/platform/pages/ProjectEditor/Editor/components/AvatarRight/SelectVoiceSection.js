import {CircularProgress, Grid} from "@mui/material";
import {selectVoiceSection} from "./style";
import CustomButton from "../../../../../Controls/CustomButton";
import {Check, DisabledPlay} from "../../../../../../assets/icons";
import * as React from "react";
import {useContext, useState} from "react";
import {conditionalRender} from "../../../../../../utils";
import {generateTextToAudio, generateTextToDescriptAudio} from "../../../../../apis";
import EditorContext from "../../../EditorContext";
import {colors} from "../../../../../../utils/colors";
import AppContext from "../../../../../../AppContext";
import AudioPlayer from "../../../AudioPlayer";


const SelectVoiceSection = () => {
  const {
    audioText, selectedVoice, setAudioTime,
    setSelectedVoice, voices, descript_voices, audioUrl, setAudioUrl
  } = useContext(EditorContext);
  const {alertState, setAlertState} = useContext(AppContext)
  const [loading, setLoading] = useState(false);
  const [audioProvider, setAudioProvider] = useState("");

  const handleOnSuccess = (response) => {
    setAudioUrl(response.data['audio_url'])
  }

  const handleVoiceSelect = (voiceId) => {
    setAudioUrl(null)
    if (!audioText.length) {
      setAlertState({...alertState, open: true, severity: 'error', message: 'Please input video script'})
      return
    }

    setSelectedVoice(voiceId)
    const data = {
      voice: voiceId,
      text: audioText,
    }
    generateTextToAudio(data, handleOnSuccess, () => {}, setLoading)
    setAudioProvider("console");
  }

  const handleDescriptVoiceSelect = (voice) => {
    setAudioUrl(null)
    console.log(voice)
    if (!audioText.length) {
      setAlertState({...alertState, open: true, severity: 'error', message: 'Please input video script'})
      return
    }

    setSelectedVoice(voice.name)
    const data = {
      // voice: voice,
      voice_id: voice.voice_id,
      voice_style_id: voice.voice_style_id,
      text: audioText,
    }
    // generateTextToAudio(data, handleOnSuccess, () => {}, setLoading)
    generateTextToDescriptAudio(data, handleOnSuccess, () => {}, setLoading)
    setAudioProvider("descript");
  }

  

  const circularProgress = <CircularProgress thickness={3} size={35} sx={{color: colors.orange}} />
  const getAudioPlayer = (label) => {
    return audioUrl ? <AudioPlayer audioSrc={audioUrl} audioProvider = {audioProvider} label={label} setAudioTime={setAudioTime}/> : null;
  }

  return (
      <Grid sx={selectVoiceSection} container className={'voices'}>
        {
          (descript_voices || []).map(voice => {
            return voice.name === selectedVoice && !loading ? getAudioPlayer(voice.label) : (
              <Grid
                container
                key={voice.id}
                alignContent={'center'}
                className={`voice ${voice.name === selectedVoice ? 'selected' : ''}`}
                justifyContent={'space-between'}
                onClick={() => voice.name !== selectedVoice ? handleDescriptVoiceSelect(voice) : null}
              >
                {
                  conditionalRender(
                    voice.name === selectedVoice,
                    conditionalRender(loading, circularProgress, null),
                    <DisabledPlay className={'play-icon'} />
                )}
                <p className={'voice-name'}>{voice.label}</p>
                <CustomButton
                  endIcon={voice.name === selectedVoice ? <Check /> : null}
                >
                  Use
                </CustomButton>
              </Grid>
            )
          })
        }
        {
          (voices || []).map(voice => {
            return voice.name === selectedVoice && !loading ? getAudioPlayer(voice.label) : (
              <Grid
                container
                key={voice.id}
                alignContent={'center'}
                className={`voice ${voice.name === selectedVoice ? 'selected' : ''}`}
                justifyContent={'space-between'}
                onClick={() => voice.name !== selectedVoice ? handleVoiceSelect(voice.name) : null}
              >
                {
                  conditionalRender(
                    voice.name === selectedVoice,
                    conditionalRender(loading, circularProgress, null),
                    <DisabledPlay className={'play-icon'} />
                )}
                <p className={'voice-name'}>{voice.label}</p>
                <CustomButton
                  endIcon={voice.name === selectedVoice ? <Check /> : null}
                >
                  Use
                </CustomButton>
              </Grid>
            )
          })
        }
      </Grid>
  )
}

export default SelectVoiceSection;