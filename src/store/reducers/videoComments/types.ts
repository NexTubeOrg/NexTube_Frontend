import { ICommentLookup } from '../../../components/Comments/Common/types';

export enum VideoCommentsReducerActionTypes {
  SET_COMMENTS_LIST = 'SET_COMMENTS_LIST',
  APPEND_COMMENTS_LIST = 'APPEND_COMMENTS_LIST',
  BEGIN_APPEND_COMMENTS_LIST = 'BEGIN_APPEND_COMMENTS_LIST',
  NEXT_COMMENTS_PAGE = 'NEXT_COMMENTS_PAGE',
}
export interface ICommentsList {
  comments: ICommentLookup[];
  page: number;
}
