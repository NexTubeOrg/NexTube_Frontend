import { Link } from 'react-router-dom';
import { ICommentLookup } from '../Common/types';
import dayjs from 'dayjs';
import { ChannelPhoto } from '../../ChannelPhoto';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

const CommentItem = (props: { commentLookup: ICommentLookup }) => {
  return (
    <>
      <Link
        to="/"
        className="flex items-center gap-5 py-3 px-7.5 hover:bg-gray-3 dark:hover:bg-meta-4"
      >
        <div className="relative">
          <ChannelPhoto
            photoUrl={props.commentLookup.creator.channelPhoto ?? ''}
          />

          {/* <div className="image-dummy bg-white rounded-full w-12 h-12"></div> */}
          <span className="absolute right-0 bottom-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-meta-3"></span>
        </div>

        <div className="flex flex-1 items-center justify-between">
          <div>
            <h5 className="font-medium text-black dark:text-white">
              {props.commentLookup.creator.firstName}{' '}
              {props.commentLookup.creator.lastName}
            </h5>
            <p>
              <span className="text-sm text-black dark:text-white">
                {props.commentLookup.content}
              </span>
              <span className="text-xs">
                {' '}
                . {`${dayjs(props.commentLookup.dateCreated).fromNow()}`}
              </span>
            </p>
          </div>
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary">
            <span className="text-sm font-medium text-white">3</span>
          </div>
        </div>
      </Link>
    </>
  );
};

export default CommentItem;
