 

export enum AuthUserActionType {
    LOGIN_USER = 'AUTH_LOGIN_USER',
    LOGOUT_USER = 'AUTH_LOGOUT_USER',
   
}

export interface IAuthUser {
  isAuth: boolean;
  user?: IUser;
}

export interface IUser {
  email: string;
  firstName: string;
  lastName: string;
  nickname: string;
  description: string;
  channelPhoto: string;
  roles: string[];
  userId: number;
}
 
 
