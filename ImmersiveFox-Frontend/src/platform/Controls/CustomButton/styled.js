import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import {colors} from "../../../utils/colors";


export const StyledButton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 16,
  fontWeight: 700,
  color: 'white',
  borderRadius: 8,
  backgroundColor: colors.orange,
  '&:hover': {
    backgroundColor: colors.buttonHover,
  }
});
