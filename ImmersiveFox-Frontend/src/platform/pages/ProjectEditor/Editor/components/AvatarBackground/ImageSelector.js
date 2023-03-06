import * as React from 'react';
import {useContext} from "react";
import EditorContext from "../../../EditorContext";
import useAxios from "axios-hooks";
import {url} from "../../../../../../utils";
import {Card, CardMedia, Grid} from "@mui/material";

const ImageSelector = () => {
  const {requestConfigs, setRequestConfigs} = useContext(EditorContext);

  const [{ data: images }] = useAxios(
    {url: url(`/generated_video_config/avatar_background_images/`)}
  )

  return (
    <Grid className={'main-container'} container justifyItems='center' rowGap={1} spacing={1}>
      {(images || []).map((image, index) =>
        <Grid
          xs={3} item key={index.toString()}
          style={{padding: 4}}
          onClick={() => setRequestConfigs({
            ...requestConfigs,
            backgroundImage: image.image,
            backgroundThumbnail: image.thumbnail,
          })}
          className={`color-box`}>
          <Card elevation={0} className={image.image === requestConfigs.backgroundImage ? 'selected' : ''}>
            <CardMedia component="img" image={image.thumbnail} alt={'background'}/>
          </Card>
        </Grid>
      )}
    </Grid>
  );
};

export default ImageSelector;