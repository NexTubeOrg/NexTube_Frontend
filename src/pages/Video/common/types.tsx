import { IUser } from '../../../store/reducers/auth/types';

export interface IVideoLookup {
    id: number | null;
    name: string | null;
    description: string | null;
    videoFile: string | null;
    previewPhotoFile: string | null;
    creator: IUser  | null;
    dateCreated: string  | null;
}

export interface IGetVideoResult {
    video: IVideoLookup;
}

export interface IGetVideoListResult {
    videos: IVideoLookup[];
}

export interface IVideoUploadRequest {
    name: string;
    description: string;
    previewPhoto: File | null;
    video: File | null;
}