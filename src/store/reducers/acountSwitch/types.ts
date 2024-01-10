import { IUser } from "../auth/types";

export enum AcountSwitchActionType {
    LOGIN_USER_ADD = 'LOGIN_USER_ADD',
    CLEAR_TOKENS="CLEAR_TOKENS",   
}

export interface IAcountSwitch {
 
  user: IUser[];
  
}
