import {colors} from "../../../../utils/colors";
const drawerWidth = 100;

export const mainBox = {
  display: 'flex',
  '& .MuiToolbar-root': {
    height: `${drawerWidth}px`,
  },
  '& button': {
    float: 'right',
  },
  'h2': {
    color: colors.darkGray,
    fontSize: 18,
    fontWeight: 400,
  },
  'h4': {
    fontSize: 18,
    cursor: 'pointer',
    '&:hover': {
      borderBottom: '2px solid #FE6338',
    }
  },
  'h5': {
    color: colors.darkGray,
    fontSize: 16,
  },
  '.credits-div': {
    marginRight: 2,
    background: colors.drawerSelected,
    borderRadius: 10,
    padding: '10px 25px 10px 25px',
  },
  '.credits': {
    color: colors.white,
    textAlign: 'center',
  },
  'h6.credits': {
    fontSize: 16,
    fontWeight: 600,
  },
  'p.credits': {
    fontSize: 12,
  }
}

export const appBox = {
  width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`,
  background: colors.lightBlack,
  'button': {
    fontSize: 16,
    fontWeight: 700,
    height: 48,
    width: 178,
  },
  '& button.Mui-disabled': {
    backgroundColor: colors.lightOrangeInactive,
    color: colors.grayInactive,
    cursor: 'not-allowed',
    pointerEvents: 'all !important',
  },
  'h3': {
    fontSize: 18,
    fontWeight: 400,
    color: colors.darkGray,
  }
}

export const mainDrawer = {
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    background: colors.drawer,
  },
  '& .MuiPaper-root': {
    border: 'none',
  },
  '& .MuiToolbar-root, & .MuiListItemIcon-root': {
    padding: 0,
    justifyContent: 'center',
  },
  '& .MuiTab-root.Mui-disabled': {
    color: colors.drawerSelected,
  },
  '& .MuiButtonBase-root': {
    color: 'white',
    '&.Mui-selected': {
      borderLeft: `2px solid ${colors.orange}`,
      color: 'white',
      background: colors.drawerSelected,
    }
  },
  '& .logo': {
    width: 30,
    height: 40,
  },
  '& .platform-tabs': {
    width: 20,
    height: 20,
  },
  '& .bottom': {
    position: 'fixed',
    width: 100,
    bottom: '20px',
    left: '0px',
    '& .help': {
      height: 50,
      width: 50,
      margin: '0px auto',
      cursor: 'pointer',
      display: 'block',
      'svg': {
        height: 30,
        width: 50,
      }
    },
    '& .user': {
      margin: '0px auto',
      marginTop: 2,
      border: `1px solid ${colors.orange}`,
      borderRadius: 40,
      height: 50,
      width: 50,
      display: 'block',
      cursor: 'pointer',
      'h5': {
        paddingTop: 1.8,
        color: colors.white,
      }
    },
    'button': {
      textAlign: 'center',
      fontSize: 16,
      padding: 0,
      color: colors.white,
    },
    'button:hover': {
      background: 'none',
    },
  },
}


export const userPopover = {
  '& .MuiPopover-paper': {
    backgroundColor: colors.drawerSelected,
    padding: 2,
  },
  'button': {
    backgroundColor: colors.drawerSelected,
    color: colors.white,
    fontSize: 14,
  },
  'button:hover': {
    backgroundColor: colors.drawerSelected,
  }
}
