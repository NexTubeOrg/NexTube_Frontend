import { ISubscription } from '../../../components/Sidebar/types';
import { IUsersubscription, SubscriptionReducerActionsType } from './types';

const initState: IUsersubscription = {
  subscriptions: [],
};

export const SubscriptionReducer = (state = initState, action: any): any => {
  switch (action.type) {
    case SubscriptionReducerActionsType.ADD_SUBSCRIBER: {
      return {
        ...state,
        subscriptions: [...state.subscriptions, action.payload],
      };
    }
    case SubscriptionReducerActionsType.DELETE_SUBSCRIBER: {
      const updatedList = state.subscriptions.filter(
        (subscriber) => subscriber.userId !== action.payload.userId,
      );
      return {
        ...state,
        subscriptions: updatedList,
      };
    }
    case SubscriptionReducerActionsType.SET_SUBSCRIPTION_LIST: {
      const subscriptionsList = action.payload.subscriptions as ISubscription[];
      return {
        ...state,
        subscriptions: subscriptionsList,
      };
     } case  SubscriptionReducerActionsType.CLEAR_SUBSCRIPTION:
  {   return { ...state, subscriptions: [] };}
 
    default:
      return state;
  }
};
