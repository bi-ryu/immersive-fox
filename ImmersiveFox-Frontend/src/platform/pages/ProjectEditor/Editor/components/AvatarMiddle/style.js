import {colors} from "../../../../../../utils/colors";

export const popoverBox = {
  width: '34%',
  height: '30%',
  marginLeft: -20,
  marginTop: 15,
  backgroundColor: 'transparent',
  boxShadow: "none",
  scroll: 'hidden',
}


export const arrowBox = {
  position: "relative",
  mt: "15px",
  "&::before": {
    backgroundColor: colors.model,
    content: '""',
    display: "block",
    position: "absolute",
    width: 14,
    height: 14,
    top: -6,
    transform: "rotate(45deg)",
    left: "calc(6% - 2px)"
  }
}

export const backgroundColorsSelector = {
  background: colors.model,
  padding: 1,
  borderRadius: 4,
  height: 230,
  overflowY: 'auto',
  zIndex: 1,
  color: colors.white,
  '& .color-box': {
    margin: 0.8,
    width: 64,
    height: 64,
    borderRadius: 5,
    cursor: 'pointer',
  },
  '& .color-box.selected': {
    border: `2px solid ${colors.orange}`
  },
}