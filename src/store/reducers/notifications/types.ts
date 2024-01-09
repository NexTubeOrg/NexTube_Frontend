import { INotificationLookup } from '../../../components/Notifications/types';

export enum NotificationType {
  ERROR = 'ERROR',
  INFO = 'INFO',
  WARNING = 'WARNING',
  STRING_ERROR = 'STRING_ERROR',
  GENERAL_ERROR = 'GENERAL_ERROR',
  APPEND_NOTIFICATIONS = 'APPEND_NOTIFICATIONS',
  NEXT_PAGE_NOTIFICATIONS = 'NEXT_PAGE_NOTIFICATIONS',
  RESET_NOTIFICATIONS = 'RESET_NOTIFICATIONS',
  PUSH_NOTIFICATION_TO_FRONT = 'PUSH_NOTIFICATION_TO_FRONT',
  SET_PENDING_NOTIFICATIONS_INDICATOR = 'SET_PENDING_NOTIFICATIONS_INDICATOR',
}

export interface IUserNotificationsState {
  notifications: INotificationLookup[];
  page: number;
  pending: boolean;
}
