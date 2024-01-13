import {
  ArrowDownTrayIcon,
  ShareIcon,
  FlagIcon,
  ListBulletIcon,
} from '@heroicons/react/20/solid';
import React, { useEffect, useRef, useState } from 'react';
import { IconedProcessingButton } from '../common/buttons/IconedButton';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { CollapseText } from '../common/CollapseText';
import SubscribeButton from '../../pages/Subscription/UpdateUser/Subscription';
import { AddVideoReaction } from '../Reactions/AddVideoReaction';
import VideoCommentsLoader from '../Comments/CommentsContainer/VideoCommentsLoader';
import { IVideoLookup } from '../../pages/Video/common/types';
import {
  BigPlayButton,
  ControlBar,
  LoadingSpinner,
  PlayToggle,
  Player,
  PosterImage,
  Shortcut,
} from 'video-react';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import './../../styles/custom-video-react.css';

import ReportForm from '../ReportForm';
import { handleSuccess } from '../../common/handleError';
import { APP_CONFIG } from '../../env';
import { useSelector } from 'react-redux';
import { IAuthUser } from '../../store/reducers/auth/types';
import { SetVideoPlaylist } from '../Playlists/SetVideoPlaylist';

dayjs.extend(relativeTime);

const WatchVideo = (props: { video: IVideoLookup | undefined }) => {
  const [showReportForm, setShowReportForm] = useState(false);
  const [isAuthUserVideoOwner, setIsAuthUserVideoOwner] = useState(false);

  const { user } = useSelector((state: any) => state.auth as IAuthUser);

  const player = useRef<any>(null);

  useEffect(() => {
    // determine that current signed in user is owner of current video
    setIsAuthUserVideoOwner(user?.userId == props.video?.creator?.userId);
  }, [user?.userId, props.video]);

  const handleReportClick = () => {
    setShowReportForm((prevShowReportForm) => !prevShowReportForm);
  };

  const handleReportFormClose = () => {
    setShowReportForm(false);
  };

  useEffect(() => {
    player.current.load();
  }, [props.video]);

  // const getVideoChildren = (originalChildren: []) => {
  //   return [
  //     <PosterImage key="poster-image" poster='' />,
  //     <LoadingSpinner key="loading-spinner" order={2.0} />,
  //     <BigPlayButton key="big-play-button" order={4.0} />,
  //     <ControlBar key="control-bar" order={5.0} />,
  //     <Shortcut key="shortcut" order={99.0} />,
  //   ];
  // };

  return (
    <>
      <div className="warp my-6">
        {/* video player */}
        <div className="video w-full">
          <div className="flex">
            {props.video && (
              <Player
                ref={player}
                fluid={false}
                aspectRatio="16:9"
                height={600}
                poster={`/api/photo/getPhotoUrl/${props.video.previewPhotoFile}/1024`}
                autoPlay={false} // change by desire
              >
                <source
                  src={
                    '/api/video/getVideoUrl?VideoFileId=' +
                    props.video?.videoFile
                  }
                />
                <BigPlayButton className="" position="center"></BigPlayButton>
                <LoadingSpinner></LoadingSpinner>
              </Player>
            )}
          </div>
        </div>

        <div className="mx-6">
          {/* video title */}
          <div className="mt-5 ml-5">
            <h3 className="text-white text-3xl">{props.video?.name}</h3>
          </div>

          {/* actions section */}
          <div className="ml-5 flex justify-between items-center">
            <Link to={`/channel/${props.video?.creator?.userId}`}>
              <div className="flex mt-5 items-center">
                <img
                  className="rounded-full h-16 w-16"
                  src={
                    '/api/photo/getPhotoUrl/' +
                    props.video?.creator?.channelPhoto +
                    '/600'
                  }
                ></img>
                <div className="ml-5">
                  <h3 className="text-white text-xl">
                    {props.video?.creator?.firstName}{' '}
                    {props.video?.creator?.lastName}
                  </h3>
                  <h3 className="text-gray text-md">3.23M subscribers</h3>
                </div>
              </div>
            </Link>

            {!isAuthUserVideoOwner && (
              <div className="">
                <SubscribeButton
                  isLoading={false}
                  onClick={() => {}}
                  text="Subscribe"
                  type="button"
                  backgroundClassname="primary"
                  subscribeId={props.video?.creator?.userId.toString()}
                ></SubscribeButton>
              </div>
            )}

            <div className="likes flex">
              <AddVideoReaction
                videoId={props.video?.id ?? -1}
              ></AddVideoReaction>
              <div className="mr-5">
                <IconedProcessingButton
                  isLoading={false}
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    handleSuccess('Copied link to clipboard');
                  }}
                  text="Share"
                  type="button"
                  icon={<ShareIcon></ShareIcon>}
                  backgroundClassname="secondary"
                ></IconedProcessingButton>
              </div>

              <div className="mr-5">
                <IconedProcessingButton
                  isLoading={false}
                  onClick={handleReportClick}
                  text="Report"
                  type="button"
                  icon={<FlagIcon></FlagIcon>}
                  backgroundClassname="secondary"
                ></IconedProcessingButton>
              </div>

              <div className="mr-5">
                <Link
                  to={
                    APP_CONFIG.API_URL +
                    'video/getVideoUrl?VideoFileId=' +
                    props.video?.videoFile
                  }
                >
                  <IconedProcessingButton
                    isLoading={false}
                    onClick={() => {}}
                    text="Download"
                    type="button"
                    icon={<ArrowDownTrayIcon></ArrowDownTrayIcon>}
                    backgroundClassname="secondary"
                  ></IconedProcessingButton>
                </Link>
              </div>

              <div className="">
                <SetVideoPlaylist video={props.video}></SetVideoPlaylist>
              </div>
            </div>
          </div>
          {/* video info */}
          {showReportForm && (
            <div className="report-form-overlay">
              <ReportForm
                abuser={props.video?.creator?.userId}
                videoId={props.video?.id}
                onSubmitSuccess={handleReportFormClose}
              />
              <button onClick={handleReportFormClose}>Close Report Form</button>
            </div>
          )}

          <div className="description bg-secondary p-5 mt-5 rounded-lg">
            <h3 className="text-white text-2xl">
              <span className="mr-3">{props.video?.views} views</span>
              <span>{dayjs(props.video?.dateCreated).fromNow()}</span>
            </h3>
            <CollapseText text={props.video?.description}></CollapseText>
          </div>
        </div>

        <VideoCommentsLoader
          videoId={props.video?.id ?? -1}
        ></VideoCommentsLoader>
      </div>
    </>
  );
};

export { WatchVideo };
