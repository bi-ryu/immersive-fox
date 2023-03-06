import * as React from 'react';
import {Grid} from "@mui/material";
import {avatarBackgroundMainGrid} from "./style";
import {useContext} from "react";
import ColorSelector from "./ColorSelector";
import ImageSelector from "./ImageSelector";
import EditorContext from "../../../EditorContext";
import UserImageSelector from "./UserImageSelector";

const tabs = [
  {label: 'Color', value: 'color'},
  {label: 'Image', value: 'image'},
  {label: 'Upload', value: 'image-upload'},
]

const tabComponents = {
  'color': <ColorSelector />,
  'image': <ImageSelector />,
  'image-upload': <UserImageSelector />,
}

const AvatarBackground = () => {
  const {requestConfigs, setRequestConfigs, avatarBackgroundTab, setAvatarBackgroundTabTab} = useContext(EditorContext);

  return (
    <Grid sx={avatarBackgroundMainGrid} item md={3}>
      <Grid item xs={12}>
        <h3>Background</h3>
      </Grid>
      <Grid className='background-tab' container direction={'row'}>
        {
          tabs.map(tab => {
            return (
              <Grid key={tab.value} className={tab.value === avatarBackgroundTab ? 'selected' : ''}
                    onClick={() => {
                      setRequestConfigs({...requestConfigs, backgroundType: tab.value})
                      setAvatarBackgroundTabTab(tab.value)
                    }}>
                <h4>{tab.label}</h4>
              </Grid>
            )
          })
        }
      </Grid>
      {tabComponents[avatarBackgroundTab]}
    </Grid>
  );
};

export default AvatarBackground;
