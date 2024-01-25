import { number } from 'yup';
import { IPlaylistLookup } from '../../../components/Playlists/types';
import { IProfilePlaylistsList, ProfilePlaylistsActionType } from './types';

const initState: IProfilePlaylistsList = {
  playlists: [],
  page: 1,
};

export const ProfilePlaylistsReducer = (
  state = initState,
  action: any,
): IProfilePlaylistsList => {
  switch (action.type) {
    case ProfilePlaylistsActionType.APPEND_TO_LIST_PAGE: {
      const newPage = action.payload as IPlaylistLookup[];
      const currentList = state.playlists;
      return {
        ...state,
        playlists: [
          ...currentList,
          ...newPage.filter(
            (newItem) => currentList.find((c) => c.id == newItem.id) == null,
          ),
        ],
      };
    }
    case ProfilePlaylistsActionType.APPEND_TO_LIST_ITEM: {
      const newItem = action.payload as IPlaylistLookup;
      const currentList = state.playlists;
      return {
        ...state,
        playlists: [newItem, ...currentList],
      };
    }
    case ProfilePlaylistsActionType.REMOVE_FROM_LIST: {
      const itemIdToRemove = action.payload as number;
      const currentList = state.playlists;
      return {
        ...state,
        playlists: [...currentList.filter((pl) => pl.id != itemIdToRemove)],
      };
    }
    case ProfilePlaylistsActionType.NEXT_PAGE: {
      return {
        ...state,
        page: state.page + 1,
      };
    }
    case ProfilePlaylistsActionType.RESET_ALL: {
      return initState;
    }
    default:
      return state;
  }
};
