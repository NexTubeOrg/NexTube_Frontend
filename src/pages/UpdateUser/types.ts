import { ICommonResult } from "../../common/common_responces";

export interface IUserUpdate {
    [x: string]: any;
    nickname: string;
    description: string;
  }
  export interface ILoginResult {
    json(): unknown;
    result: ICommonResult;
    token: string;
  }