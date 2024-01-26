export enum ScrollingReducerActionTypes {
  SET_SCROLLABLE_COMPONENT = 'SET_SCROLLABLE_COMPONENT',
}

const initState: any = { scrollableBody: null };

export const ScrollingReducer = (state = initState, action: any): any => {
  switch (action.type) {
    case ScrollingReducerActionTypes.SET_SCROLLABLE_COMPONENT: {
      return {
        ...state,
        scrollableBody: action.payload.current,
      };
    }
  }
  return state;
};
