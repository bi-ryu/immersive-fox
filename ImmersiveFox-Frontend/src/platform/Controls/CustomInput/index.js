import * as React from 'react';
import {FormControl, FormHelperText, InputLabel} from "@mui/material";
import {FormInputError, InputLabelStyles, StyledInput, StyledInputArea} from "./styled";

const CustomInput = (props) => {
  const {name, label, value, onChange, error, fullWidth=false, textArea, ...other} = props

  return (
    <FormControl variant="standard" fullWidth={fullWidth}>
      <InputLabel id={`label-${name}`} sx={InputLabelStyles} shrink htmlFor={'input-label'}>
        {label}
      </InputLabel>
      {
        textArea ?
        <StyledInputArea
          onFocus={(e) => e.target.placeholder = ''}
          onBlur={(e) => e.target.placeholder = other.placeholder}
          autoComplete='off' id={name} name={name} value={value} onChange={onChange} {...other}
        /> :
        <StyledInput autoComplete='off' id={name} name={name} value={value} onChange={onChange} {...other} />
      }
      <FormHelperText sx={FormInputError} id={`helper-${name}`}>
        {error || ''}
      </FormHelperText>
    </FormControl>
  );
}

export default CustomInput;
