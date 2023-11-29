import { ICommentLookup } from '../Common/types';
import dayjs from 'dayjs';
import { ChannelPhoto } from '../../ChannelPhoto';
import relativeTime from 'dayjs/plugin/relativeTime';
import DeleteComment from '../DeleteComment/DeleteComment';
import { IAuthUser } from '../../../store/reducers/auth/types';
import { useSelector } from 'react-redux';
import CommentRepliesLoader from '../CommentsContainer/CommentRepliesLoader';
import AddNewCommentReply from '../AddNewCommentReply/AddNewCommentReply';
dayjs.extend(relativeTime);

const CommentItem = (props: {
  commentLookup: ICommentLookup;
  temporaryVideoId: number;
}) => {
  const { user } = useSelector((store: any) => store.auth as IAuthUser);

  return (
    <>
      <div className="flex items-center gap-5 py-3 px-7.5">
        <div className="relative self-start">
          <ChannelPhoto
            photoUrl={props.commentLookup.creator.channelPhoto ?? ''}
          />
          <span className="absolute right-0 bottom-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-meta-3"></span>
        </div>

        <div className="flex flex-1 items-center justify-between">
          <div>
            <h5 className="font-medium text-black dark:text-white">
              {props.commentLookup.creator.firstName}{' '}
              {props.commentLookup.creator.lastName}
            </h5>
            <div>
              <div className="w-100">
                <span className="text-sm text-black dark:text-white w-100 break-all">
                  {props.commentLookup.content}
                </span>
              </div>

              <span className="text-xs">
                {' '}
                . {`${dayjs(props.commentLookup.dateCreated).fromNow()}`}
              </span>
            </div>
            {props.commentLookup.canLoadReplies != false && (
              <div>
                <CommentRepliesLoader
                  rootCommentId={props.commentLookup.commentId}
                  temporaryVideoId={props.temporaryVideoId}
                ></CommentRepliesLoader>
                <AddNewCommentReply
                  videoId={props.temporaryVideoId}
                  rootCommentId={props.commentLookup.commentId}
                ></AddNewCommentReply>
              </div>
            )}
          </div>
          <div className="w-30">
            {user?.userId == props.commentLookup.creator.userId && (
              <DeleteComment
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
