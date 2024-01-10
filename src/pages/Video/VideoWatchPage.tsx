import { Outlet, useParams } from 'react-router-dom';
import http_api from '../../services/http_api';
import { useEffect, useState } from 'react';
import { IGetVideoResult, IVideoLookup } from './common/types';
import { WatchVideo } from '../../components/Videos/WatchVideo';
import classNames from 'classnames';

const VideoWatchPage = () => {
  const { videoId, playlistId } = useParams();

  useEffect(() => {
    const request = async () => {
      const result = await http_api.get<IGetVideoResult>(
        '/api/video/getVideo?VideoId=' + videoId,
      );
      setVideo(result.data.video);
    };
    request();
  }, [videoId]);

  const [video, setVideo] = useState<IVideoLookup>();

  return (
    <>
      <div className="flex">
        <div
          className={classNames('', {
            'w-full': playlistId === undefined,
            ' w-3/4': playlistId,
          })}
        >
          {video && <WatchVideo video={video} />}
        </div>
        {playlistId && (
          <div className="w-1/4 mt-6 mr-6">
            <div className="w-full">
              <Outlet></Outlet>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default VideoWatchPage;
