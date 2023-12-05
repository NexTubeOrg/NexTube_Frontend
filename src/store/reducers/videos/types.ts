import { IVideoLookup } from "../../../pages/Video/common/types";

export enum VideoReducerActionsType {
    SET_VIDEO_LIST = "SET_VIDEO_LIST",
    APPEND_VIDEO_LIST = "APPEND_VIDEO_LIST",
    NEXT_VIDEO_LIST = "NEXT_VIDEO_LIST",
}

export interface IVideoList {
    videos: IVideoLookup[];
    page: number;
    pageSize: number;
}