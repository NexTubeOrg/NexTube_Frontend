import CommentItem from '../CommentItem/CommentItem';
import { store } from '../../../store';
import { VideoCommentsReducerActionTypes } from '../../../store/reducers/videoComments/types';
import { ICommentLookup } from '../Common/types';

const CommentsContainer = (props: { comments: ICommentLookup[] }) => {
  const comments = props.comments;

  const renderedComments = comments.map((c) => (
    <>
      <div className="comment" key={c.commentId}>
        <CommentItem
          onDelete={(commentId) => {
            store.dispatch({
              type: VideoCommentsReducerActionTypes.REMOVE_COMMENT_FROM_COMMENTS_LIST,
              payload: commentId,
            });
          }}
          commentLookup={c}
        ></CommentItem>
      </div>
    </>
  ));

  return (
    <>
      {comments.length > 0 && (
        <>
          <p>{comments.length} comments</p>
          {renderedComments}
        </>
      )}
    </>
  );
};

export default CommentsContainer;
