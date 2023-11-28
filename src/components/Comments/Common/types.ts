import { IUser } from '../../../store/reducers/auth/types';
import { ICommentRepliesList } from '../../../store/reducers/videoComments/types';

export interface ICommentLookup {
  commentId: number;
  content: string;
  creator: IUser;
  dateCreated: string;
  replies: ICommentLookup[];
  canLoadReplies: boolean | undefined;
}

export interface IGetVideoCommentListResult {
  comments: ICommentLookup[];
}

export interface IAddNewCommentRequest {
  content: string;
  videoId: number;
}
