import { IUser } from "../auth/types";

export enum AcountSwitchActionType {
    LOGIN_USER_ADD = 'LOGIN_USER_ADD',
    
}

export interface IAcountSwitch {
 
  user: IUser[];
  
}
