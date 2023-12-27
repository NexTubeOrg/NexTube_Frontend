import { Link } from 'react-router-dom';
import { IVideoLookup } from '../../pages/Video/common/types';
import { ChannelPhoto } from '../ChannelPhoto';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
dayjs.extend(relativeTime);

const VideoItem = (props: { video: IVideoLookup }) => {
  return (
    <>
      <div className="item mx-2 my-5">
        <Link to={'/video/watch/' + props.video.id}>
          <img
            className="w-75 h-45"
            src={
              '/api/photo/getPhotoUrl/' + props.video.previewPhotoFile + '/600'
            }
          />
        </Link>

        <div className="flex items-start mt-5">
          <Link to={`/channel/${props.video.creator?.userId}`}>
            <div className="w-12 h-12 mr-5">
              <ChannelPhoto photoFileId={props.video.creator?.channelPhoto} />
            </div>
          </Link>
          <div className="text">
            <Link to={'/video/watch/' + props.video.id}>
              <h3 className="text-white text-lg">{props.video.name}</h3>
            </Link>
            <div className="mt-2">
              <Link to={`/channel/${props.video.creator?.userId}`}>
                <h4 className="text-white text-sm">
                  {props.video.creator?.firstName}{' '}
                  {props.video.creator?.lastName}
                </h4>
              </Link>
              <h4 className="text-white text-sm">
                <span className="mr-2">{props.video.views} views</span>{' '}
                <span>{dayjs(props.video.dateCreated).fromNow()}</span>
              </h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export { VideoItem };
