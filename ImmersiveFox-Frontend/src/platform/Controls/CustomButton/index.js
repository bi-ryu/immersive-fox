import * as React from 'react';
import {StyledButton} from './styled'

const CustomButton = (props) => {
  const {children, ...other} = props
  return <StyledButton {...other}>{children}</StyledButton>
}

export default CustomButton;
