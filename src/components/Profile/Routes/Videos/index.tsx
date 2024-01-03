import { Link, NavLink, Outlet } from 'react-router-dom';
import CheckboxOne from '../../../CheckboxOne';
import { PrimaryButtonLink } from '../../../common/links/PrimaryButtonLink';
import {
  IGetVideoListChannelResult,
  IVideoLookup,
} from '../../../../pages/Video/common/types';
import { useEffect, useState } from 'react';
import http_api from '../../../../services/http_api';
import { IAuthUser } from '../../../../store/reducers/auth/types';
import { useSelector } from 'react-redux';
import OperationLoader from '../../../../common/OperationLoader';
import HandleOnVisible from '../../../HandleOnVisible';
import { store } from '../../../../store';
import {
  IProfileVideoList,
  ProfileVideosReducerActionsType,
} from '../../../../store/reducers/profileVideos/types';
import { handleError, handleSuccess } from '../../../../common/handleError';
import { DialogConfirm } from '../../../DialogConfirm';

const EditVideoItem = (props: { video: IVideoLookup }) => {
  const [openDialogConfirm, setOpenDialogConfirm] = useState<boolean>(false);

  const onDelete = async (videoId: number | null) => {
    try {
      await http_api.delete(`/api/video/deleteVideo?VideoId=${videoId}`);

      store.dispatch({
        type: ProfileVideosReducerActionsType.DELETE_PROFILE_VIDEO,
        payload: videoId,
      });

      handleSuccess('Video successfully deleted');
    } catch (error) {
      handleError(error);
    }
  };

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
            <div className="video mr-3">
              <Link to={'/video/watch/' + props.video.id}>
                <img
                  className="w-40 h-25"
                  src={
                    '/api/photo/getPhotoUrl/' +
                    props.video.previewPhotoFile +
                    '/600'
                  }
                ></img>
              </Link>
            </div>

            <div className="text">
              <Link to={'/video/watch/' + props.video.id}>
                <h3 className="text-white text-lg">{props.video.name}</h3>
              </Link>
              <p className="text-gray">
                {props.video.description?.slice(0, 20)}...
              </p>
            </div>
          </div>
        </td>
        <td className="pb-2 text-left">
          <span>{props.video.views}</span>
        </td>
        <td className="pb-2 text-left">
          <span>2342</span>
        </td>
        <td className="pb-2 text-right">
          <NavLink
            className="text-primary uppercase font-semibold mr-4"
            to={'editVideo/' + props.video.id}
          >
            Edit draft
          </NavLink>

          <button
            className="text-primary uppercase font-semibold"
            onClick={() => setOpenDialogConfirm(true)}
          >
            Delete
          </button>
        </td>
      </tr>

      <>
        {openDialogConfirm && (
          <DialogConfirm
            handleAgreeClick={async () => onDelete(props.video.id)}
            handleDisagreeClick={async () => setOpenDialogConfirm(false)}
            actionText="Confirm Delete?"
          />
        )}
      </>
    </>
  );
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const ProfileVideos = () => {
  const [pageSize] = useState<number>(5);
  const [canLoad, setCanLoad] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [needLoad, setNeedLoad] = useState<number>(1);

  const { user } = useSelector((store: any) => store.auth as IAuthUser);

  const { videos, page } = useSelector(
    (store: any) => store.profileVideos as IProfileVideoList,
  );

  useEffect(() => {
    const loadVideoAsync = async () => {
      if (needLoad == 0 || !canLoad) {
        console.log('abort loading');
        return;
      }

      store.dispatch({
        type: ProfileVideosReducerActionsType.NEXT_PROFILE_VIDEO_LIST,
      });

      await sleep(200);

      setIsLoading(true);

      const result = (
        await http_api.get<IGetVideoListChannelResult>(
          `/api/video/getVideoListChannel?ChannelId=${user?.userId}&Page=${page}&PageSize=${pageSize}`,
        )
      ).data;

      if (result.videos.length == 0) {
        setCanLoad(false);
      }

      store.dispatch({
        type: ProfileVideosReducerActionsType.APPEND_PROFILE_VIDEO_LIST,
        payload: result,
      });

      setIsLoading(() => false);
    };

    loadVideoAsync();
    console.log(videos);
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
          <td></td>
          <td>
            <div className="relative">
              <div className="absolute right-0 bottom-2">
                <div className="flex items-end w-full justify-end">
                  <div className="w-30">
                    <PrimaryButtonLink
                      urlTo="addVideo"
                      title="Add"
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
          <th className="pb-2 text-left">Videos</th>
          <th className="pb-2 text-left">Views</th>
          <th className="pb-2 text-left">Comments</th>
          <th className="pb-2 text-right">Actions</th>
        </tr>
        {/* render videos here */}
        {videos?.length > 0 &&
          videos.map((v) => <EditVideoItem key={v.id} video={v} />)}
        <>
          {isLoading && <OperationLoader></OperationLoader>}

          <HandleOnVisible
            onVisible={() => {
              setNeedLoad((prevPage) => prevPage + 1);
            }}
          ></HandleOnVisible>
        </>
      </table>
    </>
  );
};
