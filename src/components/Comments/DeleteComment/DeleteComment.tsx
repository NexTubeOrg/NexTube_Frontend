// src/components/Comments/DeleteComment/DeleteComment.tsx
import React from 'react';
import { useState } from 'react';
import { handleSuccess } from '../../../common/handleError';
import http_api from '../../../services/http_api';
import { DangerProcessingButton } from '../../common/buttons/DangerProcessingButton';
import { store } from '../../../store';
import { VideoCommentsReducerActionTypes } from '../../../store/reducers/videoComments/types';
import { SecondaryProcessingButton } from '../../common/buttons/SecondaryProcessingButton';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

const DeleteComment = (props: { commentId: number }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { t } = useTranslation();

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
      console.error('delete comment error', error);
    } finally {
      setIsLoading(() => false);
    }
  };

  return (
    <>
      <button
        onClick={() => {
          setIsOpen((o) => !o);
        }}
      >
        <div className="w-10 text-gray">
          <EllipsisVerticalIcon></EllipsisVerticalIcon>
        </div>
      </button>
      {isOpen && (
        <div className="relative">
          <div className="absolute">
            <SecondaryProcessingButton
              isLoading={isLoading}
              text={t('deleteComment.remove')}
              onClick={() => {
                onDeleteClick();
              }}
              type="button"
            ></SecondaryProcessingButton>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteComment;
