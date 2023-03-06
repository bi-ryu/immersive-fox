import {colors} from "../../../utils/colors";

export const mainBox = {
  lineHeight: 1.5,
  '& h1': {
    fontWeight: 600,
    fontSize: '36px',
  },
  '& h5': {
    color: colors.subtitle,
    marginBottom: 2,
    fontWeight: 400,
    fontSize: '16px',
  },
  '& .forgot-password': {
    textAlign: 'right',
    color: colors.subtitle,
    cursor: 'pointer',
    fontSize: 14,
  },
}
