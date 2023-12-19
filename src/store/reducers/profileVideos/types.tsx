import { IVideoLookup } from "../../../pages/Video/common/types";

export enum ProfileVideosReducerActionsType {
    APPEND_PROFILE_VIDEO_LIST = "APPEND_PROFILE_VIDEO_LIST",
    NEXT_PROFILE_VIDEO_LIST = "NEXT_PROFILE_VIDEO_LIST",
    APPEND_BEGIN_PROFILE_VIDEO = "APPEND_BEGIN_PROFILE_VIDEO",
    DELETE_PROFILE_VIDEO = "DELETE_PROFILE_VIDEO",
    EDIT_PROFILE_VIDEO = "EDIT_PROFILE_VIDEO",
    CLEAR_PROFILE_VIDEO_STORE = "CLEAR_PROFILE_VIDEO_STORE",
}

export interface IProfileVideoList {
    videos: IVideoLookup[];
    page: number;
}