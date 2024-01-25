// src/components/Comments/CommentsContainer/CommentsContainer.tsx
import React from 'react';
import CommentItem from '../CommentItem/CommentItem';
import { ICommentLookup } from '../Common/types';
import { useTranslation } from 'react-i18next';

const CommentsContainer = (props: {
  comments: ICommentLookup[];
  temporaryVideoId: number;
}) => {
  const { t } = useTranslation();
  const comments = props.comments;

  const renderedComments = comments.map((c) => (
    <div className="comment" key={c.commentId}>
      <CommentItem
        temporaryVideoId={props.temporaryVideoId}
        commentLookup={c}
      ></CommentItem>
    </div>
  ));

  return (
    <>
      {comments.length > 0 && (
        <>
          <p>{comments.length} {t('commentsContainer.comments')}</p>
          {renderedComments}
        </>
      )}
    </>
  );
};

export default CommentsContainer;
