import {colors} from "../../../../../../utils/colors";

export const avatarBackgroundMainGrid = {
  background: colors.drawerSelected,
  justifyContent: 'center',
  maxHeight: '80vh',
  overflow: 'hidden',
  '.main-container': {
    maxHeight: '60vh',
    overflowY: 'auto',
  },
  '& .color-box': {
    borderRadius: 2,
    aspectRatio: '16/9',
    cursor: 'pointer',
    '& img': {
      objectFit: 'cover',
      cursor: 'pointer',
      height: '100%',
    },
    '& .MuiCard-root': {
      height: '100%',
    },
    '& .selected': {
      border: `2px solid ${colors.orange}`
    }
  },
  '& .color-box.selected': {
    border: `2px solid ${colors.orange}`
  },
  '&.MuiGrid-root': {
    padding: 4,
  },
  'h3': {
    fontSize: 24,
    fontWeight: 700,
    marginBottom: 4,
  },
  '& .background-tab': {
    marginBottom: 4,
    'div': {
      padding: 1,
      color: colors.White2,
    },
    'div.selected': {
      borderBottom: `2px solid ${colors.orange}`,
      color: colors.white,
    },
    'h4': {
      border: 'none',
    },
  },
  '& .image-uploaded': {
    width: '90%',
    maxHeight: 300,
    objectFit: 'contain',
    borderRadius: 2,
    border: `1px solid ${colors.dot}`
  },
  '& .reload-button': {
    textTransform: 'none',
    color: colors.intenseGray,
    border: `1px solid ${colors.intenseGray}`,
    borderRadius: 2,
    height: 48,
    margin: 1,
    marginTop: 2,
    width: '40%',
    minWidth: 80,
    float: 'left',
  },
  '& .reload-button:hover': {
    border: `1px solid ${colors.orange}`,
    color: colors.orange,
  },
  'button.submit': {
    borderRadius: 2,
    margin: 1,
    marginTop: 2,
    height: 48,
    width: '40%',
    minWidth: 80,
    float: 'right',
  },
  'button.add-image': {
    background: 'none',
    color: colors.white,
    fontSize: 16,
  },
  'button.delete-image': {
    background: 'none',
    color: colors.orange,
    fontSize: 16,
  },
  '.img-card': {
    position: 'relative',
  },
  '.check-icon': {
    position: 'absolute',
    left: 1,
    top: 1,
    zIndex: 2,
    cursor: 'pointer',
  },
  '.play-icon': {
    position: 'absolute',
    right: 0,
    bottom: 0,
    zIndex: 2,
  },
}
