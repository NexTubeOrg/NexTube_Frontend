import { useSelector } from 'react-redux';
import { VideoItem } from './VideoItem';
import { IGetVideoListResult } from '../../pages/Video/common/types';
import { useEffect, useState } from 'react';
import http_api from '../../services/http_api';
import { store } from '../../store';
import { IVideoList, VideoReducerActionsType } from '../../store/reducers/videos/types';
import HandleOnVisible from '../HandleOnVisible';
import OperationLoader from '../../common/OperationLoader';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const VideosListContainer = () => {

  const [needLoad, setNeedLoad] = useState<number>(0);
  const [canLoad, setCanLoad] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);


  const { videos, page, pageSize } = useSelector((state: any) => state.videos as IVideoList);

  useEffect(() => {

    const loadVideoAsync = async () => {

      if (needLoad == 0 || !canLoad) {
        console.log('abort loading');
        return;
      }

      store.dispatch({
        type: VideoReducerActionsType.NEXT_VIDEO_LIST,
      });

      await sleep(200);

      setIsLoading(true);

      const result = (
        await http_api.get<IGetVideoListResult>(`/api/video/getVideoList?Page=${page}&PageSize=${pageSize}`)
      ).data;


      if (result.videos.length == 0) {
        setCanLoad(false);
      }

      store.dispatch({
        type: VideoReducerActionsType.APPEND_VIDEO_LIST,
        payload: result
      });
    }

    loadVideoAsync();
  }, [needLoad]);

  return (
    <>
      <ul className="w-full justify-items-center grid min-[700px]:grid-cols-2 min-[1300px]:grid-cols-3 min-[1650px]:grid-cols-4">
        {videos.map((video => (
          <li>
            <VideoItem video={video}></VideoItem>
          </li>
        )))};
      </ul>

      <>
        {isLoading && <OperationLoader></OperationLoader>}

        <HandleOnVisible
          onVisible={() => {
            setNeedLoad((prevPages) => prevPages + 1);
          }}
        ></HandleOnVisible>
      </>
    </>
  );
};
export { VideosListContainer };
