import {useHistory, useParams} from "react-router-dom";
import axios from "axios";
import {setAuthToken, url} from "../../../utils";
import {useContext} from "react";
import AppContext from "../../../AppContext";

export function VerifyEmail() {
  const {key} = useParams();
  const history = useHistory();
  const {setIsLoading, alertState, setAlertState} = useContext(AppContext);

  axios.post(
    url('/rest-auth/verify-email/'), {'key': key}
  ).then(res => {
    const data = res.data
    if (data && data["access_token"]) {
      setAuthToken(data.access_token, data.refresh_token, data.user.first_name)
      history.push('/avatar')
    }
  }).catch(error => {
    const msg = error.response.data[Object.keys(error.response.data)[0]][0]
    setAlertState({...alertState, open: true, severity: 'error', message: msg})
  }).finally(()  => {
    setIsLoading(false)
  })

  return <></>
}
