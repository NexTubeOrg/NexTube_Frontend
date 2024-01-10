import React, { useEffect, useState } from 'react';
import http_api from '../../services/http_api';
import { IGetPlaylistVideos } from './types';
import { Link, useNavigate, useParams } from 'react-router-dom';
import OperationLoader from '../../common/OperationLoader';
import HandleOnVisible from '../HandleOnVisible';
import { IVideoLookup } from '../../pages/Video/common/types';
import classNames from 'classnames';

const PlaylistVideoItem = (props: {
  video: IVideoLookup;
  playlistId: string;
  currentVideoId: string;
}) => {
  return (
    <>
      <Link
        to={`/video/watch/${props.video.id}/playlist/${props.playlistId}`}
        title={props.video.name ?? ''}
      >
        <div
          className={classNames('pl-4 pb-2 pt-2 hover:bg-secondary', {
            'bg-graydark': props.video.id?.toString() === props.currentVideoId,
            ' hover:bg-primary':
              props.video.id?.toString() === props.currentVideoId,
          })}
        >
          <div className="item mr-3 flex ">
            <img
              className="w-30 h-20"
              src={
                '/api/photo/getPhotoUrl/' +
                props.video.previewPhotoFile +
                '/600'
              }
            />

            <div className="flex items-start ml-3">
              <div className="text">
                <h3 className="text-white text-lg">
                  {props.video.name?.length! > 30
                    ? props.video.name?.slice(0, 30) + '...'
                    : props.video.name}
                </h3>
                <div>
                  <h4 className="text-gray font-bold text-sm">
                    {props.video.creator?.firstName.length! > 15
                      ? props.video.creator?.firstName?.slice(0, 15) + '...'
                      : props.video.creator?.firstName}{' '}
                    {props.video.creator?.lastName.length! > 15
                      ? props.video.creator?.lastName?.slice(0, 15) + '...'
                      : props.video.creator?.lastName}
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

const PlaylistVideosContainer = () => {
  const { playlistId, videoId } = useParams();

  const [videos, setVideos] = useState<IVideoLookup[]>([]);
  const [title, setTitle] = useState<string>('Loading...');
  const [page, setPage] = useState(1);
  const [pageSize] = useState(6);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const fetchVideos = async () => {
    try {
      const response = (
        await http_api.get<IGetPlaylistVideos>(
          `/api/Video/Playlist/GetPlaylistVideos?PlaylistId=${playlistId}&Page=${page}&PageSize=${pageSize}`,
        )
      ).data;
      const newVideos = response.videos || [];
      setTitle(response.title);
      setVideos((prev) => {
        if (newVideos.length < 1) return prev;
        if (prev.find((p) => p.id == newVideos[0].id) != null) return prev;

        return [...prev, ...newVideos];
      });
    } catch (error) {
      console.error('Error fetching playlist videos:', error);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, [page]);

  // useEffect(() => {
  //   if (videoId !== undefined)
  //     return;

  //   if (videos.length < 1)
  //     fetchVideos();
  // }, [videoId]);

  useEffect(() => {
    console.log('playlists', videoId, videos, videos.length);
    console.log(
      typeof videoId !== 'undefined' && videoId !== 'undefined',
      videos == null,
      videos.length == 0,
    );
    if (
      (typeof videoId !== 'undefined' && videoId !== 'undefined') ||
      videos == null ||
      videos.length == 0
    )
      return;
    console.log('playlists ok');
    const firstVideoId = videos.find(() => true)?.id;
    navigate(`/video/watch/${firstVideoId}/playlist/${playlistId}`);
  }, [videos]);

  return (
    <>
      <div className="outer border-2 border-secondary rounded-lg">
        <div className="bg-secondary px-4 pb-2 pt-2">
          <h1 className="text-white text-3xl">{title}</h1>
          <div className="mt-1 mb-6 flex">
            <div className="mr-2">
              <span className="text-white">
                {videos.length > 0 &&
                  videos[0].creator?.firstName +
                    ' ' +
                    videos[0].creator?.lastName}
              </span>
            </div>

            <span className="text-gray">1/19</span>
          </div>
        </div>
        <div>
          <ul className="w-full h-100 overflow-y-scroll custom-scrollbar">
            {videos.map((v) => (
              <li key={v.id}>
                <PlaylistVideoItem
                  currentVideoId={videoId ?? ''}
                  playlistId={playlistId ?? ''}
                  video={v}
                ></PlaylistVideoItem>
              </li>
            ))}
            <li>
              {isLoading && <OperationLoader></OperationLoader>}
              <HandleOnVisible
                onVisible={() => {
                  setPage((page) => page + 1);
                  // setNeedLoad((prevPages) => prevPages + 1);
                }}
              ></HandleOnVisible>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default PlaylistVideosContainer;
