import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { INotificationLookup } from './types';
import { useSelector } from 'react-redux';
import { IAuthUser } from '../../store/reducers/auth/types';
import {
  IUserNotificationsState,
  NotificationType,
} from '../../store/reducers/notifications/types';
import { store } from '../../store';
import http_api from '../../services/http_api';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import { ChannelPhoto } from '../ChannelPhoto';
import HandleOnVisible from '../HandleOnVisible';
import OperationLoader from '../../common/OperationLoader';
dayjs.extend(relativeTime);
import * as SignalR from '@microsoft/signalr';
import { getToken } from '../../services/tokenService';
import classNames from 'classnames';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const DropdownNotification = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [hub, setHub] = useState<SignalR.HubConnection>();
  const [needLoad, setNeedLoad] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);

  const { user } = useSelector((store: any) => store.auth as IAuthUser);
  const { notifications, page, pending } = useSelector(
    (store: any) => store.notify as IUserNotificationsState,
  );

  useEffect(() => {
    const signalr_notifications = new SignalR.HubConnectionBuilder()
      .withUrl('/signalr/notifications', {
        transport: SignalR.HttpTransportType.WebSockets,
        accessTokenFactory: () => {
          return getToken() ?? '';
        },
      })
      .configureLogging(SignalR.LogLevel.Warning)
      .build();

    signalr_notifications.on(
      'OnNotificationReceived',
      (notification: INotificationLookup) => {
        store.dispatch({
          type: NotificationType.SET_PENDING_NOTIFICATIONS_INDICATOR,
          payload: true,
        });
        store.dispatch({
          type: NotificationType.PUSH_NOTIFICATION_TO_FRONT,
          payload: notification,
        });
      },
    );

    signalr_notifications.start().catch((e: any) => {
      console.error('signalr error', e);
    });

    setHub(signalr_notifications);
  }, [user]);

  useEffect(() => {
    if (dropdownOpen == false) return;

    store.dispatch({
      type: NotificationType.SET_PENDING_NOTIFICATIONS_INDICATOR,
      payload: false,
    });
  }, [dropdownOpen]);

  useEffect(() => {
    if (dropdownOpen == false) return;
    console.log('needLoad dropdownOpen == true');

    fetchPlaylists();
  }, [dropdownOpen, needLoad]);

  const fetchPlaylists = async () => {
    try {
      store.dispatch({
        type: NotificationType.NEXT_PAGE_NOTIFICATIONS,
      });

      await sleep(200);
      setIsLoading(true);
      const response = (
        await http_api.get<INotificationLookup[]>(
          `/api/User/GetUserNotifications?Page=${page}&PageSize=${2}`,
        )
      ).data;
      const newNotifications = response || [];

      store.dispatch({
        type: NotificationType.APPEND_NOTIFICATIONS,
        payload: newNotifications,
      });
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <li className="relative">
      <Link
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        to="#"
        className="relative flex h-8.5 w-8.5 items-center justify-center rounded-full border-[0.5px] border-stroke bg-gray hover:text-primary dark:border-strokedark dark:bg-meta-4 dark:text-white"
      >
        {pending && (
          <span className="absolute -top-0.5 right-0 z-1 h-2 w-2 rounded-full bg-meta-1">
            <span className="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-meta-1 opacity-75"></span>
          </span>
        )}

        <svg
          className="fill-current duration-300 ease-in-out"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.1999 14.9343L15.6374 14.0624C15.5249 13.8937 15.4687 13.7249 15.4687 13.528V7.67803C15.4687 6.01865 14.7655 4.47178 13.4718 3.31865C12.4312 2.39053 11.0812 1.7999 9.64678 1.6874V1.1249C9.64678 0.787402 9.36553 0.478027 8.9999 0.478027C8.6624 0.478027 8.35303 0.759277 8.35303 1.1249V1.65928C8.29678 1.65928 8.24053 1.65928 8.18428 1.6874C4.92178 2.05303 2.4749 4.66865 2.4749 7.79053V13.528C2.44678 13.8093 2.39053 13.9499 2.33428 14.0343L1.7999 14.9343C1.63115 15.2155 1.63115 15.553 1.7999 15.8343C1.96865 16.0874 2.2499 16.2562 2.55928 16.2562H8.38115V16.8749C8.38115 17.2124 8.6624 17.5218 9.02803 17.5218C9.36553 17.5218 9.6749 17.2405 9.6749 16.8749V16.2562H15.4687C15.778 16.2562 16.0593 16.0874 16.228 15.8343C16.3968 15.553 16.3968 15.2155 16.1999 14.9343ZM3.23428 14.9905L3.43115 14.653C3.5999 14.3718 3.68428 14.0343 3.74053 13.6405V7.79053C3.74053 5.31553 5.70928 3.23428 8.3249 2.95303C9.92803 2.78428 11.503 3.2624 12.6562 4.2749C13.6687 5.1749 14.2312 6.38428 14.2312 7.67803V13.528C14.2312 13.9499 14.3437 14.3437 14.5968 14.7374L14.7655 14.9905H3.23428Z"
            fill=""
          />
        </svg>
      </Link>

      <div
        ref={dropdown}
        className={`absolute w-[560px] -right-27 mt-2.5 flex h-90 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark sm:right-0 ${
          dropdownOpen === true ? 'block' : 'hidden'
        }`}
      >
        <div className="px-4.5 py-3">
          <h5 className="text-sm font-medium text-bodydark2">Notification</h5>
        </div>

        <ul className="flex h-auto flex-col overflow-y-auto">
          {notifications.map((n, index) => (
            <li key={index}>
              <Link
                className={classNames(
                  'flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4',
                  { ' bg-secondary': n.pending },
                )}
                to={`/video/watch/${n.notificationData?.id}`}
              >
                <div className="flex">
                  <div className="left">
                    <div className="w-16">
                      <ChannelPhoto
                        photoFileId={n.notificationIssuer.channelPhoto}
                      ></ChannelPhoto>
                    </div>
                  </div>
                  <div className="middle w-70">
                    <span className="text-sm">
                      <span className="text-black dark:text-gray">
                        New video in channel{' '}
                        <span className=" text-white">
                          {n.notificationIssuer?.firstName ?? ''}{' '}
                          {n.notificationIssuer?.lastName ?? ''}
                          {': '}
                        </span>
                        <div className="my-1">
                          <p className="text-white">
                            {n.notificationData.name}
                          </p>
                        </div>
                      </span>{' '}
                    </span>
                    <p className="text-xs">{dayjs(n.dateCreated).fromNow()}</p>
                  </div>
                  <div className="right h-24 w-40">
                    <img
                      className="h-24 w-40"
                      src={
                        '/api/photo/getPhotoUrl/' +
                        n.notificationData.previewPhotoFile +
                        '/150'
                      }
                    />
                  </div>
                </div>
              </Link>
            </li>
          ))}
          <li>
            <HandleOnVisible
              onVisible={() => {
                setNeedLoad((p) => p + 1);
              }}
            ></HandleOnVisible>
          </li>
          <li>{isLoading && <OperationLoader></OperationLoader>}</li>
        </ul>
      </div>
    </li>
  );
};

export default DropdownNotification;
