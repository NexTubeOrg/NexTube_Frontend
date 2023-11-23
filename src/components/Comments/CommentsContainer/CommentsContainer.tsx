import CommentItem from '../CommentItem/CommentItem';
import { ICommentLookup } from '../Common/types';

const CommentsContainer = (props: { comments: ICommentLookup[] }) => {
  const comments = props.comments;

  const renderedComments = comments.map((c) => (
    <>
      <div className="comment" key={c.commentId}>
        <CommentItem commentLookup={c}></CommentItem>
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
