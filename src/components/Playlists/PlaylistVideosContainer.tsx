import React, { useEffect, useState } from 'react';
import http_api from '../../services/http_api';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
  IGetPlaylistVideos,
  IGetUserPlaylistsResult,
  IPlaylistLookup,
} from './types';
import { useParams } from 'react-router-dom';
import OperationLoader from '../../common/OperationLoader';
import { PlaylistItem } from './PlaylistItem';
import HandleOnVisible from '../HandleOnVisible';
import { IVideoLookup } from '../../pages/Video/common/types';
import { VideoItem } from '../Videos/VideoItem';

const PlaylistVideosContainer = () => {
  const { id } = useParams();

  const [videos, setVideos] = useState<IVideoLookup[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(4);
  const [needLoad, setNeedLoad] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchVideos = async () => {
    try {
      const response = (
        await http_api.get<IGetPlaylistVideos>(
          `/api/Video/Playlist/GetPlaylistVideos?PlaylistId=${id}&Page=${page}&PageSize=${pageSize}`,
        )
      ).data;
      const newVideos = response.videos || [];
      setVideos((prev) => {
        if (newVideos.length < 1) return prev;
        if (prev.find((p) => p.id == newVideos[0].id) != null) return prev;

        return [...prev, ...newVideos];
      });
      setPage((page) => page + 1);
    } catch (error) {
      console.error('Error fetching playlist videos:', error);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, [needLoad]);

  return (
    <>
      <ul className="w-full justify-items-center grid min-[700px]:grid-cols-2 min-[1300px]:grid-cols-3 min-[1650px]:grid-cols-4">
        {videos.map((v) => (
          <li>
            <VideoItem video={v}></VideoItem>
          </li>
        ))}
        ;
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

export default PlaylistVideosContainer;
