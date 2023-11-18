import { useEffect, useState } from 'react';
import http_api from '../../../services/http_api';
import { ICommentLookup, IGetVideoCommentListResult } from '../Common/types';
import { handleError } from '../../../common/handleError';
import CommentItem from '../CommentItem/CommentItem';
import HandleOnVisible from '../../HandleOnVisible';
import AddNewCommentField from '../AddNewCommentField/AddNewCommentField';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const CommentsContainer = (props: { videoId: number }) => {
  const [comments, setComments] = useState<ICommentLookup[]>([]);
  const [page, setPage] = useState<number>(1);
  const [needLoad, setNeedLoad] = useState<number>(1);
  const [canLoad, setCanLoad] = useState<boolean>(true);

  const appendComments = (newComments: ICommentLookup[]) => {
    console.log('try to append', newComments);
    setComments((prevComments) => [...prevComments, ...newComments]);
  };

  const pushToBeginComments = (newComments: ICommentLookup[]) => {
    console.log('try to pushToBegin', newComments);
    setComments((prevComments) => [...newComments, ...prevComments]);
  };

  useEffect(() => {
    console.log('useEffect');
    const loadVideoCommentsAsync = async () => {
      try {
        if (needLoad == 0 || !canLoad) {
          console.log('abort loading', needLoad, canLoad);
          return;
        }

        setPage(page + 1);
        await sleep(200);

        console.log(props.videoId, page);
        const result = (
          await http_api.get<IGetVideoCommentListResult>(
            `/api/Video/Comment/GetCommentsList?VideoId=${props.videoId}&Page=${page}`,
          )
        ).data;

        if (result.comments.length == 0) setCanLoad(false);

        appendComments(result.comments);
        console.log(result.comments);
      } catch (error) {
        console.error('loadVideoCommentsAsyncError', error);
        handleError(error);
      }
    };

    loadVideoCommentsAsync();
  }, [props.videoId, needLoad]);

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
          <AddNewCommentField
            onCommentAdd={(e) => {
              console.log('new comment', e);
              pushToBeginComments([e]);
            }}
            videoId={props.videoId}
          ></AddNewCommentField>
          {renderedComments}
          <>
            <HandleOnVisible
              onVisible={() => {
                setNeedLoad((prevPages) => prevPages + 1);
              }}
            ></HandleOnVisible>
          </>
        </>
      )}
    </>
  );
};

export default CommentsContainer;
