import React, {useContext, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {Card, CardContent, CardMedia, Grid, LinearProgress, Tooltip} from "@mui/material";
import copy from 'copy-to-clipboard';
import BasePage from "../BasePage";
import {getShareableUrl, getSignedUrl, videoGenerationRequests} from "../../../apis";
import AppContext from "../../../../AppContext";
import {conditionalRender, isUserLoggedIn} from "../../../../utils";
import EmptyCard from "./EmptyCard";
import CustomButton from "../../../Controls/CustomButton";
import {colors} from "../../../../utils/colors";
import VideoPlayerModel from "../VideoPlayerModel";
import {DownloadIcon, ShareIcon} from "../../../../assets/icons";
import {savedLabel, videoCard} from "./style";

const Saved = (props) => {
  if (!isUserLoggedIn()) {
    window.location.replace('/login')
  }

  const history = useHistory();
  const [allVideos, setAllVideos] = useState([]);
  const [avatarTab, setAvatarTab] = useState('saved');
  const [showVideoDialogue, setShowVideoDialogue] = useState(false);
  const {setIsLoading, isLoading, alertState, setAlertState} = useContext(AppContext);
  const [offset, setOffset] = useState(0)
  const [hasNext, setHasNext] = useState(null)
  const [selectedVideoUrl, setSelectedVideoUrl] = useState(null);

  const onVideosSuccess = (response) => {
    setAllVideos([...allVideos, ...response.data.results])
    setHasNext(response.data.next)
  }

  const onVideosFailure = (msg, error) => {
    setAlertState({...alertState, open: true, severity: 'error', message: msg})
  }

  const handleVideoDownload = (videoId) => {
    setAlertState({...alertState, open: true, severity: 'success', message: 'Downloading Video'})
    getSignedUrl(
      videoId,
      (response) => {
        if (response.data.url)
          window.location.replace(response.data.url)
        else
          setAlertState({...alertState, open: true, severity: 'error', message: 'Error'})
      },
      () => {},
      () => {},
    )
  }

  const handleVideoPlay = (id) => {
    getSignedUrl(
      id,
      (response) => {setSelectedVideoUrl(response.data.url)},
      () => {},
      () => {},
    )
    setShowVideoDialogue(true)
  }

  useEffect(() => {
    videoGenerationRequests(offset, onVideosSuccess, onVideosFailure, setIsLoading)
    // eslint-disable-next-line
  }, [offset])

  useEffect(() => {
    const intervalCall = setInterval(function() {
      videoGenerationRequests(offset, onVideosSuccess, onVideosFailure, () => {})
    }, 60 * 1000);
    return () => {
      clearInterval(intervalCall)
    }
    // eslint-disable-next-line
  }, [offset])

  const handleClick = () => {
    history.push('/avatar')
  }

  const handleSharableLink = (video_id) => {
    console.log("video_id", video_id)
    getShareableUrl(
      video_id,
      (response) => {
        const url = `${window.location.origin}/play/${video_id}/${response.data.uri}`
        copy(url)
        setAlertState({...alertState, open: true, severity: 'success', message: 'Video link copied!'})
      },
      () => {setAlertState({...alertState, open: true, severity: 'error', message: 'Error'})},
      setIsLoading,
    )
  }

  return (
    <BasePage
      rightComponents={[
        <CustomButton key={'create-video'} onClick={handleClick}>Create New Video</CustomButton>
      ]}
      tabOnChange={setAvatarTab}
      tabValue={avatarTab}
    >
      <Grid sx={savedLabel}>
        <h1>Saved Videos</h1>
      </Grid>
      <Grid sx={videoCard} container justifyItems='center' alignContent={'center'}>
        {allVideos.length ?
          allVideos.map((video, index) =>
          <Grid className={'video-grid'} xs={2} item key={index.toString()} >
            <Card elevation={0} className={'video-card'}
              style={
                video.avatar_background.color ? {
                  background: video.avatar_background.color
                } :
                  video.avatar_background.image ? {
                    backgroundImage: `url('${video.avatar_background.image}')`,
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover'
                  } :
                    {}
              }
            >
              {
                video.status === 'Completed' ?
                  <>
                    <DownloadIcon className={'download-icon'} onClick={() => handleVideoDownload(video.id)} />
                    <ShareIcon className={'share-icon'} onClick={() => handleSharableLink(video.id)} />
                  </>
                  : null
              }
              <CardMedia
                style={video.avatar_background.circle_background ? {
                  position: 'absolute', top: '2%', left: '20%',width: '60%', height: '100%', borderRadius: '50%',
                  background: video.avatar_background.circle_background, justifyContent: 'center'
                } : {}}
                className={video.status === 'Completed' ? '' : 'loading-img'}
                onClick={() => video.status === 'Completed' ? handleVideoPlay(video.id) : null}
                component="img" image={video.avatar_details.thumbnail} alt={'video image'}
              />
            </Card>
            <CardContent>
              <h3>{video.id} - {video.name}</h3>
              <span className={video.status === 'Completed' ? 'download' : 'loading'}>
              {
                video.status === 'Completed' ?
                  null :
                  <Tooltip title={'Video is being generated'}>
                    <LinearProgress size={32} thickness={5} sx={{color: colors.orange}}/>
                  </Tooltip>
              }
              </span>
              <h5>{video.avatar_details.name}</h5>
            </CardContent>
          </Grid>) :
          isLoading ? null : <EmptyCard />
        }
      </Grid>
      <Grid container justifyContent={'center'} alignContent={'center'}>
        {
          conditionalRender(hasNext,
            <CustomButton
              style={{marginBottom: 20}}
              onClick={() => {
                setOffset(offset+100)
              }}
            >
              Show more
            </CustomButton>,
           null
        )}
      </Grid>
      <VideoPlayerModel
        isOpen={showVideoDialogue}
        url={selectedVideoUrl}
        onClose={() => {
          setShowVideoDialogue(false)
          setSelectedVideoUrl(null)
        }}
      />
    </BasePage>
  );
};

export default Saved;
