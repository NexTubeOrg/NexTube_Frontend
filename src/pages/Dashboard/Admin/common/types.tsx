import { IUser } from "../../../../store/reducers/auth/types";



export enum TypeOfReport {
    sexualContent,
    violentContent,
    abusiveContent,
    harmfulActs,
    spam,
    other
}

export interface ReportLookup {
    abuser: IUser | null;
    creator: IUser | null;
    body: string | null;
    type: TypeOfReport| null;
    id: number | null;
    videoId: number | null;
    dateCreated: string | null;
}

export interface IGetUserResult {
    user: IUser;
}

export interface IGetUserListResult {
   users: IUser[];
}
