import * as React from 'react';
import { Grid } from "@mui/material";
import Slider from '@mui/material/Slider';
import { useContext } from "react";
import { Popover } from 'react-tiny-popover'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@mui/material/TextField';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import EditorContext from "../../../EditorContext";
import { AvatarUserIcon, Center, Circle, Left, Right, SmallArrow } from "../../../../../../assets/icons";
import { colors } from "../../../../../../utils/colors";
import ColorSelector from "./ColorSelector";

const mainContainer = {
  padding: 1,
  '.tabs': {
    padding: 1,
    '.tab': {
      padding: 1,
      borderRadius: 2,
      color: colors.white,
      cursor: 'pointer',
    },
    '.tab.selected': {
      background: colors.lightBlack,
    },
  },
  '.border-top': {
    borderBottom: 'none',
  },
}

const useStyles = makeStyles({
  layoutMain: {
    marginTop: 30,
  },
  layoutTitle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    "& span": {
      fontFamily: "Poppins",
      fontStyle: "normal",
      fontWeight: "400",
      fontSize: "18px",
      color: "#F2F2F2"
    },
    "& button": {
      width: "40px",
      height: "40px",
      background: "#2D3139",
      borderRadius: "8px",
      border: "unset",
      color: "#626A73",
      display: "grid",
      placeItems: "center",
      cursor: "pointer",
    }
  },
  LayoutInput: {
    marginTop: "16px",
  },
  customLayoutInput: {
    background: '#2D3139',
    height: 48,
    padding: 0,
    borderRadius: 8,
    "& ::before": {
      display: "none",
    },
    "& ::after": {
      display: "none",
    },
    "& span.layout-span": {
      color: "#626A73",
      fontFamily: "Poppins",
      fontStyle: "normal",
      fontWeight: "400",
      fontSize: "16px",
    },
    "& input": {
      height: 48,
      padding: 0,
      margin: '0 15px',
      textAlign: 'right',
      color: "#F2F2F2",
      fontFamily: "Poppins",
      fontStyle: "normal",
      fontWeight: "400",
      fontSize: "16px",
    },
  },
});

const tabs = [
  { label: 'Left', value: 'left' },
  { label: 'Center', value: 'center' },
  { label: 'Right', value: 'right' },
  { label: 'Moved', value: 'moved'}
]

const tabsIcons = {
  'left': (onClick) => <Left style={{ cursor: 'pointer' }} onClick={onClick} />,
  'center': (onClick) => <Center style={{ cursor: 'pointer' }} onClick={onClick} />,
  'right': (onClick) => <Right style={{ cursor: 'pointer' }} onClick={onClick} />,
  'empty': (onClick) => <Center style={{ cursor: 'pointer' }} onClick={onClick} />,
  'moved': (onClick) => <></>
}

const shapeTabs = [
  { label: 'Full body', value: 'original' },
  { label: 'Circle', value: 'circle' },
]

const AvatarPosition = (props) => {
  const classes = useStyles();
  const {
    avatarPositionTab, setAvatarPositionTab, avatarSize,
    setAvatarSize, setAvatarShape, avatarShape, requestConfigs, avatarWidth, avatarHeight, avatarOffsetX, avatarOffsetY
  } = useContext(EditorContext);

  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
  const [avatarPositionPopover, setAvatarPositionPopover] = React.useState(false);

  return (
    <Grid sx={mainContainer} container justifyContent={'center'}>
      <Grid item xs={12} style={{ borderBottom: `1px solid ${colors.lightWhite}` }}></Grid>
      <Grid className={'tabs'} container justifyContent={'space-evenly'} >
        {
          shapeTabs.map((tab, index) =>
            <Grid
              item
              key={index}
              className={`tab ${avatarShape === tab.value ? 'selected' : ''}`}
              onClick={() => {
                setAvatarShape(tab.value)
              }}
            >
              {tab.label}
            </Grid>
          )
        }
      </Grid>
      <Grid item xs={10} style={{ borderBottom: `1px solid ${colors.lightWhite}`, marginBottom: 10 }}></Grid>
      <Grid className={'slider'} container justifyContent={'space-between'} alignContent={'center'} >
        {avatarShape === 'circle' ?
          <Popover
            isOpen={isPopoverOpen}
            positions={['top']}
            padding={15}
            onClickOutside={() => setIsPopoverOpen(false)}
            content={<div style={{ background: colors.lightBlack, borderRadius: 10, marginLeft: 104 }}>
              <ColorSelector isCircleBackground={true} />
            </div>}
          >
            <Grid item xs={1.5} container style={{ background: colors.position, borderRadius: 5, padding: 10, cursor: 'pointer' }} justifyContent={'center'} alignContent={'center'} onClick={() => setIsPopoverOpen(!isPopoverOpen)}>
              <div style={{ borderRadius: '50%', padding: 10, background: requestConfigs.circleBackground }} >
              </div>
            </Grid>
          </Popover>
          : null
        }
        <Grid item xs={avatarShape === 'circle' ? 8 : 10} style={{ background: colors.position, borderRadius: 5, padding: 5 }} container alignContent={'center'} justifyContent={'space-between'}>
          <Grid item xs={1} container alignContent={'center'}>
            {avatarShape === 'circle' ? <Circle style={{ width: 14, height: 14 }} /> : <AvatarUserIcon style={{ width: 16, height: 16 }} />}
          </Grid>
          <Grid item container xs={8} alignContent={'center'}>
            <Slider
              size="small"
              defaultValue={avatarSize}
              aria-label="Small"
              valueLabelDisplay="auto"
              value={avatarSize}
              onChange={(e) => {
                setAvatarSize(e.target.value)
              }}
            />
          </Grid>
          <Grid item xs={1} container alignContent={'center'}>
            {avatarShape === 'circle' ? <Circle /> : <AvatarUserIcon />}
          </Grid>
        </Grid>
        <Grid item xs={1.8} container style={{ background: colors.position, borderRadius: 5, cursor: 'pointer' }} justifyContent={'center'} alignContent={'center'} onClick={() => setAvatarPositionPopover(true)}>
          <Popover
            isOpen={avatarPositionPopover}
            positions={['bottom']}
            padding={15}
            onClickOutside={() => setAvatarPositionPopover(false)}
            content={
              <Grid container direction={'column'} style={{ background: colors.lightBlack, padding: 10, borderRadius: 5 }}>
                {
                  tabs.map(tab =>
                    tabsIcons[tab.value](() => setAvatarPositionTab(tab.value))
                  )
                }
              </Grid>
            }
          >
            <Grid style={{ cursor: 'pointer' }} container justifyContent={'center'} alignContent={'center'} alignItems={'center'}>
              {tabsIcons[avatarPositionTab](() => { })}
              <SmallArrow style={{ transform: avatarPositionPopover ? 'rotate(0deg)' : 'rotate(180deg)' }} />
            </Grid>
          </Popover>
        </Grid>
      </Grid>
      <div className={classes.layoutMain}>
        <div className={classes.layoutTitle}>
          <span>Layout</span>
          <button>
            <InsertLinkIcon />
          </button>
        </div>
        <div className={classes.LayoutInput}>
          <Grid container item xs={12} justifyContent={'space-between'} rowGap={1} spacing={1}>
            <Grid item xs={12} md={6}>
              <TextField
                className={classes.customLayoutInput}
                InputProps={{
                  startAdornment: (
                    <span className='layout-span'>X</span>
                  ),
                }}
                variant="filled"
                value={parseFloat(avatarOffsetX).toFixed(0) + " px"}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                className={classes.customLayoutInput}
                InputProps={{
                  startAdornment: (
                    <span className='layout-span'>Y</span>
                  ),
                }}
                variant="filled"
                value={ parseFloat(avatarOffsetY).toFixed(0) + " px"}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                className={classes.customLayoutInput}
                InputProps={{
                  startAdornment: (
                    <span className='layout-span'>Width</span>
                  ),
                }}
                value={parseFloat(avatarWidth).toFixed(0) + " px"}
                variant="filled"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                className={classes.customLayoutInput}
                InputProps={{
                  startAdornment: (
                    <span className='layout-span'>Height</span>
                  ),
                }}
                value={parseFloat(avatarHeight).toFixed(0) + " px"}
                variant="filled"
              />
            </Grid>
          </Grid>
        </div>
      </div>
    </Grid>
  );
};

export default AvatarPosition