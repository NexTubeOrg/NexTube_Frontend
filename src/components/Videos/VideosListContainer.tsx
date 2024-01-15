import { VideoItem } from './VideoItem';
import {
  IGetVideoListResult,
  IVideoLookup,
} from '../../pages/Video/common/types';
import { useEffect, useState } from 'react';
import http_api from '../../services/http_api';
import HandleOnVisible from '../HandleOnVisible';
import OperationLoader from '../../common/OperationLoader';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const VideosListContainer = () => {
  const [canLoad, setCanLoad] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isInitLoading, setIsInitLoading] = useState<boolean>(false);
  const [videos, setVideos] = useState<IVideoLookup[]>([]);
  const [page, setPage] = useState<number>(1);
  const [pageSize] = useState<number>(6);

  useEffect(() => {
    const loadVideoAsync = async () => {
      if (page == 0 || !canLoad) {
        console.log('abort loading');
        return;
      }

      await sleep(200);

      setIsLoading(true);

      const result = (
        await http_api.get<IGetVideoListResult>(
          `/api/video/getVideoList?Page=${page}&PageSize=${pageSize}`,
        )
      ).data;

      setVideos(() => [...videos, ...result.videos]);

      if (result.videos.length == 0) {
        setCanLoad(false);
      }

      setIsLoading(() => false);
      setIsInitLoading(true);
    };

    loadVideoAsync();
  }, [page]);

  return (
    <>
      <ul className="w-full z-[9997] relative justify-items-center grid min-[700px]:grid-cols-2 min-[1300px]:grid-cols-3 min-[1650px]:grid-cols-4">
        {videos.map((video) => (
          <li>
            <VideoItem video={video}></VideoItem>
          </li>
        ))}
        ;
      </ul>

      <>
        {isLoading && <OperationLoader></OperationLoader>}

        {isInitLoading && (
          <HandleOnVisible
            onVisible={() => {
              setPage((prevPages) => prevPages + 1);
            }}
          ></HandleOnVisible>
        )}
      </>
    </>
  );
};
export { VideosListContainer };
