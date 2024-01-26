import {
  ArrowDownTrayIcon,
  EllipsisHorizontalCircleIcon,
  EllipsisVerticalIcon,
  ExclamationTriangleIcon,
  FlagIcon,
} from '@heroicons/react/24/outline';
import { useEffect, useRef, useState } from 'react';
import { handleSuccess } from '../../common/handleError';
import http_api from '../../services/http_api';
import { store } from '../../store';
import { VideoCommentsReducerActionTypes } from '../../store/reducers/videoComments/types';
import DeleteComment from '../Comments/DeleteComment/DeleteComment';
import { SecondaryProcessingButton } from '../common/buttons/SecondaryProcessingButton';
import { IVideoLookup } from '../../pages/Video/common/types';
import { Link } from 'react-router-dom';
import { APP_CONFIG } from '../../env';
import { SetVideoPlaylist } from '../Playlists/SetVideoPlaylist';
import { IconedProcessingButton } from '../common/buttons/IconedButton';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import { t } from 'i18next';

const MoreVideoActions = (props: {
  video: IVideoLookup | undefined;
  handleReportClick: any;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdown = useRef<any>(null);
  const trigger = useRef<any>(null);

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (
        !isOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setIsOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  }, [isOpen]);

  return (
    <>
      <button
        ref={trigger}
        className="w-full h-12 cursor-pointer rounded-md px-2 border border-secondary bg-secondary text-white transition hover:bg-opacity-90"
        onClick={() => {
          setIsOpen((o) => !o);
        }}
      >
        <div className="flex items-center justify-center">
          <div className="w-12 h-12">
            <EllipsisHorizontalIcon></EllipsisHorizontalIcon>
          </div>
        </div>
      </button>
      {isOpen && (
        <div ref={dropdown} className="relative" onBlur={() => {}}>
          <div className="absolute right-0 top-3 bg-black py-3 rounded-lg w-48">
            <div className="">
              <IconedProcessingButton
                isLoading={false}
                onClick={props.handleReportClick}
                text={t('watchVideo.report')}
                type="button"
                icon={<ExclamationTriangleIcon></ExclamationTriangleIcon>}
                backgroundClassname="black dark:hover:bg-secondary"
              ></IconedProcessingButton>
            </div>

            <div className="">
              <Link
                className=""
                to={
                  APP_CONFIG.API_URL +
                  'video/getVideoUrl?VideoFileId=' +
                  props.video?.videoFile
                }
              >
                <IconedProcessingButton
                  isLoading={false}
                  onClick={() => {}}
                  text={t('watchVideo.download')}
                  type="button"
                  icon={<ArrowDownTrayIcon></ArrowDownTrayIcon>}
                  backgroundClassname="black dark:hover:bg-secondary"
                ></IconedProcessingButton>
              </Link>
            </div>

            <div className="">
              <SetVideoPlaylist video={props.video}></SetVideoPlaylist>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default MoreVideoActions;
