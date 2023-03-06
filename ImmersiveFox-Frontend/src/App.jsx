import React, {useEffect, useState} from "react";
import {Route, Switch} from "react-router-dom";
import {Grid, Modal} from "@mui/material";
import AOS from "aos";
import {platformRoutes} from "./platform/routes";
import DevLogin from "./platform/pages/common/DevLogin";
import Loading from "./platform/pages/common/Loading";
import AppSnackbar from "./platform/pages/common/Snackbar";
import {colors} from "./utils/colors";
import { MainNavigation } from "./navigation/blocks";
import initialiseInterceptors from "./Intercepters";
import AppContext, {initialValues} from "./AppContext";
import {Logo} from "./assets/icons";
import {logoMini} from "./assets/images";
import "aos/src/sass/aos.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const App = () => {
  initialiseInterceptors()
  const [isLoading, setIsLoading] = useState(false);
  const [isModelOpen, setModelOpen] = useState(true);
  const [alertState, setAlertState] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const contextValues = {
    setIsLoading: setIsLoading,
    isLoading: isLoading,
    alertState: alertState,
    setAlertState: setAlertState,
  }

  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setModelOpen(false);
    }, 2000)
    return () => clearTimeout(timer);
  }, [])

  return (
    <AppContext.Provider value={{...initialValues, ...contextValues}}>
      <Switch>
        {platformRoutes.map((route, index) => <Route key={index} {...route}/>)}
        <Route path='*' exact={true} component={MainNavigation}/>
      </Switch>
      <Loading open={isLoading}/>
      <DevLogin />
      <AppSnackbar alertState={alertState} setAlertState={setAlertState} />
      <Modal style={{background: colors.blackGray}} open={isModelOpen}>
        <Grid style={{width: '100vw', height: '100vh'}} container direction={'column'} alignItems={'center'} justifyContent={'center'}>
          <img style={{marginBottom: 20}} src={logoMini} data-aos={'zoom-in'} data-aos-duration={'1800'} alt={'logo'}/>
          <Logo />
        </Grid>
      </Modal>
    </AppContext.Provider>
  );
};

export default App;
