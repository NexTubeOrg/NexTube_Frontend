import { useState } from 'react';
import { handleSuccess } from '../../../common/handleError';
import http_api from '../../../services/http_api';
import { DangerProcessingButton } from '../../common/buttons/DangerProcessingButton';
import { store } from '../../../store';
import { VideoCommentsReducerActionTypes } from '../../../store/reducers/videoComments/types';

const DeleteComment = (props: { commentId: number }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onDeleteClick = async () => {
    try {
      setIsLoading(() => true);
      await http_api.delete(
        `/api/Video/Comment/DeleteComment?Id=${props.commentId}`,
      );
      store.dispatch({
        type: VideoCommentsReducerActionTypes.REMOVE_COMMENT_FROM_COMMENTS_LIST,
        payload: props.commentId,
      });
      handleSuccess('Comment deleted successfully');
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
