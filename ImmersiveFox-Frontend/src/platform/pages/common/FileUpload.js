import * as React from 'react';
import {useDropzone} from "react-dropzone";
import {CircularProgress, Grid} from "@mui/material";
import {colors} from "../../../utils/colors";
import {uploadIcon} from "../../../assets/images";

const style = {
  height: 240,
  width: '100%',
  border: `1px dashed ${colors.blackGray}`,
  borderRadius: 4,
  cursor: 'pointer',
  'h3': {
    fontSize: 16,
    fontWeight: 400,
    maxWidth: 190,
    marginBottom: 2,
    textAlign: 'center',
    lineHeight: 1.4,
  },
  'b':{
    color: colors.orange,
    fontWeight: 400,
  },
}

const FileUpload = (props) => {
  const hiddenFileInput = React.useRef(null);
  const {children, accept, setSelectedFile, onDrop, isUploading, title='Upload a File', ...other} = props

  const { getRootProps, getInputProps } = useDropzone({onDrop})

  const handleClick = event => {
    hiddenFileInput.current.click();
  };

  return (
    <div style={{width: '100%'}} {...getRootProps()} onClick={handleClick}>
      <Grid sx={style} container direction={'column'} justifyContent={'center'}
            alignItems={'center'}>
        {
          isUploading ?
          <CircularProgress thickness={5} size={70} sx={{color: colors.orange}}/> :
          <>
            <img src={uploadIcon} alt={'upload audio'}/>
            <h3 style={{fontWeight: 600, marginTop: 10}}>{title}</h3>
            <h3>
            Click to <b>browse</b>, or drag and drop your file here
            </h3>
          </>
        }
      </Grid>
      <input
        type="file"
        {...other}
        {...{...getInputProps(), accept: accept}}
        ref={hiddenFileInput}
        style={{display:'none'}}
      />
    </div>
  );
};

export default FileUpload;
