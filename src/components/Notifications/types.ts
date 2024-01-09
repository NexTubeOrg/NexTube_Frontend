import { IVideoLookup } from '../../pages/Video/common/types';
import { IUserLookup } from '../Auth/SignIn/types';

export enum TypeOfNotification {
  NewVideo,
}

export interface INotificationLookup {
  type: TypeOfNotification;
  notificationIssuer: IUserLookup;
  notificationData: IVideoLookup;
  dateCreated: string;
  pending: boolean;
}
