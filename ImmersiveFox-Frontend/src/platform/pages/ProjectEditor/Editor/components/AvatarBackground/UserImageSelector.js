import * as React from 'react';
import {useContext, useState} from "react";
import EditorContext from "../../../EditorContext";
import useAxios from "axios-hooks";
import {url} from "../../../../../../utils";
import {Button, Card, CardMedia, Grid} from "@mui/material";
import ImageUpload from "./ImageUpload";
import {AddIcon, CheckedIcon, UnCheckedIcon} from "../../../../../../assets/icons";
import PlayCircleFilledTwoToneIcon from '@mui/icons-material/PlayCircleFilledTwoTone';
import AppContext from "../../../../../../AppContext";
import {deleteUserBackgroundImages} from "../../../../../apis";

const UserImageSelector = () => {
  const {requestConfigs, setRequestConfigs} = useContext(EditorContext);
  const {alertState, setAlertState, setIsLoading} = useContext(AppContext);
  const [uploadImageUI, setUploadImageUI] = useState(false);
  const [selectedImages, setSelectedImages] = useState([])

  const [{ data: images }, refetch] = useAxios(
    {url: url(`/generated_video_config/user_avatar_background_images/`)}
  )

  const onDeleteSuccess = () => {
    setAlertState({...alertState, open: true, severity: 'success', message: 'Images deleted!'})
    refetch()
  }

  const onDeleteFailure = () => {
    setAlertState({...alertState, open: true, severity: 'error', message: 'Images deletion failed!'})
  }

  const handleDelete = () => {
    if (selectedImages.length > 0) {
      const formData = new FormData();
      formData.append("image_ids", selectedImages);
      deleteUserBackgroundImages(formData, onDeleteSuccess, onDeleteFailure, setIsLoading)
    } else {
      setAlertState({...alertState, open: true, severity: 'error', message: 'Select images to delete!'})
    }
  }

  return uploadImageUI ?
    <ImageUpload setUploadImageUI={setUploadImageUI} refetch={refetch}/> :
    (
      <Grid container justifyItems='center' rowGap={1} spacing={1}>
        <Grid container direction={'row'} justifyContent='space-between'>
          <Button className={'add-image'} endIcon={<AddIcon />} onClick={() => setUploadImageUI(true)}>
            Add File
          </Button>
          <Button className={'delete-image'} onClick={handleDelete}>
            Delete
          </Button>
        </Grid>
        {(images || []).map((image, index) =>
          <Grid
            xs={3} item key={index.toString()}
            style={{padding: 4}}
            onClick={() => setRequestConfigs({
              ...requestConfigs,
              backgroundImage: image.image,
              backgroundThumbnail: image.thumbnail,
              backgroundVideo: image.video,
            })}
            className={`color-box`}>
            <Card elevation={0} className={`img-card ${image.image === requestConfigs.backgroundImage ? 'selected' : ''}`}>
              {image.video ? <PlayCircleFilledTwoToneIcon className={'play-icon'} /> : null}
              {selectedImages.includes(image.id) ?
                <CheckedIcon
                  className={'check-icon'}
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedImages(selectedImages.filter(x => x !== image.id))
                  }}
                /> :
                <UnCheckedIcon
                  className={'check-icon'}
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedImages([...selectedImages, image.id])
                  }}
                />
              }
              <CardMedia component="img" image={image.thumbnail} alt={'background'}/>
            </Card>
          </Grid>
        )}
      </Grid>
  );
};

export default UserImageSelector;