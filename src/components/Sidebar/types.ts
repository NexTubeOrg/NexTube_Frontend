 

interface ISubscription {
  userId: number;
  firstName: string;
  lastName: string;
  email: string | null;
  channelPhoto: string;
  roles: string[] | null;
}

interface ISubscriptionData {
  subscription: ISubscription;
  dateCreated: string;
}
 
