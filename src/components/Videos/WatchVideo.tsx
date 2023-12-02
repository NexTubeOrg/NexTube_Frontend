import {
  ArrowDownTrayIcon,
  HandThumbDownIcon,
  HandThumbUpIcon,
  ShareIcon,
} from '@heroicons/react/20/solid';
import { IconedProcessingButton } from '../common/buttons/IconedButton';
import { DoubleIconedProcessingButton } from '../common/buttons/DoubleIconedButton';
import { Link } from 'react-router-dom';
import { CollapseText } from '../common/CollapseText';
import { IVideoLookup } from '../../pages/Video/common/types';
import { Player } from 'video-react';
import dayjs from 'dayjs';

const WatchVideo = (props: { video: IVideoLookup | undefined }) => {

  return (
    <>
      <div className="warp">
        {/* video player */}
        <div className="video w-full">
          <Player>
            <source src={'/api/video/getVideoUrl?VideoFileId=' + props.video?.videoFile} />
          </Player>
        </div>

        {/* video title */}
        <div className="mt-5 ml-5">
          <h3 className="text-white text-3xl">
            {props.video?.name}
          </h3>
        </div>

        {/* actions section */}
        <div className="ml-5 flex justify-between items-center">
          <Link to={'/channel/1'}>
            <div className="flex mt-5 items-center">
              <img className="rounded-full h-16 w-16" src={'/api/photo/getPhotoUrl/' + props.video?.previewPhotoFile + '/600'}></img>
              <div className="ml-5">
                <h3 className="text-white text-xl">{props.video?.creator?.firstName} {props.video?.creator?.lastName}</h3>
                <h3 className="text-gray text-md">3.23M subscribers</h3>
              </div>
            </div>
          </Link>

          <div className="likes flex">
            <div className="flex mr-5">
              <DoubleIconedProcessingButton
                isLoadingLeft={false}
                onClickLeft={() => { }}
                textLeft="59K"
                typeLeft="button"
                backgroundClassnameLeft="primary"
                iconLeft={<HandThumbUpIcon></HandThumbUpIcon>}
                isLoadingRight={false}
                onClickRight={() => { }}
                textRight=""
                typeRight="button"
                iconRight={<HandThumbDownIcon></HandThumbDownIcon>}
                backgroundClassnameRight="secondary"
              ></DoubleIconedProcessingButton>
            </div>

            <div className="mr-5">
              <IconedProcessingButton
                isLoading={false}
                onClick={() => { }}
                text="Share"
                type="button"
                icon={<ShareIcon></ShareIcon>}
                backgroundClassname="secondary"
              ></IconedProcessingButton>
            </div>

            <div className="">
              <IconedProcessingButton
                isLoading={false}
                onClick={() => { }}
                text="Download"
                type="button"
                icon={<ArrowDownTrayIcon></ArrowDownTrayIcon>}
                backgroundClassname="secondary"
              ></IconedProcessingButton>
            </div>
          </div>
        </div>

        {/* video info */}
        <div className="description bg-secondary p-5 mt-5 rounded-lg">
          <h3 className="text-white text-2xl">
            <span className="mr-5">832K</span>
            <span>{dayjs(props.video?.dateCreated).format()}</span>
          </h3>
          <CollapseText
            text={props.video?.description}
          ></CollapseText>
        </div>
      </div>
    </>
  );
};

export { WatchVideo };
