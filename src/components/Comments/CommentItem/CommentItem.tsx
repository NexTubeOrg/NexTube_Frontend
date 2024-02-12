import { ICommentLookup } from '../Common/types';
import dayjs from 'dayjs';
import { ChannelPhoto } from '../../ChannelPhoto';
import relativeTime from 'dayjs/plugin/relativeTime';
import DeleteComment from '../DeleteComment/DeleteComment';
import { IAuthUser } from '../../../store/reducers/auth/types';
import { useSelector } from 'react-redux';
import CommentRepliesLoader from '../CommentsContainer/CommentRepliesLoader';
import AddNewCommentReply from '../AddNewCommentReply/AddNewCommentReply';
import { Link } from 'react-router-dom';
dayjs.extend(relativeTime);

const CommentItem = (props: {
  commentLookup: ICommentLookup;
  temporaryVideoId: number;
}) => {
  const { user } = useSelector((store: any) => store.auth as IAuthUser);

  return (
    <>
      <div className="flex text-gray items-center gap-5 py-3 px-7.5">
        <Link
          className="relative self-start"
          to={`/channel/${props.commentLookup.creator.userId}`}
        >
          <div className="relative self-start">
            <ChannelPhoto
              photoFileId={props.commentLookup.creator.channelPhoto ?? ''}
            />
          </div>
        </Link>

        <div className="flex flex-1 items-center justify-between">
          <div>
            <Link
              className="relative self-start"
              to={`/channel/${props.commentLookup.creator.userId}`}
            >
              <h5 className="font-medium text-black dark:text-white">
                {props.commentLookup.creator.firstName}{' '}
                {props.commentLookup.creator.lastName}
                <span className="text-xs text-gray">
                  {` ${dayjs(props.commentLookup.dateCreated).fromNow()}`}
                </span>
              </h5>
            </Link>

            <div>
              <div className="w-100">
                <span className="text-sm text-black dark:text-white w-100 break-all">
                  {props.commentLookup.content}
                </span>
              </div>
            </div>
            {props.commentLookup.canLoadReplies != false && (
              <div>
                <AddNewCommentReply
                  videoId={props.temporaryVideoId}
                  rootCommentId={props.commentLookup.commentId}
                ></AddNewCommentReply>
                <CommentRepliesLoader
                  totalCommentRepliesCount={props.commentLookup.repliesCount}
                  rootCommentId={props.commentLookup.commentId}
                  temporaryVideoId={props.temporaryVideoId}
                ></CommentRepliesLoader>
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
