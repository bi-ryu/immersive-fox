import { styled } from '@mui/material/styles';
import {alpha, InputBase} from "@mui/material";
import {colors} from "../../../utils/colors";

export const StyledInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 8,
    backgroundColor: '#22262F',
    fontSize: 16,
    color: 'white',
    padding: '2px 12px',
    '&:focus': {
      boxShadow: `${alpha('#FE6338', 0.5)} 0 0 0 0.1rem`,
    },
    '&::placeholder': { opacity: 0.8, fontSize: 14 },
  },
}));


export const StyledInputArea = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 8,
    backgroundColor: '#22262F',
    fontSize: 16,
    color: 'white',
    padding: '12px 12px 30px 12px',
    '&:focus': {
      boxShadow: `${alpha('#FE6338', 0.6)} 0 0 0 0.08rem`,
    },
    '&::placeholder': { opacity: 0.5, fontSize: 16 },
  },
}));

export const InputLabelStyles = {
  color: colors.darkGray,
  fontSize: '16px',
  fontWeight: 500,
  '&.Mui-focused': {
    color: '#FE6338',
  }
}

export const FormInputError = {
  color: '#cc1717',
  fontSize: '16px',
}
