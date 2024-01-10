import { Link } from 'react-router-dom';
import { IPlaylistLookup } from './types';

export const PlaylistItem = (props: { playlist: IPlaylistLookup }) => {
  return (
    <>
      <div className="bg-black mb-3">
        <Link to={'/playlists/' + props.playlist.id}>
          <div className="relative w-75 h-45 overflow-hidden min-w-75 min-h-45">
            {props.playlist.preview && (
              <div className="wrapper w-75 h-45 bg-gray flex justify-center items-center">
                <img
                  className="bg-cover"
                  src={
                    '/api/photo/getPhotoUrl/' + props.playlist.preview + '/600'
                  }
                />
              </div>
            )}
            {props.playlist.preview == null && (
              <div className="w-75 h-45 bg-gray">
                <span className="text-white">No preview</span>
              </div>
            )}
            <div className="absolute right-0 bottom-0">
              <div className="bg-gray">
                <span className="text-white">
                  {props.playlist.totalCountVideos} video
                  {props.playlist.totalCountVideos == 1 ? '' : 's'}
                </span>
              </div>
            </div>
          </div>
        </Link>

        <div className="flex items-start mt-5">
          <div className="text">
            <h3 className="text-white text-lg">{props.playlist.title}</h3>
          </div>
        </div>
      </div>
    </>
  );
};
