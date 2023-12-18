import { ICommentLookup } from '../../../components/Comments/Common/types';

export enum VideoCommentsReducerActionTypes {
  SET_COMMENTS_LIST = 'SET_COMMENTS_LIST',
  APPEND_COMMENTS_LIST = 'APPEND_COMMENTS_LIST',
  BEGIN_APPEND_COMMENTS_LIST = 'BEGIN_APPEND_COMMENTS_LIST',
  REMOVE_COMMENT_FROM_COMMENTS_LIST = 'REMOVE_COMMENT_FROM_COMMENTS_LIST',
  NEXT_COMMENTS_PAGE = 'NEXT_COMMENTS_PAGE',
  RESET_COMMENTS = 'RESET_COMMENTS_PAGE',
  APPEND_COMMENT_REPLIES = 'APPEND_COMMENT_REPLIES',
  REMOVE_COMMENT_REPLIES = 'REMOVE_COMMENT_REPLIES',
}
export interface ICommentsList {
  comments: ICommentLookup[];
  page: number;
}
export interface ICommentRepliesList {
  replies: ICommentLookup[];
  rootCommentId: number;
  page: number;
}
