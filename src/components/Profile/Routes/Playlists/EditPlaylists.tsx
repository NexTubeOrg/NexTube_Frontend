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
              <Link to={`/playlists/${props.playlist.id}`}>
                <div className="w-40 h-25 bg-gray">
                  {props.playlist.preview && (
                    <>
                      <img
                        className="w-40 h-25 bg-cover"
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
              <Link to={`/playlists/${props.playlist.id}`}>
                <h3 className="text-white text-lg">{props.playlist.title}</h3>
              </Link>
            </div>
          </div>
        </td>
        <td className="pb-2 text-left">
          <span>{props.playlist.totalCountVideos}</span>
        </td>
        <td className="pb-2 text-right">
          <NavLink className="text-primary uppercase font-semibold" to={''}>
            Edit draft
          </NavLink>
        </td>
      </tr>
    </>
  );
};

export const EditPlaylists = () => {
  const [playlists, setPlaylists] = useState<IPlaylistLookup[]>([]);
  const { user } = useSelector((store: any) => store.auth as IAuthUser);

  const [page, setPage] = useState(1);
  const [pageSize] = useState(40);
  const [needLoad, setNeedLoad] = useState<number>(1);

  const fetchPlaylists = async () => {
    try {
      const response = (
        await http_api.get<IGetUserPlaylistsResult>(
          `/api/Video/Playlist/GetUserPlaylists?UserId=${user?.userId}&Page=${page}&PageSize=${pageSize}`,
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
                      title="Create playlist"
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
          <th className="pb-2 text-left">Playlists</th>
          <th className="pb-2 text-left">Count videos</th>
          <th className="pb-2 text-right"></th>
        </tr>
        <>
          <tbody>
            <>
              {playlists.map((p, key) => (
                <EditPlaylistsItem key={key} playlist={p}></EditPlaylistsItem>
              ))}
            </>
          </tbody>
        </>
      </table>
    </>
  );
};
