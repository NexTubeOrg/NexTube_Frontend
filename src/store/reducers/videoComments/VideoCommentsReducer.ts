import { ICommentLookup } from '../../../components/Comments/Common/types';
import { ICommentsList, VideoCommentsReducerActionTypes } from './types';

const initState: ICommentsList = {
  comments: [],
  page: 1,
};

export const VideoCommentsReducer = (state = initState, action: any): any => {
  switch (action.type) {
    case VideoCommentsReducerActionTypes.SET_COMMENTS_LIST: {
      const commentList = action.payload as ICommentLookup[];
      return { comments: commentList };
    }
    case VideoCommentsReducerActionTypes.APPEND_COMMENTS_LIST: {
      const commentList = action.payload as ICommentLookup[];
      const currentState = state as ICommentsList;

      return {
        comments: [...currentState.comments, ...commentList],
        page: currentState.page,
      };
    }
    case VideoCommentsReducerActionTypes.NEXT_COMMENTS_PAGE: {
      const currentState = state as ICommentsList;

      return {
        comments: currentState.comments,
        page: currentState.page + 1,
      };
    }
    default:
      return state;
  }
};
