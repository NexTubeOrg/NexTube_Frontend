import { Link } from 'react-router-dom';
import { ICommentLookup } from '../Common/types';
import dayjs from 'dayjs';
import { ChannelPhoto } from '../../ChannelPhoto';
import relativeTime from 'dayjs/plugin/relativeTime';
import DeleteComment from '../DeleteComment/DeleteComment';
import { EventHandler } from 'react';
import { IAuthUser } from '../../../store/reducers/auth/types';
import { useSelector } from 'react-redux';
dayjs.extend(relativeTime);

const CommentItem = (props: {
  commentLookup: ICommentLookup;
  onDelete: EventHandler<any>;
}) => {
  const { user } = useSelector((store: any) => store.auth as IAuthUser);

  return (
    <>
      <div className="flex items-center gap-5 py-3 px-7.5 hover:bg-gray-3 dark:hover:bg-meta-4">
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
          <div>
            {user?.userId == props.commentLookup.creator.userId && (
              <DeleteComment
                onCommentDelete={props.onDelete}
                commentId={props.commentLookup.commentId}
              ></DeleteComment>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CommentItem;
