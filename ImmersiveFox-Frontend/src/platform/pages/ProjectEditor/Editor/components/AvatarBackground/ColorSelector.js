import * as React from 'react';
import {Grid} from "@mui/material";
import {useContext} from "react";
import useAxios from "axios-hooks";
import EditorContext from "../../../EditorContext";
import {url} from "../../../../../../utils";

const ColorSelector = ({isCircleBackground=false}) => {
  const {requestConfigs, setRequestConfigs} = useContext(EditorContext);

  const [{ data: colors }] = useAxios(
    {url: url(`/generated_video_config/avatar_background_colors/`)}
  )

  return (
    <Grid container justifyItems='center' rowGap={1} spacing={1}>
      {(colors || []).map((color, index) =>
        <Grid
          xs={3} item key={index.toString()}
          onClick={() => setRequestConfigs(
              isCircleBackground ?
                {
                  ...requestConfigs,
                  circleBackground: color.color,
                } :
                {
                  ...requestConfigs,
                  background: color.color,
                  backgroundImage: null,
                }
          )}
        >
          <div className={`color-box ${color.color === requestConfigs.background ? 'selected' : ''}`}
               style={{background: color.color, width: '100%', color: color.color}}
          >.</div>
        </Grid>
      )}
    </Grid>
  );
};

export default ColorSelector;