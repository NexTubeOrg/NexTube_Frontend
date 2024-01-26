import { useTranslation } from 'react-i18next';
import { Link, NavLink, Outlet } from 'react-router-dom';
import CheckboxOne from '../../../CheckboxOne';
import { VideoItem } from '../../../Videos/VideoItem';
import { PrimaryProcessingButton } from '../../../common/buttons/PrimaryProcessingButton';
import { PrimaryButtonLink } from '../../../common/links/PrimaryButtonLink';
import {
  IGetUserPlaylistsResult,
  IPlaylistLookup,
} from '../../../Playlists/types';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { IAuthUser, IUser } from '../../../../store/reducers/auth/types';
import http_api from '../../../../services/http_api';
import { store } from '../../../../store';
import {
  IProfilePlaylistsList,
  ProfilePlaylistsActionType,
} from '../../../../store/reducers/profilePlaylists/types';
import HandleOnVisible from '../../../HandleOnVisible';

const EditPlaylistsItem = (props: { playlist: IPlaylistLookup }) => {
  return (
    <>
      <tr className="border-t-2 border-primary">
        <td className="pb-2 text-left">
          <div className="">
            <CheckboxOne text="" onChange={() => {}}></CheckboxOne>
          </div>
        </td>
        <td className="pb-2 text-left">
          <div className="item flex mt-3">
            <div className="playlist mr-3">
              <Link to={`/video/watch/playlist/${props.playlist.id}`}>
                <div className="w-40 h-25 bg-gray rounded-lg">
                  {props.playlist.preview && (
                    <>
                      <img
                        className="w-40 h-25 bg-cover rounded-lg"
                        src={
                          '/api/photo/getPhotoUrl/' +
                          props.playlist.preview +
                          '/600'
                        }
                      />
                    </>
                  )}
                </div>
              </Link>
            </div>

            <div className="text">
              <Link to={`/video/watch/playlist/${props.playlist.id}`}>
                <h3 className="text-white text-lg">{props.playlist.title}</h3>
              </Link>
            </div>
          </div>
        </td>
        <td className="pb-2 text-left">
          <span>{props.playlist.totalCountVideos}</span>
        </td>
        <td className="pb-2 text-right">
          <NavLink
            className="text-primary disabled disabled:text-gray disabled:cursor-default uppercase font-semibold"
            to={''}
          >
            Edit draft
          </NavLink>
        </td>
      </tr>
    </>
  );
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const EditPlaylists = () => {
  const [pageSize] = useState(4);
  const [needLoad, setNeedLoad] = useState<number>(1);

  const { user } = useSelector((store: any) => store.auth as IAuthUser);

  const { playlists, page } = useSelector(
    (store: any) => store.profilePlaylists as IProfilePlaylistsList,
  );

  useEffect(() => {
    console.log('needLoad');

    if (needLoad == 0) {
      console.log('abort loading');
      return;
    }

    fetchPlaylists();
  }, [needLoad]);

  const fetchPlaylists = async () => {
    try {
      store.dispatch({
        type: ProfilePlaylistsActionType.NEXT_PAGE,
      });

      await sleep(200);

      const response = (
        await http_api.get<IGetUserPlaylistsResult>(
          `/api/Video/Playlist/GetUserPlaylists?UserId=${user?.userId}&Page=${page}&PageSize=${pageSize}`,
        )
      ).data;
      const newPlaylists = response.playlists || [];

      store.dispatch({
        type: ProfilePlaylistsActionType.APPEND_TO_LIST_PAGE,
        payload: newPlaylists,
      });
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  const { t } = useTranslation();
  return (
    <>
      <Outlet></Outlet>

      <table className="text-gray w-full table-auto align-top">
        {/* dont touch below */}
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td>
            <div className="relative">
              <div className="absolute right-0 bottom-2">
                <div className="flex items-end w-full justify-end">
                  <div className="w-30">
                    <PrimaryButtonLink
                      urlTo="addPlaylist"
                      title={t('setVideoPlaylist.createNewPlaylist')}
                    ></PrimaryButtonLink>
                  </div>
                </div>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <th className="pb-2 text-left">
            <CheckboxOne text="" onChange={() => {}}></CheckboxOne>
          </th>
          <th className="pb-2 text-left">{t('editPlaylists.playlists')}</th>
          <th className="pb-2 text-left">{t('editPlaylists.countVideos')}</th>
          <th className="pb-2 text-right"></th>
        </tr>
        <>
          <tbody>
            <>
              {playlists?.map((p, key) => (
                <EditPlaylistsItem key={key} playlist={p}></EditPlaylistsItem>
              ))}
            </>
            <HandleOnVisible
              onVisible={() => {
                setNeedLoad((p) => p + 1);
              }}
            ></HandleOnVisible>
          </tbody>
        </>
      </table>
    </>
  );
};
