import { EventHandler, useEffect, useState } from 'react';
import { ProcessingButton } from './ProcessingButton';
import { useSelector } from 'react-redux';
import { IAuthUser } from '../../../store/reducers/auth/types';
import http_api from '../../../services/http_api';

export const PrimaryProcessingButton = (props: {
  isLoading: boolean;
  onClick: EventHandler<any> | undefined;
  text: string;
  type: 'submit' | 'reset' | 'button' | undefined;
}) => {
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);

  const handleToggleSubscription = async () => {
     try {
       if (isSubscribed==true) {
         // If already subscribed, unsubscribe
         await http_api.delete(`/api/subscription/unsubscribe?SubscribeTo=${40}`);
       
       } else if(isSubscribed==false) {
         // If not subscribed, subscribe
         await http_api.post(`/api/Subscription/Subscribe`,{ "subscribeTo": 40 });     
       }
       setIsSubscribed(!isSubscribed); // Toggle the subscription status
     } catch (error) {
       console.error(error);
     }
  };
 
 
  const { isAuth } = useSelector((store: any) => store.auth as IAuthUser);
  useEffect(() => {
   
 if(isAuth){
     const fetchIsSubscribed = async () => {
       try {
  
         const response = await http_api.get(`/api/Subscription/isSubscriptions?SubscribeTo=${40}`);        
         const isSubscribed = await response.data;
         console.log("isSubscription",isSubscribed);
         setIsSubscribed(isSubscribed);
    props.isLoading=await response.data;
       } catch (error) {
         console.error(error);
       }
     };
     fetchIsSubscribed();
 }}, []);
  return (
    <>
      <ProcessingButton
        isLoading={isSubscribed}
        onClick={handleToggleSubscription}
        text={props.text}
        backgroundClassname="primary"
        type={props.type}
      ></ProcessingButton>
    </>
  );
};
