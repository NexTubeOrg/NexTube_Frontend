import { IProfileVideoList, ProfileVideosReducerActionsType } from "./types";

const initState: IProfileVideoList = {
    videos: [],
    page: 1,
};

export const ProfileVideosReducer = (state = initState, action: any): any => {
    switch (action.type) {

        case ProfileVideosReducerActionsType.APPEND_PROFILE_VIDEO_LIST:
            return {
                ...state,
                videos: [...state.videos, ...action.payload.videos],
            };

        case ProfileVideosReducerActionsType.NEXT_PROFILE_VIDEO_LIST:
            return {
                ...state,
                page: state.page + 1,
            };

        case ProfileVideosReducerActionsType.APPEND_BEGIN_PROFILE_VIDEO:
            return {
                ...state,
                videos: [action.payload, ...state.videos],
            };

        case ProfileVideosReducerActionsType.DELETE_PROFILE_VIDEO:
            return {
                ...state,
                videos: [...state.videos.filter((video) => video.id !== action.payload)],
            };

        case ProfileVideosReducerActionsType.EDIT_PROFILE_VIDEO:
            return {
                ...state,
                videos: state.videos.map(v => v.id == action.payload.id ? action.payload : v),
            }


        case ProfileVideosReducerActionsType.CLEAR_PROFILE_VIDEO_STORE:
            return initState;

        default:
            return state;
    }
};