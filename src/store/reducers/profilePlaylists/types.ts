import { IPlaylistLookup } from '../../../components/Playlists/types';

export interface IProfilePlaylistsList {
  playlists: IPlaylistLookup[];
  page: number;
}
export enum ProfilePlaylistsActionType {
  APPEND_TO_LIST_ITEM = 'APPEND_TO_LIST_ITEM',
  APPEND_TO_LIST_PAGE = 'APPEND_TO_LIST_PAGE',
  REMOVE_FROM_LIST = 'REMOVE_FROM_LIST',
  NEXT_PAGE = 'NEXT_PAGE',
  RESET_ALL = 'RESET_ALL',
}
