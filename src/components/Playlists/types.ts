import { IVideoLookup } from '../../pages/Video/common/types';

export interface IPlaylistLookup {
  id: number;
  title: string;
  totalCountVideos: number;
  videos: IVideoLookup[] | null | undefined;
  preview: string | null;
}

export interface IVideoPlaylistUserStatus {
  playlist: IPlaylistLookup;
  isVideoInPlaylist: boolean;
}

export interface IGetUserPlaylistsResult {
  playlists: IVideoPlaylistUserStatus[];
}

export interface IGetPlaylistVideos {
  title: string;
  totalCount: number;
  videos: IVideoLookup[];
}
