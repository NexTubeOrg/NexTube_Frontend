import { Link } from 'react-router-dom';
import { IPlaylistLookup } from './types';
import { useTranslation } from 'react-i18next'; // Import the hook
export const PlaylistItem = (props: { playlist: IPlaylistLookup }) => {
  const { t } = useTranslation();
  return (
    <>
      <div className="mb-6 w-75">
        <Link
          to={
            props.playlist.totalCountVideos > 0
              ? `/video/watch/playlist/${props.playlist.id}`
              : '#'
          }
        >
          <div className="relative  h-45 min-w-75 min-h-45 ">
            {props.playlist.preview && (
              <div className="relative z-9">
                <div className="absolute wrapper w-75 h-45 z-1  flex justify-center items-center">
                  <img
                    className="w-75 h-45 rounded-md bg-gray"
                    src={
                      '/api/photo/getPhotoUrl/' +
                      props.playlist.preview +
                      '/600'
                    }
                  />
                </div>
                <div className="absolute -top-2 left-2.5 -z-1 wrapper w-70 h-40 flex justify-center items-center">
                  <img
                    className="w-70 h-40 rounded-md brightness-50 bg-gray"
                    src={
                      '/api/photo/getPhotoUrl/' +
                      props.playlist.preview +
                      '/600'
                    }
                  />
                </div>
              </div>
            )}
            {props.playlist.preview == null && (
              <div className="w-75 h-45 bg-gray">
                <span className="text-white">
                  {t('playlistItem.noPreview')}
                </span>
              </div>
            )}
            <div className="absolute right-2 bottom-2 z-20">
              <div className="bg-secondary opacity-80 px-2 rounded-md">
                <span className="text-white text-sm">
                  {props.playlist.totalCountVideos} video
                  {props.playlist.totalCountVideos == 1 ? '' : 's'}
                </span>
              </div>
            </div>
          </div>
        </Link>

        <div className="flex items-start mt-2">
          <div className="text">
            <h3 className="text-white text-lg">{props.playlist.title}</h3>
            <Link to={`/video/watch/playlist/${props.playlist.id}`}>
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
  );
};
