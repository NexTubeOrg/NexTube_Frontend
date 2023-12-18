import { ICommentLookup } from '../../../components/Comments/Common/types';
import {
  ICommentRepliesList,
  ICommentsList,
  VideoCommentsReducerActionTypes,
} from './types';

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
    case VideoCommentsReducerActionTypes.BEGIN_APPEND_COMMENTS_LIST: {
      const commentList = action.payload as ICommentLookup[];
      const currentState = state as ICommentsList;

      return {
        comments: [...commentList, ...currentState.comments],
        page: currentState.page,
      };
    }
    case VideoCommentsReducerActionTypes.REMOVE_COMMENT_FROM_COMMENTS_LIST: {
      const commentId = action.payload as number;

      const newComments = state.comments.filter(
        (e) => e.commentId != commentId,
      );

      // try to find reply and remove it
      newComments.forEach((c) => {
        if (c.replies != undefined && c.replies.length > 0)
          c.replies = c.replies.filter((r) => r.commentId != commentId);
      });

      return {
        comments: newComments,
        page: state.page,
      };
    }
    case VideoCommentsReducerActionTypes.NEXT_COMMENTS_PAGE: {
      const currentState = state as ICommentsList;

      return {
        comments: currentState.comments,
        page: currentState.page + 1,
      };
    }
    case VideoCommentsReducerActionTypes.APPEND_COMMENT_REPLIES: {
      const commentReplies = action.payload as ICommentRepliesList;
      console.log('dsaadsadsds');
      const rootComment = state.comments.find(
        (rootComment) => rootComment.commentId == commentReplies.rootCommentId,
      );

      if (rootComment === undefined) return state;

      commentReplies.replies.forEach((r) => (r.canLoadReplies = false));
      rootComment.replies = [
        ...(rootComment?.replies ?? []),
        ...commentReplies.replies,
      ];
      return {
        comments: state.comments,
        page: state.page,
      };
    }
    case VideoCommentsReducerActionTypes.RESET_COMMENTS: {
      return initState;
    }
    default:
      return state;
  }
};
