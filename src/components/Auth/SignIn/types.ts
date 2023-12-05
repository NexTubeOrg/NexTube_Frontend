import { ICommonResult } from '../../../common/common_responces';

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface ILoginResult {
  result: ICommonResult;
  token: string;
}

export interface IUserLookup {
  userId: number | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  roles: string[] | null;
  channelPhoto: string | null;
}
