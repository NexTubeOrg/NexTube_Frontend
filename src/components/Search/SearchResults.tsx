import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { IVideoLookup } from '../../pages/Video/common/types';
import { ChannelPhoto } from '../ChannelPhoto';

const VideoItem = (props: { video: IVideoLookup }) => {
  return (
    <>
      <div className="item flex mx-2 my-5 text-gray">
        <Link to={'/video/watch/' + props.video.id}>
          <img
            className="w-75 h-45 rounded-md"
            src={props.video.previewPhotoFile + ''}
          />
        </Link>

        <div className="items-start ml-6">
          <div className="text">
            <Link to={'/video/watch/' + props.video.id}>
              <h3 className="text-white font-semibold text-lg">
                {props.video.name}
              </h3>
              <h4 className="text-gray mb-2 text-sm">
                <span className="mr-2">{props.video.views} views</span>{' '}
                <span>{dayjs(props.video.dateCreated).fromNow()}</span>
              </h4>
            </Link>
          </div>
          <Link to={'/channel/1'}>
            <div className="flex">
              <div className="w-12 h-12 mr-5">
                {/* <ChannelPhoto photoFileId={props.video.creator?.channelPhoto} /> */}
                <img
                  className="h-12 w-12 rounded-full"
                  src={props.video.creator?.channelPhoto}
                  alt="User"
                />
              </div>
              <div className="flex items-center justify-center">
                <h4 className=" text-sm">
                  {props.video.creator?.firstName}{' '}
                  {props.video.creator?.lastName}
                </h4>
              </div>
            </div>
          </Link>
          <div className="">
            <h3>{props.video.description}</h3>
          </div>
        </div>
      </div>
    </>
  );
};

export const SearchResults = () => {
  return (
    <>
      <ul>
        <li>
          <VideoItem
            video={{
              id: 1,
              name: 'Video name',
              description: 'This is description of video asdaddsads das sad as',
              videoFile: '',
              previewPhotoFile: '/banner.jpg',
              creator: {
                email: '',
                firstName: 'User',
                lastName: 'Name',
                channelPhoto: '/banner.jpg',
                roles: [],
                userId: 0,
              },
              dateCreated: '',
              views: 111,
            }}
          ></VideoItem>
        </li>
        <li>
          <VideoItem
            video={{
              id: 1,
              name: 'Video name',
              description: 'This is description of video asdaddsads das sad as',
              videoFile: '',
              previewPhotoFile: '/banner.jpg',
              creator: {
                email: '',
                firstName: 'User',
                lastName: 'Name',
                channelPhoto: '/banner.jpg',
                roles: [],
                userId: 0,
              },
              dateCreated: '',
              views: 111,
            }}
          ></VideoItem>
        </li>
        <li>
          <VideoItem
            video={{
              id: 1,
              name: 'Video name',
              description: 'This is description of video asdaddsads das sad as',
              videoFile: '',
              previewPhotoFile: '/banner.jpg',
              creator: {
                email: '',
                firstName: 'User',
                lastName: 'Name',
                channelPhoto: '/banner.jpg',
                roles: [],
                userId: 0,
              },
              dateCreated: '',
              views: 111,
            }}
          ></VideoItem>
        </li>
        <li>
          <VideoItem
            video={{
              id: 1,
              name: 'Video name',
              description: 'This is description of video asdaddsads das sad as',
              videoFile: '',
              previewPhotoFile: '/banner.jpg',
              creator: {
                email: '',
                firstName: 'User',
                lastName: 'Name',
                channelPhoto: '/banner.jpg',
                roles: [],
                userId: 0,
              },
              dateCreated: '',
              views: 111,
            }}
          ></VideoItem>
        </li>
        <li>
          <VideoItem
            video={{
              id: 1,
              name: 'Video name',
              description: 'This is description of video asdaddsads das sad as',
              videoFile: '',
              previewPhotoFile: '/banner.jpg',
              creator: {
                email: '',
                firstName: 'User',
                lastName: 'Name',
                channelPhoto: '/banner.jpg',
                roles: [],
                userId: 0,
              },
              dateCreated: '',
              views: 111,
            }}
          ></VideoItem>
        </li>
      </ul>
    </>
  );
};
