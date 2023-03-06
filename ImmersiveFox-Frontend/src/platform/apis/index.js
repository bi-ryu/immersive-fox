import axios from 'axios';
import {setAuthToken, setDevToken, url} from '../../utils';

const handleApiRequest = (promise, onSuccess, onFailure, setLoading) => {
  setLoading(true)
  promise.then(res => {
    onSuccess(res)
  }).catch(error => {
    let msg = 'Error'
    if (![500, 401].includes(error.response.status)) {
      msg = error.response.data[Object.keys(error.response.data)[0]]
      if (Object.prototype.toString.call(msg) === '[object Array]') {
        msg = msg[0]
      }
    }
    onFailure(msg, error)
  }).finally(() => {
    setLoading(false)
  })
}

export const userLogin = (data, onSuccess, onFailure, setLoading) => {
  const customOnSuccess = (res) => {
    const data = res.data
    setAuthToken(data.access_token, data.refresh_token, data.user.first_name, data.user.email)
    onSuccess(res)
  }

  handleApiRequest(
    axios.post(url('/rest-auth/login/'), {...data, email: data.email.toLowerCase()}),
    customOnSuccess,
    onFailure,
    setLoading,
  )
}

export const userSignUp = (data, onSuccess, onFailure, setLoading) => {
  handleApiRequest(
    axios.post(url('/rest-auth/registration/'), data),
    onSuccess,
    onFailure,
    setLoading,
  )
}

export const sendEmailVerification = (data, onSuccess, onFailure, setLoading) => {
  handleApiRequest(
    axios.post(url('/rest-auth/resend-confirmation-email/'), data),
    onSuccess,
    onFailure,
    setLoading,
  )
}

export const resetPassword = (data, onSuccess, onFailure, setLoading) => {
  handleApiRequest(
    axios.post(url('/rest-auth/password/reset/'), data),
    onSuccess,
    onFailure,
    setLoading,
  )
}

export const resetPasswordConfirm = (data, onSuccess, onFailure, setLoading) => {
  handleApiRequest(
    axios.post(url('/rest-auth/password/reset/confirm/'), data),
    onSuccess,
    onFailure,
    setLoading,
  )
}

export const sendVideoGenerationRequest = (data, onSuccess, onFailure, setLoading) => {
  handleApiRequest(
    axios.post(url('/generate_video_request/'), data),
    onSuccess,
    onFailure,
    setLoading,
  )
}

export const videoGenerationRequests = (offset, onSuccess, onFailure, setLoading) => {
  handleApiRequest(
    axios.get(url(`/generate_video_request/get_user_requests/?limit=${100}&offset=${offset}`)),
    onSuccess,
    onFailure,
    setLoading,
  )
}

export const getAvatars = (onSuccess, onFailure, setLoading, user_avatars=false) => {
  handleApiRequest(
    axios.get(url(`/avatar/?user_avatar=${user_avatars}`)),
    onSuccess,
    onFailure,
    setLoading,
  )
}

export const devLogin = (data, onSuccess, onFailure, setLoading) => {
  const handleOnSuccess = (res) => {
    setDevToken()
    onSuccess(res)
  }

  handleApiRequest(
    axios.post(url('/dev_login'), data),
    handleOnSuccess,
    onFailure,
    setLoading,
  )
}


export const generateTextToAudio = (data, onSuccess, onFailure, setLoading) => {
  handleApiRequest(
    axios.post(url('/generate_audio/'), data),
    onSuccess,
    onFailure,
    setLoading,
  )
}

export const generateTextToDescriptAudio = (data, onSuccess, onFailure, setLoading) => {
  handleApiRequest(
    axios.post(url('/generate_descript_audio/'), data),
    onSuccess,
    onFailure,
    setLoading
  )
}

export const getVoices = (onSuccess, onFailure, setLoading) => {
  handleApiRequest(
    axios.get(url('/text_to_audio_voices/')),
    onSuccess,
    onFailure,
    setLoading,
  )
}


export const getSignedUrl = (blob, onSuccess, onFailure, setLoading) => {
  handleApiRequest(
    axios.get(url(`/play/${blob}/`)),
    onSuccess,
    onFailure,
    setLoading,
  )
}

export const getShareableUrl = (blob, onSuccess, onFailure, setLoading) => {
  handleApiRequest(
    axios.get(url(`/get_shareable_url/?id=${blob}`)),
    onSuccess,
    onFailure,
    setLoading,
  )
}

export const updateVideoOpenedCounts = (data, onSuccess, onFailure, setLoading) => {
  handleApiRequest(
    axios.post(url(`/update_video_opened_counts/`),data),
    onSuccess,
    onFailure,
    setLoading
  )
} 

export const saveUserBackgroundImages = (data, onSuccess, onFailure, setLoading) => {
  handleApiRequest(
    axios.post(url(`/generated_video_config/user_avatar_background_images/`), data),
    onSuccess,
    onFailure,
    setLoading,
  )
}

export const deleteUserBackgroundImages = (data, onSuccess, onFailure, setLoading) => {
  handleApiRequest(
    axios.post(url(`/generated_video_config/user_avatar_background_images/bulk_delete/`), data),
    onSuccess,
    onFailure,
    setLoading,
  )
}


export const getUploadLink = (data, onSuccess, onFailure, setLoading, folder=null) => {
  let path = `/get_signed_url/?file_name=${data.name}&content_type=${data.type}`
  if (folder) {
    path = `${path}&folder=${folder}`
  }
  handleApiRequest(
    axios.get(url(path)),
    onSuccess,
    onFailure,
    setLoading,
  )
}


export const uploadToBucket = (signed_url, data, onSuccess, onFailure, setLoading) => {
  setLoading(true)
  axios.put(
    signed_url, data, {headers: {'Content-Type': data.type, 'ORIGIN': '*'}}
  ).catch(error => {
    let msg = 'Error'
    onFailure(msg, error)
  }).then(res => {
    onSuccess(res)
    setLoading(false)
  }).finally(res => {
    setLoading(false)
  })
}
