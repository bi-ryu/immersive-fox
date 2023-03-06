import * as React from 'react';
import {Alert, Snackbar} from "@mui/material";

const AppSnackbar = ({alertState, setAlertState}) => {
  const handleAlertClose = () => {
    setAlertState({...alertState, open: false})
  }

  return (
    <Snackbar
      open={alertState.open}
      autoHideDuration={4000}
      onClose={handleAlertClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
        <Alert severity={alertState.severity}>
          {alertState.message}
        </Alert>
    </Snackbar>
  );
}

export default AppSnackbar;
