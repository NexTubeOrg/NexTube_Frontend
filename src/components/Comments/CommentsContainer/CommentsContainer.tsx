import { useEffect, useState } from 'react';
import http_api from '../../../services/http_api';
import { ICommentLookup, IGetVideoCommentListResult } from '../Common/types';
import { handleError } from '../../../common/handleError';
import CommentItem from '../CommentItem/CommentItem';

const CommentsContainer = (props: { videoId: number }) => {
  const [comments, setComments] = useState<ICommentLookup[]>([]);

  const appendComments = (newComments: ICommentLookup[]) => {
    setComments([...comments, ...newComments]);
  };

  useEffect(() => {
    const loadVideoCommentsAsync = async () => {
      try {
        const result = (
          await http_api.get<IGetVideoCommentListResult>(
            `/api/Video/Comment/GetCommentsList?VideoId=${props.videoId}&Page=1`,
          )
        ).data;
        appendComments(result.comments);
      } catch (error) {
        console.error('loadVideoCommentsAsyncError', error);
        handleError(error);
      }
    };

    loadVideoCommentsAsync();
  }, [props.videoId]);

  const renderedComments = comments.map((c) => (
    <>
      <div className="comment">
        <CommentItem commentLookup={c}></CommentItem>
      </div>
    </>
  ));

  return (
    <>
      <p>{comments.length} comments</p>
      {renderedComments}
    </>
  );
};

export default CommentsContainer;
