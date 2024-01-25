// src/components/Notifications/DropdownNotification.tsx
import React, { useEffect, useRef, useState } from 'react';
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
import * as SignalR from '@microsoft/signalr';
import { getToken } from '../../services/tokenService';
import classNames from 'classnames';
import { BellIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

dayjs.extend(relativeTime);

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const DropdownNotification = () => {
  const { t } = useTranslation();
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
        className="relative flex items-center justify-center"
      >
        {pending && (
          <span className="absolute -top-1.5 right-0 z-1 h-4 w-4 rounded-full bg-meta-1">
            <span className="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-meta-1 opacity-75"></span>
          </span>
        )}
        <div className="w-8 text-gray">
          <BellIcon></BellIcon>
        </div>
      </Link>

      <div
        ref={dropdown}
        className={`absolute w-[560px]  z-999999 min-[1300px]:-left-1 min-[500px]:-right-30 mt-2.5 flex h-90 flex-col rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ${
          dropdownOpen === true ? 'block' : 'hidden'
        }`}
      >
        <div className="px-4.5 py-3">
          <h5 className="text-sm font-medium text-bodydark2">{t('dropdownNotification.notification')}</h5>
        </div>

        <ul className="flex h-auto flex-col overflow-y-auto custom-scrollbar overscroll-contain">
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
                        {t('dropdownNotification.newVideoInChannel')}{' '}
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
