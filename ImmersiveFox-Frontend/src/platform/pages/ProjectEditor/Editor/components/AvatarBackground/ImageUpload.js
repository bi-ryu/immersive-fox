import * as React from 'react';
import {Grid} from "@mui/material";
import FileUpload from "../../../../common/FileUpload";
import {useCallback, useContext, useState} from "react";
import AppContext from "../../../../../../AppContext";
import EditorContext from "../../../EditorContext";
import ReplayIcon from "@mui/icons-material/Replay";
import Button from "@mui/material/Button";
import CustomButton from "../../../../../Controls/CustomButton";
import {getUploadLink, saveUserBackgroundImages, uploadToBucket} from "../../../../../apis";


const ImageUpload = (props) => {
  const [isUploading, setIsUploading] = useState(false);
  const {requestConfigs, setRequestConfigs} = useContext(EditorContext);
  const {alertState, setAlertState, setIsLoading} = useContext(AppContext);
  const [uploadedImage, setUploadedImage] = useState(null)
  const {setUploadImageUI, refetch} = props

  const handleUploadError = (msg) => {
    setIsUploading(false)
    setAlertState({...alertState, open: true, severity: 'error', message: msg || 'Invalid file!'})
  }

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader()
      reader.readAsDataURL(file);
      setIsUploading(true);
      reader.onabort = () => handleUploadError()
      reader.onerror = () => handleUploadError()

      reader.onload = (event) => {
        setIsUploading(false)
        setUploadedImage(file)
        setRequestConfigs({
          ...requestConfigs,
          backgroundImageUpload: reader.result,
        })
      }
    })
    // eslint-disable-next-line
  }, [])

  const handleReload = () => {
    setRequestConfigs({...requestConfigs, backgroundImageUpload: null})
  }

  const onSuccess = () => {
    setUploadImageUI(false)
    setRequestConfigs({
      ...requestConfigs,
      backgroundImageUpload: null,
    })
    setAlertState({...alertState, open: true, severity: 'success', message: 'File uploaded'})
    refetch()
  }

  const onFailure = (msg, error) => {
    setAlertState({...alertState, open: true, severity: 'error', message: msg})
  }

  const onBucketUpload = (e) => {
    const formData = new FormData();
    if (e.status === 200) {
      formData.append("video", e.config.url.split('?')[0]);
      saveUserBackgroundImages(formData, onSuccess, onFailure, setIsLoading)
    } else {
      setIsLoading(false)
      onFailure('Upload Failed')
    }
  }

  const onUploadLink = (res) => {
    if (res.status === 200) {
      uploadToBucket(res.data.url, uploadedImage, onBucketUpload, onBucketUpload, () => {})
    } else {
      setIsLoading(false)
      onFailure('Upload Failed')
    }
  }

  const handleImageSubmit = () => {
    const formData = new FormData();

    if (uploadedImage.type.includes('video')){
      setIsLoading(true)
      getUploadLink(uploadedImage, onUploadLink, onUploadLink, ()=>{})
    }
    else {
      formData.append("image", uploadedImage, uploadedImage.name);
      formData.append("thumbnail", uploadedImage, uploadedImage.name);
      saveUserBackgroundImages(formData, onSuccess, onFailure, setIsLoading)
    }
  }

  return (
    <Grid container justifyContent="center">
      {
        requestConfigs.backgroundImageUpload ?
          <>
            {
              requestConfigs.backgroundImageUpload.includes('data:video') ?
              // Controls are removed here to only view image
              <video className="image-uploaded">
                <source src={requestConfigs.backgroundImageUpload} type={'video/mp4'} />
              </video> :
              <img className="image-uploaded" src={requestConfigs.backgroundImageUpload} alt="uploaded"/>
            }
            <Button className={'reload-button'} startIcon={<ReplayIcon/>} onClick={handleReload}>Reload</Button>
            <CustomButton className={'submit'} onClick={handleImageSubmit}>Submit</CustomButton>
          </> :
          <>
            <FileUpload
              onDrop={onDrop}
              title={'Upload a File'}
              isUploading={isUploading}
              accept="image/*, video/*"
            />
            <Button className={'reload-button'} style={{marginTop: 15}} onClick={() => setUploadImageUI(false)}>Cancel</Button>
          </>
      }
    </Grid>
  );
};

export default ImageUpload;