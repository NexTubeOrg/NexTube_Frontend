import { IProfileVideoList, ProfileVideosReducerActionsType } from "./types";

const initState: IProfileVideoList = {
    videos: [],
    page: 1,
};

export const ProfileVideosReducer = (state = initState, action: any): any => {
    switch (action.type) {

        case ProfileVideosReducerActionsType.APPEND_PROFILE_VIDEO_LIST:
            return {
                videos: [...state.videos, ...action.payload.videos],
                page: state.page,
            };

        case ProfileVideosReducerActionsType.NEXT_PROFILE_VIDEO_LIST:
            return {
                videos: state.videos,
                page: state.page + 1,
            };

        case ProfileVideosReducerActionsType.APPEND_PROFILE_VIDEO:
            return {
                videos: [...state.videos, action.payload.video],
                page: state.page,
            };

        case ProfileVideosReducerActionsType.CLEAR_PROFILE_VIDEO_STORE:
            return initState;

        default:
            return state;
    }
};