import React, { useEffect, useState } from 'react';
import http_api from '../../services/http_api';
import InfiniteScroll from 'react-infinite-scroll-component';
import { IGetUserPlaylistsResult, IPlaylistLookup } from './types';
import { Link, useParams } from 'react-router-dom';
import OperationLoader from '../../common/OperationLoader';
import { PlaylistItem } from './PlaylistItem';
import HandleOnVisible from '../HandleOnVisible';
import { useTranslation } from 'react-i18next';
import { FaceFrownIcon, PlusIcon } from '@heroicons/react/24/outline';
import { IAuthUser } from '../../store/reducers/auth/types';
import { useSelector } from 'react-redux';
const ChannelPlaylists = () => {
  const { id } = useParams();
  const { t } = useTranslation(); // Initialize the hook

  const [playlists, setPlaylists] = useState<IPlaylistLookup[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(4);
  const [needLoad, setNeedLoad] = useState<number>(1);
  const [canLoad, setCanLoad] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { user } = useSelector((store: any) => store.auth as IAuthUser);

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
          <ul className="w-full gap-4 justify-items-center grid min-[700px]:grid-cols-2 min-[1300px]:grid-cols-3 min-[1650px]:grid-cols-4 mt-8.5">
            {playlists.map((p) => (
              <li className=" w-fit" key={p.id}>
                <PlaylistItem playlist={p}></PlaylistItem>
              </li>
            ))}

            {playlists.length == 0 && user?.userId == id && (
              <>
                <div className="mb-6 w-75">
                  <Link to={'/profile/playlists/addPlaylist'}>
                    <div className="relative  h-45 min-w-75 min-h-45 ">
                      <div className="w-75 h-45 bg-gray rounded-lg">
                        <div className="text-white h-full flex justify-center items-center">
                          <div className="w-32">
                            <PlusIcon></PlusIcon>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>

                  <div className="flex items-start mt-2">
                    <div className="text">
                      <Link to={'/profile/playlists/addPlaylist'}>
                        <h3 className="text-white text-lg">
                          {t('playlistItem.firstPlaylist')}
                        </h3>
                        <div className="mt-1">
                          <p className="text-gray">
                            {t('playlistItem.viewFullPlaylist')}
                          </p>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </>
            )}

            {playlists.length == 0 && user?.userId != id && (
              <>
                <div className="mb-6 w-75">
                  <div className="relative  h-45 min-w-75 min-h-45 ">
                    <div className="w-75 h-45 bg-gray rounded-lg">
                      <div className="text-white h-full flex justify-center items-center">
                        <div className="w-32">
                          <FaceFrownIcon></FaceFrownIcon>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start mt-2">
                    <div className="text">
                      <h3 className="text-white text-lg">
                        {t('playlistItem.noPlaylists')}
                      </h3>
                    </div>
                  </div>
                </div>
              </>
            )}

            <li>
              {isLoading && <OperationLoader></OperationLoader>}

              <HandleOnVisible
                onVisible={() => {
                  setNeedLoad((prevPages) => prevPages + 1);
                }}
              ></HandleOnVisible>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default ChannelPlaylists;
