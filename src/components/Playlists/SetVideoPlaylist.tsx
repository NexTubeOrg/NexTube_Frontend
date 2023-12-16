import { ListBulletIcon } from '@heroicons/react/20/solid';
import { handleSuccess } from '../../common/handleError';
import { IconedProcessingButton } from '../common/buttons/IconedButton';
import { IGetUserPlaylistsResult, IPlaylistLookup } from './types';
import http_api from '../../services/http_api';
import { IVideoLookup } from '../../pages/Video/common/types';
import { useEffect, useState } from 'react';

export const SetVideoPlaylist = (props: {
  video: IVideoLookup | undefined;
}) => {
  const [playlists, setPlaylists] = useState<IPlaylistLookup[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(40);
  const [needLoad, setNeedLoad] = useState<number>(1);
  const [canLoad, setCanLoad] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchPlaylists = async () => {
    try {
      const response = (
        await http_api.get<IGetUserPlaylistsResult>(
          `/api/Video/Playlist/GetUserPlaylists?UserId=${props.video?.creator?.userId}&Page=${page}&PageSize=${pageSize}`,
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

  const changeVideoPlaylist = async (newVideoPlaylistId: number) => {
    try {
      await http_api.post(`/api/Video/Playlist/ChangeVideoPlaylist`, {
        videoId: props.video?.id,
        playlistId: newVideoPlaylistId,
      });
      handleSuccess('Video playlist changed successfuly');
    } catch (error) {
      console.error('Error set video playlist:', error);
    }
  };

  useEffect(() => {
    fetchPlaylists();
  }, [props.video]);

  return (
    <>
      <div className="playlists">
        <div className="mr-5">
          <select
            onChange={(e) => {
              console.log(e.target.value);
              changeVideoPlaylist(parseInt(e.target.value));
            }}
          >
            {playlists.map((p) => (
              <option selected={p.id == props.video?.playlistId} value={p.id}>
                {p.title}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
};
