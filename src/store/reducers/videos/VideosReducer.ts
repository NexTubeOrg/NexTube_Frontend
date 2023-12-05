import { IVideoList, VideoReducerActionsType } from "./types";

const initState: IVideoList = {
    videos: [],
    page: 1,
    pageSize: 6,
};

export const VideosReducer = (state = initState, action: any): any => {
    switch (action.type) {

        case VideoReducerActionsType.APPEND_VIDEO_LIST:
            return {
                videos: [...state.videos, ...action.payload.videos],
                page: state.page,
                pageSize: state.pageSize
            };

        case VideoReducerActionsType.NEXT_VIDEO_LIST:
            return {
                videos: state.videos,
                page: state.page + 1,
                pageSize: state.pageSize,
            };

        default:
            return state;
    }
};