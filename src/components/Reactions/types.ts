export interface IVideoReactions {
  likes: number;
  dislikes: number;
  wasLikedByRequester: boolean;
  wasDislikedByRequester: boolean;
}
export enum ReactionTypes {
  Like = 0,
  Dislike = 1,
}
