import { ICommonResult } from '../../../common/common_responces';

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface ILoginResult {
  result: ICommonResult;
  token: string;
}
