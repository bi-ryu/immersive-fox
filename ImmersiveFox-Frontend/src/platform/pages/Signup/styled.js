import {colors} from "../../../utils/colors";

export const dialogBox = {
  'h1': {
    fontSize: 36,
    fontWeight: 600,
  }
}

export const dialogGrid = {
  background: colors.model,
  padding: 5,
  color: 'white',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  lineHeight: 1.8,
  '& p': {
    color: colors.white8,
    fontSize: 20,
  },
  '& p.bottom': {
    color: colors.white8
  },
  '& b.click': {
    cursor: 'pointer',
    pointerEvents: 'auto',
    color: colors.orange,
  },
  '& span': {
    color: colors.orange,
  }
}
