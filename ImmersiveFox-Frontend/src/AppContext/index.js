import React from 'react';
import {isUserLoggedIn} from "../utils";

const AppContext = React.createContext();

export const initialValues = {
  isUserLoggedIn: isUserLoggedIn(),
}

export default AppContext;
