import { EventHandler, useState } from 'react';
import { handleSuccess } from '../../../common/handleError';
import http_api from '../../../services/http_api';
import { DangerProcessingButton } from '../../common/buttons/DangerProcessingButton';

const DeleteComment = (props: {
  commentId: number;
  onCommentDelete: EventHandler<any>;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onDeleteClick = async () => {
    try {
      setIsLoading(() => true);
      await http_api.delete(
        `/api/Video/Comment/DeleteComment?Id=${props.commentId}`,
      );
      handleSuccess('Comment deleted successfully');
      props.onCommentDelete(props.commentId);
    } catch (error) {
      console.error('delete commentn error', error);
    } finally {
      setIsLoading(() => false);
    }
  };

  return (
    <>
      <DangerProcessingButton
        isLoading={isLoading}
        text="Remove"
        onClick={() => {
          onDeleteClick();
        }}
        type="button"
      ></DangerProcessingButton>
    </>
  );
};
export default DeleteComment;
