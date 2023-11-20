import { IUserLookup } from '../../Authentication/SignIn/types';

export interface IVideoLookup {
    id: number | null;
    name: string | null;
    description: string | null;
    videoFile: string | null;
    previewPhotoFile: string | null;
    creator: IUserLookup  | null;
    dateCreated: string  | null;
}

export interface IGetVideoResult {
    videoEntity: IVideoLookup | null;
}

export interface IGetVideoRecomendationResult {
    videoEntities: IVideoLookup[] | null;
}

export interface IVideoUploadRequest {
    name: string;
    description: string;
    previewPhoto: File | null;
    video: File | null;
}