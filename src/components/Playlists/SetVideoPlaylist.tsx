import { handleSuccess } from '../../common/handleError';
import { IGetUserPlaylistsResult, IVideoPlaylistUserStatus } from './types';
import http_api from '../../services/http_api';
import { IVideoLookup } from '../../pages/Video/common/types';
import { useEffect, useState } from 'react';
import { IconedProcessingButton } from '../common/buttons/IconedButton';
import { GlobeAltIcon, PlusIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { CancelButton } from '../common/buttons/CancelButton';
import CheckboxOne from '../CheckboxOne';
import CheckboxFour from '../CheckboxFour';
import { DefaultInput, FieldEditInput } from '../common/inputs';
import { CreatePlaylistOverlay } from '../Profile/Routes/Playlists/CreatePlaylistOverlay';
import { Link, Outlet } from 'react-router-dom';
import { SecondaryProcessingButton } from '../common/buttons/SecondaryProcessingButton';
import { PrimaryButtonLink } from '../common/links/PrimaryButtonLink';
import { useTranslation } from 'react-i18next';
import { t } from 'i18next';

const SelectVideoPlaylist = (props: {
  handleDisagreeClick: () => Promise<void> | null;
  playlists: IVideoPlaylistUserStatus[];
  handlePlaylistToggle: (playlistId: number) => Promise<void> | null;
}) => {
  const { t } = useTranslation(); 
  return (
    <>
      <React.Fragment>
        <div className="fixed inset-0 flex items-center justify-center bg-secondary bg-opacity-75 z-50 rounded-md">
          <div className=" bg-body py-4 px-8 rounded-md text-center w-[24rem]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl text-white">{t("setVideoPlaylist.saveVideo")}</h2>

              <CancelButton
                onClick={() => {
                  props.handleDisagreeClick();
                }}
              ></CancelButton>
            </div>
            <div className="text-white ">
              <div className="">
                <ul className="w-full h-100 overflow-y-scroll default-custom-scrollbar">
                  {props.playlists.map((p) => (
                    <li key={p.playlist.id}>
                      <div className="mb-3 w-full flex justify-between items-center">
                        <CheckboxFour
                          name={p.playlist.title}
                          id={p.playlist.id.toString()}
                          isChecked={p.isVideoInPlaylist}
                          description=""
                          onChange={(e) => {
                            props.handlePlaylistToggle(
                              parseInt(e.target.value),
                            );
                          }}
                        ></CheckboxFour>
                        <div className="w-5 h-5 mr-5">
                          <GlobeAltIcon></GlobeAltIcon>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="mt-2">
                  <Link
                    to={'/profile/playlists/addPlaylist'}
                    className={`w-full cursor-pointer rounded-md  text-white transition hover:bg-opacity-90`}
                  >
                    <div className="flex items-center">
                      <div className="h-8 w-8 mr-2">
                        <PlusIcon></PlusIcon>
                      </div>
                      <span className="font-bold">{t('setVideoPlaylist.createNewPlaylist')}</span>
                    </div>
                  </Link>
                </div>
              </div>
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
        text={t("watchVideo.saveToPlaylist")}
        type="button"
        icon={<PlusIcon></PlusIcon>}
        backgroundClassname="black  dark:hover:bg-secondary"
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

export const SetVideoPlaylistShort = (props: {
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
      <Link
        to={'#'}
        onClick={() => {
          setIsShown((p) => !p);
        }}
      >
        Set playlist
      </Link>

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
