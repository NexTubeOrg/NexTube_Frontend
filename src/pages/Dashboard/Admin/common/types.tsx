

export interface IUserLookup {
    id: number | null;
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    channelPhoto: string | null;
    roles: number | null;
}

export enum TypeOfReport {
    sexualContent,
    violentContent,
    abusiveContent,
    harmfulActs,
    spam,
    other
}

export interface ReportLookup {
    abuser: IUserLookup | null;
    creator: IUserLookup | null;
    body: string | null;
    type: TypeOfReport| null;
    id: number | null;
    videoId: number | null;
    dateCreated: string | null;
}

export interface IGetUserResult {
    user: IUserLookup;
}

export interface IGetUserListResult {
   users: IUserLookup[];
}
