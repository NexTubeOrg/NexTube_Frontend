import { AxiosError, HttpStatusCode } from 'axios';
import { store } from '../store';
import { NotificationType } from '../store/reducers/notifications/types';

export const handleError = (error: any) => {
  if (typeof error === 'string') {
    console.log('error is string');
    store.dispatch({
      type: NotificationType.STRING_ERROR,
      payload: error,
    });
    return;
  }
  const e = error as AxiosError;
  console.log('handle error', e);
  switch (e.response?.status as HttpStatusCode) {
    case HttpStatusCode.InternalServerError: {
      store.dispatch({
        type: NotificationType.STRING_ERROR,
        payload: e.response?.statusText,
      });
      break;
    }
    case HttpStatusCode.UnprocessableEntity: {
      store.dispatch({
        type: NotificationType.GENERAL_ERROR,
        payload: e.response?.data,
      });
      break;
    }
    default: {
      store.dispatch({
        type: NotificationType.ERROR,
        payload: e.response?.data,
      });
    }
  }
};

export const handleSuccess = (msg: any) => {
  store.dispatch({
    type: NotificationType.INFO,
    payload: msg,
  });
};

export const handleWarning = (msg: any) => {
  store.dispatch({
    type: NotificationType.WARNING,
    payload: msg,
  });
};
