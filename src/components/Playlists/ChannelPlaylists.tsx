import React, { useEffect, useState } from 'react';
import http_api from '../../services/http_api';
import InfiniteScroll from 'react-infinite-scroll-component';
import { IGetUserPlaylistsResult, IPlaylistLookup } from './types';
import { useParams } from 'react-router-dom';
import OperationLoader from '../../common/OperationLoader';
import { PlaylistItem } from './PlaylistItem';
import HandleOnVisible from '../HandleOnVisible';
import { useTranslation } from 'react-i18next'; 
const ChannelPlaylists = () => {
  const { id } = useParams();
  const { t } = useTranslation(); // Initialize the hook

  const [playlists, setPlaylists] = useState<IPlaylistLookup[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(4);
  const [needLoad, setNeedLoad] = useState<number>(1);
  const [canLoad, setCanLoad] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchPlaylists = async () => {
    try {
      const response = (
        await http_api.get<IGetUserPlaylistsResult>(
          `/api/Video/Playlist/GetUserPlaylists?UserId=${id}&Page=${page}&PageSize=${pageSize}`,
        )
      ).data;
      const newPlaylists = response.playlists || [];
      setPlaylists((prev) => {
        if (newPlaylists.length < 1) return prev;
        if (prev.find((p) => p.id == newPlaylists[0].id) != null) return prev;

        return [...prev, ...newPlaylists];
      });
      setPage((page) => page + 1);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchPlaylists();
  }, [needLoad]);

  return (
    <>
      <div className="flex justify-center items-center">
        <div className="">
          <div className="mb-8">
            <h1 className="text-white text-3xl">
              <span className="border-b-[3px] pb-1.5 border-primary">
                {t('channelPlaylists.createdPlaylists')}
              </span>
            </h1>
          </div>
          {/* ... existing code */}
        </div>
      </div>
    </>
  );
};

export default ChannelPlaylists;