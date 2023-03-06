import * as React from 'react';
import {
  AppBar, Avatar, Box, Drawer,
  Grid, Popover, Tab, Tabs, Toolbar,
} from "@mui/material";
import {logoMini} from "../../../../assets/images";
import {appBox, mainBox, mainDrawer, userPopover} from "./style";
import {useHistory} from "react-router-dom";
import {getNameAlphabets, isUserLoggedIn, logOutUser, url} from "../../../../utils";
import Button from "@mui/material/Button";
import {useEffect, useState} from "react";
import {AvatarBackgroundIcon, Deadline, Help, Logout, AvatarUserIcon, SavedIcon} from "../../../../assets/icons";
import HelpModel from "../../common/HelpModel";
import {profileFirstName} from "../../../../utils/constants";
import useAxios from "axios-hooks";

const tabs = [
  {icon: <AvatarUserIcon />, label: 'Avatar', value: 'avatar', url: '/avatar'},
  {icon: <AvatarBackgroundIcon />, label: 'Background', value: 'background', url: '/avatar'},
  {icon: <SavedIcon />, label: 'Saved', value: 'saved', url: '/saved'},
]

const BasePage = (props) => {
  const {rightComponents, leftComponents, tabValue, tabOnChange} = props
  const [helpModel, setHelpModel] = useState(false);
  const history = useHistory();
  const name = localStorage.getItem(profileFirstName) || 'U';

  const login = () => {
    history.push('/login')
  }

  const savedPage = window.location.pathname.includes('/saved')

  const [{data: remainingCredits}, refetchCredits] = useAxios(url(`/accounts/users/get_remaining_credits/`))

  useEffect(() => {
   refetchCredits()
  }, [refetchCredits])

  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const logout = () => {
    logOutUser()
    history.push('/login')
  }

  return (
    <Box sx={mainBox}>
      <AppBar elevation={0} position="fixed" sx={appBox}>
        <Toolbar>
          <Grid container direction='row' alignItems={'center'} justifyContent={'space-between'}>
            {leftComponents || <span/>}
            <Box>
              {
                !isUserLoggedIn() ?
                <h4 onClick={login}>Login</h4> :
                <Grid key={'credits'} container direction={'row'} alignItems={'center'}>
                  <Grid className='credits-div' item justifyContent="center" alignContent="center">
                    <Grid container justifyContent="center" alignContent="center">
                      <Grid item style={{marginRight: 10}}>
                        <h6 className='credits'>{remainingCredits ? remainingCredits.credits : '-'}</h6>
                        <p className='credits'>minutes</p>
                      </Grid>
                      <Grid item>
                        <Deadline />
                      </Grid>
                    </Grid>
                  </Grid>
                  {rightComponents}
                </Grid>
              }
            </Box>
          </Grid>
        </Toolbar>
      </AppBar>
      <Drawer sx={mainDrawer} variant="permanent" anchor="left">
        <Toolbar>
          <Avatar className='logo' variant={'square'} src={logoMini}/>
        </Toolbar>
        <Tabs
          TabIndicatorProps={{style: {display: "none",}}}
          orientation={'vertical'}
          value={tabValue}
          aria-label="tabs"
        >
          {tabs.map((tab, key) =>
            <Tab
              key={key}
              icon={tab.icon}
              label={tab.label}
              value={tab.value}
              disabled={savedPage && tab.value === 'background'}
              onClick={() => {
                tabOnChange(tab.value)
                history.push(tab.url)
              }}
            />
          )}
        </Tabs>
        <Grid container direction={'column'} className={'bottom'}>
          <Grid container justifyContent={'center'} alignContent={'center'} className={'help'}>
            <Help onClick={() => {setHelpModel(true)}}/>
          </Grid>
          <Grid container justifyContent={'center'} alignContent={'center'} className={'user'}>
            <Grid container justifyContent={'center'} alignContent={'center'} onClick={handleClick}>
              <h5>{getNameAlphabets(name)}</h5>
            </Grid>
            <Popover
              sx={userPopover}
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              style={{marginLeft: 12}}
              anchorOrigin={{
                vertical: 'center',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'center',
                horizontal: 'left',
              }}
            >
              <Button startIcon={<Logout />} onClick={logout}>logout</Button>
            </Popover>
          </Grid>
        </Grid>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1 }}
      >
        <Toolbar/>
        {props.children}
      </Box>
      <HelpModel isOpen={helpModel} setOpen={setHelpModel}/>
    </Box>
  );
}

export default BasePage;
