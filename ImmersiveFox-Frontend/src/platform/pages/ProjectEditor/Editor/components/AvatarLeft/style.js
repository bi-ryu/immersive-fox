import {colors} from "../../../../../../utils/colors";

export const avatarMainGrid = {
  background: colors.drawerSelected,
  justifyContent: 'center',
  maxHeight: '90vh',
  overflow: 'auto',
  '.avatar-tabs': {
    'h4': {
      fontSize: 18,
      fontWeight: 400,
      paddingBottom: 0.5,
      marginBottom: 2.5,
      color: colors.intenseGray,
    },
    'h4.selected': {
      color: colors.white,
      borderBottom: `2px solid ${colors.orange}`,
    }
  },
  '&.MuiGrid-root': {
    padding: 4,
  },
  'h3': {
    fontSize: 24,
    fontWeight: 700,
    marginBottom: 2.5,
  },
  '& .avatars': {
    overflowY: 'auto',
    textAlign: 'center',
    maxHeight: '50vh',
    'p': {
      fontSize: 16,
    },
    '& p.selected': {
      color: colors.orange,
    },
    '& div.selected': {
      border: `1px solid ${colors.orange}`,
    },
    '& div.avatar-card': {
      border: `1px solid ${colors.drawerSelected}`,
    },
  },
  '.avatar-position': {
    marginTop: 1,
    border: `1px solid ${colors.white2}`,
    borderRadius: 4,
  },
  '& .MuiSlider-thumb': {
    color: colors.white,
    border: `2px solid ${colors.orange}`,
  },
  '& .MuiSlider-track': {
    color: colors.orange,
  },
  '& .MuiSlider-rail': {
    color: colors.slider,
  }
}

export const avatarCard = {
  marginBottom: 1,
  cursor: 'pointer',
  color: colors.white,
  background: colors.white,
  paddingTop: 1,
  aspectRatio: '16/9',
  '& .MuiCardContent-root': {
    padding: 1,
  },
  '& img': {
    objectFit: 'contain',
    height: '100%',
  },
}

export const selectedAvatarGrid = {
  padding: 4,
  paddingRight: 0,
  margin: 0,
  '& .MuiTextField-root': {
    background: colors.drawerSelected,
    border: 'none',
    borderRadius: 2,
  },
  '& .MuiCardMedia-root': {
    background: colors.white,
    borderRadius: 4,
    objectFit: 'cover',
  },
  '& .MuiInputBase-root > textarea': {
    border: `1px solid ${colors.lightWhite}`
  },
  '& .MuiInputBase-root > textarea:focus': {
    border: `1px solid ${colors.drawerSelected}`,
  },
  '& .helper': {
    color: colors.lightWhite,
    marginTop: -5,
    padding: 1,
    zIndex: 1,
  },
  '& .select-color': {
    position: 'absolute',
    bottom: 20,
    left: 20,
    cursor: 'pointer',
  },
}

