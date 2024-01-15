import { useEffect, useState } from 'react';
import http_api from '../../../services/http_api';
import { ICommentLookup, IGetVideoCommentListResult } from '../Common/types';
import { handleError } from '../../../common/handleError';
import HandleOnVisible from '../../HandleOnVisible';
import AddNewCommentField from '../AddNewCommentField/AddNewCommentField';
import OperationLoader from '../../../common/OperationLoader';
import { useSelector } from 'react-redux';
import { store } from '../../../store';
import {
  ICommentsList,
  VideoCommentsReducerActionTypes,
} from '../../../store/reducers/videoComments/types';
import CommentsContainer from './CommentsContainer';
import { SecondaryProcessingButton } from '../../common/buttons/SecondaryProcessingButton';
import { ICommentRepliesList } from '../../../store/reducers/videoComments/types';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const CommentRepliesLoader = (props: {
  temporaryVideoId: number;
  rootCommentId: number;
  totalCommentRepliesCount: number;
}) => {
  const [needLoad, setNeedLoad] = useState<number>(0);
  const [canLoad, setCanLoad] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [repliesPage, setRepliesPage] = useState<number>(1);

  const { comments } = useSelector(
    (store: any) => store.videoComments as ICommentsList,
  );
  const replies: ICommentLookup[] =
    comments.find((c) => c.commentId == props.rootCommentId)?.replies ?? [];

  useEffect(() => {
    const loadCommentRepliesAsync = async () => {
      try {
        if (needLoad == 0) {
          console.log('abort loading', needLoad, canLoad);
          return;
        }

        await sleep(200);
        setIsLoading(() => true);
        const result = (
          await http_api.get<IGetVideoCommentListResult>(
            `/api/Video/Comment/GetCommentRepliesList?VideoId=${props.temporaryVideoId}&RootCommentId=${props.rootCommentId}&Page=${repliesPage}`,
          )
        ).data;

        if (result.comments.length == 0) setCanLoad(false);
        else setRepliesPage((prev) => prev + 1);

        store.dispatch({
          type: VideoCommentsReducerActionTypes.APPEND_COMMENT_REPLIES,
          payload: {
            replies: result.comments,
            rootCommentId: props.rootCommentId,
          },
        });
        console.log(result.comments);
      } catch (error) {
        console.error('loadCommentRepliesAsyncError', error);
        handleError(error);
      } finally {
        setIsLoading(() => false);
      }
    };

    loadCommentRepliesAsync();
  }, [props.rootCommentId, needLoad]);

  return (
    <>
      {replies.length > 0 && (
        <>
          <CommentsContainer
            temporaryVideoId={props.temporaryVideoId}
            comments={replies}
          ></CommentsContainer>
        </>
      )}
      <div className="w-30">
        <button
          className="text-primary font-bold text-lg"
          onClick={() => {
            setNeedLoad((prevPages) => prevPages + 1);
          }}
          type="button"
        >
          <div className="flex">
            <div className="w-7">
              <ChevronDownIcon></ChevronDownIcon>
            </div>
            {replies.length == 0 && (
              <span>{props.totalCommentRepliesCount} replies</span>
            )}
            {replies.length > 0 && <span>Load more</span>}
          </div>
        </button>
      </div>
    </>
  );
};

export default CommentRepliesLoader;
