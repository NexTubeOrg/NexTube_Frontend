import { IErrorResult } from './../../../common/common_responces';
import toast from 'react-hot-toast';
import { IUserNotificationsState, NotificationType } from './types';
import 'react-toastify/dist/ReactToastify.css';
import { INotificationLookup } from '../../../components/Notifications/types';

const initState: IUserNotificationsState = {
  notifications: [],
  page: 1,
  pending: false,
};

const notificationStyles = {
  success: 'bg-success text-white',
  error: 'bg-danger text-white',
  warning: 'bg-warning text-black',
};

export const NotificationReducer = (state = initState, action: any): any => {
  switch (action.type) {
    case NotificationType.INFO: {
      toast.success(action.payload, {
        className: notificationStyles.success,
      });
      return state;
    }
    case NotificationType.ERROR: {
      const error = action.payload as IErrorResult;

      toast.error(error.title, {
        className: notificationStyles.error,
      });
      return state;
    }
    case NotificationType.STRING_ERROR: {
      const error = action.payload as string;

      toast.error(error, {
        className: notificationStyles.error,
      });
      return state;
    }
    case NotificationType.GENERAL_ERROR: {
      const error = action.payload as any;
      console.log('GENERAL_ERROR', error);
      toast.error(error.title, {
        className: notificationStyles.error,
      });
      return state;
    }
    case NotificationType.WARNING: {
      toast.error(action.payload, {
        className: notificationStyles.warning,
        icon: '⚠',
      });
      return state;
    }
    case NotificationType.APPEND_NOTIFICATIONS: {
      return {
        ...state,
        notifications: [
          ...state.notifications,
          ...action.payload.filter(
            (newItem: INotificationLookup) =>
              state.notifications.find(
                (c) => c.notificationData.id == newItem.notificationData.id,
              ) == null,
          ),
        ],
      };
    }
    case NotificationType.NEXT_PAGE_NOTIFICATIONS: {
      return {
        ...state,
        page: state.page + 1,
      };
    }
    case NotificationType.RESET_NOTIFICATIONS: {
      return initState;
    }
    case NotificationType.PUSH_NOTIFICATION_TO_FRONT: {
      const pending_notification = action.payload as INotificationLookup;
      pending_notification.pending = true;
      return {
        ...state,
        notifications: [pending_notification, ...state.notifications],
      };
    }
    case NotificationType.SET_PENDING_NOTIFICATIONS_INDICATOR: {
      return {
        ...state,
        pending: action.payload as boolean,
      };
    }

    default:
      return state;
  }
};
