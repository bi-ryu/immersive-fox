import * as React from 'react';
import {Backdrop, CircularProgress} from "@mui/material";
import {colors} from "../../../utils/colors";

const Loading = ({open}) => {
  return (
    <Backdrop
      sx={{ color: '#ffffff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
    >
      <CircularProgress thickness={6} size={70} sx={{color: colors.orange}} />
    </Backdrop>
  );
};

export default Loading;
