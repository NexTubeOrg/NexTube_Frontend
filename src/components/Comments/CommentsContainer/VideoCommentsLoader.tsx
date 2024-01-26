// src/components/Comments/CommentsContainer/VideoCommentsLoader.tsx
import React from 'react';
import { useEffect, useState } from 'react';
import http_api from '../../../services/http_api';
import { IGetVideoCommentListResult } from '../Common/types';
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
import { useTranslation } from 'react-i18next';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const VideoCommentsLoader = (props: { videoId: number }) => {
  const [needLoad, setNeedLoad] = useState<number>(0);
  const [canLoad, setCanLoad] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [totalCount, setTotalCount] = useState<number>(0);

  const { comments, page } = useSelector(
    (store: any) => store.videoComments as ICommentsList,
  );

  const { t } = useTranslation();

  useEffect(() => {
    console.log('loadVideoCommentsAsync', needLoad);
    const loadVideoCommentsAsync = async () => {
      try {
        if (needLoad === 0 || !canLoad) {
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

        if (result.comments.length === 0) setCanLoad(false);

        store.dispatch({
          type: VideoCommentsReducerActionTypes.APPEND_COMMENTS_LIST,
          payload: result.comments,
        });
        setTotalCount(() => result.totalCount);
        console.log(result.comments);
      } catch (error) {
        console.error('loadVideoCommentsAsyncError', error);
        handleError(error);
      } finally {
        setIsLoading(() => false);
      }
    };

    loadVideoCommentsAsync();
  }, [needLoad]);

  useEffect(() => {
    setNeedLoad((t) => {
      console.log('new needload comments', t + 1);
      return t + 1;
    });
    setTotalCount(0);
    setIsLoading(false);
    setCanLoad(true);

    store.dispatch({
      type: VideoCommentsReducerActionTypes.RESET_COMMENTS,
    });

    console.log('reset comments');
  }, [props.videoId]);

  return (
    <>
      <p className="text-white ml-6">{totalCount} {t('videoCommentsLoader.comments')}</p>
      <AddNewCommentField
        focus={false}
        rootCommentId={undefined}
        onCancel={() => {}}
        onSubmit={() => {
          setTotalCount((p) => p + 1);
        }}
        videoId={props.videoId}
      ></AddNewCommentField>
      {comments.length > 0 && (
        <>
          <CommentsContainer
            temporaryVideoId={props.videoId}
            comments={comments}
          ></CommentsContainer>
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

export default VideoCommentsLoader;
