import {useCallback, useContext, useState} from "react";
import EditorContext from "../../../EditorContext";
import AppContext from "../../../../../../AppContext";
import {Grid} from "@mui/material";
import AudioPlayer from "../../../AudioPlayer";
import Button from "@mui/material/Button";
import ReplayIcon from "@mui/icons-material/Replay";
import CustomButton from "../../../../../Controls/CustomButton";
import FileUpload from "../../../../common/FileUpload";
import * as React from "react";
import {selectAudioSection} from "./style";
import {Check, Trash} from "../../../../../../assets/icons";
import {getUploadLink, uploadToBucket} from "../../../../../apis";

const SelectUploadedAudio = ({clearAudio}) => {
  return (
      <Grid sx={selectAudioSection} container className={'voices'}>
        <Grid
          container
          alignItems='center'
          justifyContent='space-between'
          columns={24}
        >
          <Grid item xs={21}>
            <Grid
              container
              alignContent={'center'}
              className={`voice selected`}
              justifyContent={'space-between'}
            >
              <CustomButton className={'my-audio'}>My Audio</CustomButton>
              <CustomButton
                endIcon={<Check/>}
                className={'selected'}
              >
                Use
              </CustomButton>
            </Grid>
          </Grid>
          <Grid item xs={3} alignContent={'center'}>
            <Trash onClick={clearAudio} className={'trash-icon'} />
          </Grid>
        </Grid>
      </Grid>
  )
}

const AudioSection = () => {
  const {selectedFile, setSelectedFile, audioSubmitted, setAudioSubmitted, setAudioTime, setAudioUrl} = useContext(EditorContext);

  const {alertState, setAlertState} = useContext(AppContext);
  const audioLengthLimit = 240
  const psMsg = `To achieve the best results, please make sure that your audio is clear and 
                  without any noise, music, etc.`
  const audioSrc = selectedFile && selectedFile.name !== 'invalid' ? URL.createObjectURL(selectedFile) : ''
  const [isUploading, setIsUploading] = useState(false);

  const handleReload = () => {
    setSelectedFile(null)
    setAudioSubmitted(false)
  }

  const handleAudioSubmit = () => {
    setAudioSubmitted(true)
    const msg = 'Audio file selected, click to generate the video!'
    setAlertState({...alertState, open: true, severity: 'success', message: msg})
  }

  const handleUploadError = (msg) => {
    setSelectedFile({name: 'invalid'})
    setIsUploading(false)
    setAlertState({...alertState, open: true, severity: 'error', message: msg || 'Invalid file!'})
    setSelectedFile(null)
  }

  const onFailure = (msg, error) => {
    setIsUploading(false)
    setAlertState({...alertState, open: true, severity: 'error', message: msg})
  }

  const onBucketUpload = (e, file=null) => {
    if (e.status === 200) {
      setAudioUrl(e.config.url.split('?')[0]);
      setSelectedFile(file)
      setIsUploading(false)
    } else {
      onFailure('Upload Failed')
    }
  }

  const onUploadLink = (res, file) => {
    if (res.status === 200) {
      uploadToBucket(res.data.url, file, (e) => onBucketUpload(e, file), onBucketUpload, () => {})
    } else {
      onFailure('Upload Failed')
    }
  }

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader()
      setIsUploading(true);
      reader.onabort = () => handleUploadError()
      reader.onerror = () => handleUploadError()

      reader.onload = (event) => {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        audioContext.decodeAudioData(event.target.result, function (buffer) {
          const duration = buffer.duration;
          // Making this condition always false
          if (duration > audioLengthLimit && false) {
            const error = `Audio length should not be greater than ${audioLengthLimit} seconds`
            handleUploadError(error)
          } else {
            getUploadLink(file, (res) => onUploadLink(res, file), onUploadLink, () => {}, 'user_audios')
            setAudioTime(Math.round(duration))
          }
        }).catch(e => {});
      }
      reader.readAsArrayBuffer(file)
    })
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <Grid>
        {
          audioSubmitted ?
          <SelectUploadedAudio clearAudio={handleReload}/> :
          <div style={{display: selectedFile ? 'inline' : 'none'}} className={'selected-file'}>
            {audioSrc ? <AudioPlayer audioSrc={audioSrc} audioProvider=""/> : null}
            <Button className={'reload'} startIcon={<ReplayIcon/>} onClick={handleReload}>Reload</Button>
            <CustomButton className={'submit'} onClick={handleAudioSubmit}>Submit</CustomButton>
          </div>
        }

        {
          selectedFile ? null :
            <FileUpload
              setSelectedFile={setSelectedFile}
              onDrop={onDrop}
              isUploading={isUploading}
              accept="audio/*"
            />
        }
      </Grid>
      <Grid>
        {
          selectedFile ?
          null :
          <h5 className={'select-audio'}>
            {psMsg}
          </h5>
        }
      </Grid>
    </>
  )
}

export default AudioSection;