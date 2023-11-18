import { IUser } from '../../../store/reducers/auth/types';

export interface ICommentLookup {
  commentId: number;
  content: string;
  creator: IUser;
  dateCreated: string;
}

export interface IGetVideoCommentListResult {
  comments: ICommentLookup[];
}

export interface IAddNewCommentRequest {
  content: string;
  videoId: number;
}
