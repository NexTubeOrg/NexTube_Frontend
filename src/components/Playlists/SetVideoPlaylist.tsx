import { handleSuccess } from '../../common/handleError';
import { IGetUserPlaylistsResult, IVideoPlaylistUserStatus } from './types';
import http_api from '../../services/http_api';
import { IVideoLookup } from '../../pages/Video/common/types';
import { useEffect, useState } from 'react';
import { IconedProcessingButton } from '../common/buttons/IconedButton';
import { PlusIcon } from '@heroicons/react/20/solid';
import React from 'react';
import { CancelButton } from '../common/buttons/CancelButton';
import CheckboxOne from '../CheckboxOne';
import CheckboxFour from '../CheckboxFour';
import { DefaultInput, FieldEditInput } from '../common/inputs';
import { CreatePlaylistOverlay } from '../Profile/Routes/Playlists/CreatePlaylistOverlay';
import { Outlet } from 'react-router-dom';
import { SecondaryProcessingButton } from '../common/buttons/SecondaryProcessingButton';
import { PrimaryButtonLink } from '../common/links/PrimaryButtonLink';

const SelectVideoPlaylist = (props: {
  handleDisagreeClick: () => Promise<void> | null;
  playlists: IVideoPlaylistUserStatus[];
  handlePlaylistToggle: (playlistId: number) => Promise<void> | null;
}) => {
  return (
    <>
      <React.Fragment>
        <div className="fixed inset-0 flex items-center justify-center bg-secondary bg-opacity-75 z-50 rounded-md">
          <div className=" bg-body p-8 rounded-md text-center">
            <div className="flex justify-center items-center mb-4">
              <h2 className="text-2xl text-white">Add video to playlist</h2>

              <CancelButton
                onClick={() => {
                  props.handleDisagreeClick();
                }}
              ></CancelButton>
            </div>
            <div className="flex text-white">
              <ul>
                {props.playlists.map((p) => (
                  <li key={p.playlist.id}>
                    <CheckboxFour
                      name={p.playlist.title}
                      id={p.playlist.id.toString()}
                      isChecked={p.isVideoInPlaylist}
                      description=""
                      onChange={(e) => {
                        props.handlePlaylistToggle(parseInt(e.target.value));
                      }}
                    ></CheckboxFour>
                  </li>
                ))}
                <li>
                  <div className="w-30">
                    <PrimaryButtonLink
                      urlTo="/profile/playlists/addPlaylist"
                      title="Add new playlist"
                    ></PrimaryButtonLink>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </React.Fragment>
    </>
  );
};

export const SetVideoPlaylist = (props: {
  video: IVideoLookup | undefined;
}) => {
  const [isShown, setIsShown] = useState<boolean>(false);
  const [playlists, setPlaylists] = useState<IVideoPlaylistUserStatus[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(4000);

  const fetchPlaylists = async () => {
    try {
      const response = (
        await http_api.get<IGetUserPlaylistsResult>(
          `/api/Video/Playlist/GetVideoPlaylistsUserStatus?VideoId=${props.video?.id}&Page=${page}&PageSize=${pageSize}`,
        )
      ).data;
      const newPlaylists = response.playlists || [];
      setPlaylists((prev) => {
        if (newPlaylists.length < 1) return prev;
        if (
          prev.find((p) => p.playlist.id == newPlaylists[0].playlist.id) != null
        )
          return prev;

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
      handleSuccess('Video playlist toggled successfuly');
    } catch (error) {
      console.error('Error set video playlist:', error);
    }
  };

  useEffect(() => {
    fetchPlaylists();
  }, [props.video]);

  return (
    <>
      <IconedProcessingButton
        isLoading={false}
        onClick={() => {
          setIsShown((p) => !p);
        }}
        text="Save to playlist"
        type="button"
        icon={<PlusIcon></PlusIcon>}
        backgroundClassname="secondary"
      ></IconedProcessingButton>
      {isShown && (
        <>
          <SelectVideoPlaylist
            playlists={playlists}
            handleDisagreeClick={async () => {
              setIsShown(false);
            }}
            handlePlaylistToggle={async (playlistId: number) => {
              changeVideoPlaylist(playlistId);
              setPlaylists((ps) => {
                return ps.map((p) => {
                  if (p.playlist.id == playlistId) {
                    p.isVideoInPlaylist = !p.isVideoInPlaylist;
                  }
                  return p;
                });
              });
            }}
          ></SelectVideoPlaylist>
        </>
      )}
    </>
  );
};
