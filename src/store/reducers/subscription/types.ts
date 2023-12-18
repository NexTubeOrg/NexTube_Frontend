import { ISubscription } from "../../../components/Sidebar/types";

 

export enum SubscriptionReducerActionsType {
    SET_SUBSCRIPTION_LIST = "SET_SUBSCRIPTION_LIST",
    ADD_SUBSCRIBER = "ADD_SUBSCRIBER",
    DELETE_SUBSCRIBER = "DELETE_SUBSCRIBER",
}

export interface IUsersubscription {
    subscriptions: ISubscription[];
 
}
