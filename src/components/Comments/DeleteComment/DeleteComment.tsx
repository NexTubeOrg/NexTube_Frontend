import { EventHandler } from 'react';
import { handleError, handleSuccess } from '../../../common/handleError';
import http_api from '../../../services/http_api';

const DeleteComment = (props: {
  commentId: number;
  onCommentDelete: EventHandler<any>;
}) => {
  const onDeleteClick = async () => {
    try {
      await http_api.delete(
        `/api/Video/Comment/DeleteComment?Id=${props.commentId}`,
      );

      handleSuccess('Comment deleted successfully');
      props.onCommentDelete(props.commentId);
    } catch (error) {
      console.error('delete commentn error', error);
    }
  };

  return (
    <>
      <button
        onClick={() => onDeleteClick()}
        type="submit"
        className="w-30 cursor-pointer rounded-lg border border-danger bg-danger p-2 text-white transition hover:bg-opacity-90"
      >
        Remove
      </button>
    </>
  );
};
export default DeleteComment;
