import {colors} from "../../../../utils/colors";

export const videoCard = {
  '& .video-grid': {
    margin: 1.5,
    backgroundColor: colors.drawer,
    minWidth: 264,
    'h3': {
      fontSize: 16,
      fontWeight: 600,
      lineHeight: 1.6,
    },
    'h5': {
      fontSize: 14,
      fontWeight: 400,
    },
    border: `2px solid ${colors.drawer}`,
    '& .video-card': {
      position: 'relative',
      aspectRatio: '16/9',
      paddingTop: 1.5,
    },
    borderRadius: 4,
    overflow: 'hidden',
  },
  '& .video-grid:hover': {
    border: `2px solid ${colors.orange}`,
  },
  'a': {
    color: colors.white,
  },
  '& .download-icon': {
    position: 'absolute',
    right: 10,
    top: 10,
    zIndex: 2,
    cursor: 'pointer',
    width: 32,
    height: 32,
  },
  '& .share-icon': {
    position: 'absolute',
    right: 50,
    top: 10,
    zIndex: 2,
    cursor: 'pointer',
    width: 32,
    height: 32,
  },
  '& img': {
    objectFit: 'contain',
    height: '100%',
    cursor: 'pointer',
  },
  '& .loading-img': {
    webkitFilter: 'grayscale(100%)',
    filter: 'grayscale(100%)',
  },
  '& .MuiPaper-root': {
    backgroundColor: colors.drawer,
    color: colors.white,
  },
  '& .MuiLinearProgress-root': {
    backgroundColor: colors.grayInactive,
    borderRadius: 2,
    marginBottom: 0.5,
  },
  '& .MuiLinearProgress-bar': {
    backgroundColor: colors.orange,
  },
}

export const savedLabel = {
  padding: 4,
  'h1': {
    fontSize: 28,
    fontWeight: 600,
  },
}

export const emptyCard = {
  height: '60vh',
  'div': {
    padding: 4,
    background: colors.lightBlack,
  },
  'h1': {
    fontSize: 16,
    fontWeight: 500,
    lineHeight: 1.6,
    width: 240,
    textAlign: 'center',
  },
  '.logo': {
    height: 60,
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 2,
  }
}