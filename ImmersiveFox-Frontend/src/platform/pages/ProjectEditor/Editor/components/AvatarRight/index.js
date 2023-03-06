import * as React from 'react';
import {audioSectionGrid, uploadAudioSection} from "./style";
import {Grid} from "@mui/material";
import {useContext} from "react";
import EditorContext from "../../../EditorContext";
import AudioSection from "./AudioSection";
import {conditionalRender} from "../../../../../../utils";
import SelectVoiceSection from "./SelectVoiceSection";

const AvatarRight = () => {
  const {tab, setTab} = useContext(EditorContext);

  return (
    <Grid sx={audioSectionGrid} item md={4}>
      <Grid sx={uploadAudioSection} container direction={'column'}>
        <Grid container justifyContent={'space-between'}>
          <h2 className={tab === 0 ? 'selected' : ''} onClick={() => setTab(0)}>Select Voice</h2>
          <h2 className={tab === 1 ? 'selected' : ''} onClick={() => setTab(1)}>Upload your Voice</h2>
        </Grid>
        {conditionalRender(tab, <AudioSection/>, <SelectVoiceSection />)}
      </Grid>
    </Grid>
  );
};

export default AvatarRight;
