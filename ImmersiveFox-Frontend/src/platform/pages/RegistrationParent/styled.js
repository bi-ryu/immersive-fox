import {colors} from "../../../utils/colors";

export const mainGrid = {
  'button, input': {
    height: 48,
    fontSize: 16,
  },
  '& .footer': {
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 400,
    'b': {
      cursor: 'pointer',
      pointerEvents: 'auto',
    }
  },
  '& .error':{
    color: colors.red,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 400,
    margin: 'auto',
    maxWidth: 350,
    lineHeight: 1.5,
  }
}

export const backButtonStyle = {
  position: 'absolute',
  color: colors.white,
  fontSize: 16,
  textTransform: 'none',
  top: 10,
  left: 10
}

export const avatarIcons = {
  float: 'left',
  marginTop: 2,
  marginLeft: 2,
  '& .MuiAvatar-root': {
    border: 'none',
  },
  '& img': {
    width: '35px',
    height: '35px',
  },
  '& + h5': {
    marginTop: 3,
    marginLeft: 20,
  }

}
