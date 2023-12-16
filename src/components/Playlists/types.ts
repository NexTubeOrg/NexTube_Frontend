import { IVideoLookup } from '../../pages/Video/common/types';

export interface IPlaylistLookup {
  id: number;
  title: string;
  totalCountVideos: number;
  videos: IVideoLookup[] | null | undefined;
  preview: string | null;
}

export interface IGetUserPlaylistsResult {
  playlists: IPlaylistLookup[];
}

export interface IGetPlaylistVideos {
  videos: IVideoLookup[];
}
