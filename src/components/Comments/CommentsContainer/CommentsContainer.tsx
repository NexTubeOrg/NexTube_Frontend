import { useEffect, useState } from 'react';
import http_api from '../../../services/http_api';
import { ICommentLookup, IGetVideoCommentListResult } from '../Common/types';
import { handleError } from '../../../common/handleError';
import CommentItem from '../CommentItem/CommentItem';
import HandleOnVisible from '../../HandleOnVisible';
import AddNewCommentField from '../AddNewCommentField/AddNewCommentField';
import OperationLoader from '../../../common/OperationLoader';
import { useSelector } from 'react-redux';
import { store } from '../../../store';
import {
  ICommentsList,
  VideoCommentsReducerActionTypes,
} from '../../../store/reducers/videoComments/types';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const CommentsContainer = (props: { videoId: number }) => {
  const [needLoad, setNeedLoad] = useState<number>(1);
  const [canLoad, setCanLoad] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { comments, page } = useSelector(
    (store: any) => store.videoComments as ICommentsList,
  );

  useEffect(() => {
    console.log('useEffect');
    const loadVideoCommentsAsync = async () => {
      try {
        if (needLoad == 0 || !canLoad) {
          console.log('abort loading', needLoad, canLoad);
          return;
        }

        store.dispatch({
          type: VideoCommentsReducerActionTypes.NEXT_COMMENTS_PAGE,
        });
        await sleep(200);

        console.log(props.videoId, page);
        setIsLoading(() => true);
        const result = (
          await http_api.get<IGetVideoCommentListResult>(
            `/api/Video/Comment/GetCommentsList?VideoId=${props.videoId}&Page=${page}`,
          )
        ).data;

        if (result.comments.length == 0) setCanLoad(false);

        store.dispatch({
          type: VideoCommentsReducerActionTypes.APPEND_COMMENTS_LIST,
          payload: result.comments,
        });
        console.log(result.comments);
      } catch (error) {
        console.error('loadVideoCommentsAsyncError', error);
        handleError(error);
      } finally {
        setIsLoading(() => false);
      }
    };

    loadVideoCommentsAsync();
  }, [props.videoId, needLoad]);

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
          <AddNewCommentField
            onCommentAdd={(e) => {
              console.log('new comment', e);
              store.dispatch({
                type: VideoCommentsReducerActionTypes.BEGIN_APPEND_COMMENTS_LIST,
                payload: [e],
              });
            }}
            videoId={props.videoId}
          ></AddNewCommentField>
          {renderedComments}
          <>
            {isLoading && <OperationLoader></OperationLoader>}

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
