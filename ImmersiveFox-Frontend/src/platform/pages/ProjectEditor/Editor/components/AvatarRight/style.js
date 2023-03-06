import {colors} from "../../../../../../utils/colors";

export const audioSectionGrid = {
  padding: 2,
  paddingLeft: 4,
  paddingTop: 4,
  minWidth: 400,
  maxHeight: 600,
}

export const selectVoiceSection = {
  background: colors.lightBlack,
  borderRadius: 2,
  padding: 1,
  maxHeight: '68vh',
  overflowY: 'auto',
  '& .voice': {
    background: colors.drawerSelected,
    borderRadius: 2,
    padding: 2,
    margin: 0,
    marginBottom: 1,
    cursor: 'pointer',
    minHeight: 60,
  },
  '& .voice-name': {
    fontSize: 16,
    lineHeight: 2.4,
  },
  'button': {
    fontSize: 14,
    fontWeight: 400,
    maxHeight: 50,
    minWidth: 72,
    border: `1px solid ${colors.white}`,
    background: colors.drawerSelected,
  },
  'button.selected': {
    background: colors.orange,
    border: `1px solid ${colors.orange}`,
  },
  '& .play-icon': {
    cursor: 'pointer',
    height: 40,
    width: 40,
  },
}

export const uploadAudioSection = {
  border: `1px solid ${colors.blackGray}`,
  background: colors.lightBlack,
  borderRadius: 2,
  padding: 2,
  paddingBottom: 0,
  height: '80vh',
  minHeight: 600,
  'div': {
    marginTop: 1,
    marginBottom: 1,
  },
  'h1': {
    fontSize: 20,
    fontWeight: 400,
    color: colors.white,
    margin: 2,
  },
  'h2': {
    fontSize: 18,
    cursor: 'pointer',
    color: colors.White2,
    paddingBottom: 1,
  },
  '& h2.selected': {
    fontWeight: 700,
    color: colors.white,
    borderBottom: `2px solid ${colors.orange}`
  },
  'h4': {
    fontSize: 16,
    fontWeight: 500,
    color: colors.orange,
    textAlign: 'center',
    padding: 1,
    lineHeight: 1.4,
  },
  'h5': {
    fontSize: 14,
    fontWeight: 400,
    color: colors.darkGray,
  },
  'b':{
    color: colors.orange,
  },
  '& .selected-file': {
    'h3': {
      textAlign: 'center',
      color: colors.orange,
    },
    'button.reload': {
      textTransform: 'none',
      color: colors.intenseGray,
      border: `1px solid ${colors.intenseGray}`,
      borderRadius: 2,
      height: 48,
      marginTop: 1,
      width: '48%',
      float: 'left',
    },
    'button.reload:hover': {
      border: `1px solid ${colors.orange}`,
      color: colors.orange,
    },
    'button.submit': {
      borderRadius: 2,
      height: 48,
      marginTop: 1,
      width: '48%',
      float: 'right',
    },
  },
  '& .audio-selected': {fontSize: 14, maxWidth: 400, color: colors.orange},
  '& .select-audio': {fontSize: 14, maxWidth: '95%'},
}

export const selectAudioSection = {
  background: colors.lightBlack,
  borderRadius: 2,
  '& .voice': {
    background: colors.drawerSelected,
    borderRadius: 2,
    padding: 2,
  },
  '& .file-name': {
    fontSize: 16,
    paddingTop: '4%',
  },
  'button': {
    fontSize: 14,
    fontWeight: 400,
    border: `1px solid ${colors.orange}`,
    background: colors.drawerSelected,
  },
  'button.selected': {
    background: colors.orange,
  },
  '& .trash-icon': {
    float: 'right',
    cursor: 'pointer',
  },
  '.my-audio': {
    background: 'none',
    border: 'none',
    cursor: 'text',
    fontSize: 16,
  }
}
