import {colors} from "../../../../utils/colors";

export const playerGrid = {
  background: colors.drawerSelected,
  borderRadius: 2,
  '.audio-play-button': {
    padding: 0.5,
    paddingLeft: 2,
  },
  '.text-button': {
    fontSize: 18,
    color: colors.white,
    cursor: 'none',
    border: 'none',
  },
  '.selected': {
    marginRight: 2,
  },
  '.audio-slider': {
    margin: 0,
    paddingLeft: 0.5,
    paddingRight: 0.5,
  },
  '& .MuiSlider-root': {
    padding: 0,
  },
  '& .MuiSlider-thumb': {
    width: 8,
    height: 8,
    backgroundColor: colors.orange,
  },
  '& .MuiSlider-track': {
    backgroundColor: colors.orange,
    height: 5,
  },
  '& .MuiSlider-rail': {
    backgroundColor: colors.slider,
  },
  '& .play-button': {
    cursor: 'pointer',
    width: 40,
    height: 40,
    color: '#626A73',
  },
  '& .timer': {
    color: colors.slider,
    fontSize: 14,
    float: 'right',
    marginTop: -0.6,
  },
  '& .MuiSlider-valueLabel': {
    borderRadius: 2,
    background: '#626A73'
  }
}