import React, { useState, useEffect } from "react";
import { IUsersubscription } from "./types";
import http_api from "../../../services/http_api";
import { useSelector } from "react-redux";
import { IAuthUser } from "../../../store/reducers/auth/types";

const SubscribeButton = (props: {
  isLoading: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
  text: string;
  backgroundClassname: string;
 
  type: 'submit' | 'reset' | 'button' | undefined;
 
  subscribeId: number;
}) => {
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleToggleSubscription = async () => {
    try {
      if (isSubscribed==true) {
        // If already subscribed, unsubscribe
        await http_api.delete(`/api/subscription/unsubscribe?SubscribeTo=${props.subscribeId}`);
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
 
        const response = await http_api.get(`/api/Subscription/isSubscriptions?SubscribeTo=${props.subscribeId}`);        
        const isSubscribed = await response.data;
        console.log("isSubscription",isSubscribed);
        setIsSubscribed(isSubscribed);
      } catch (error) {
        console.error(error);
      }
    };
    fetchIsSubscribed();
}}, [props.subscribeId]);

  return (
    <button
      disabled={props.isLoading}
      onClick={handleToggleSubscription}
      type={props.type}
      className={`w-full h-12 cursor-pointer rounded-md border border-${props.backgroundClassname} bg-${!isSubscribed?props.backgroundClassname:"secondary"} p-2 text-white transition hover:bg-opacity-90`}
    >
      {!isSubscribed ? "Підписатися":"Відписатися"}
    </button>
  );
};

export default SubscribeButton;
