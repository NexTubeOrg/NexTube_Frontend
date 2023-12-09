import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
 
import { IAuthUser } from '../../../store/reducers/auth/types';
import http_api from '../../../services/http_api';

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
      if (isSubscribed) {
        await http_api.delete(`/api/subscription/unsubscribe?SubscribeTo=${props.subscribeId}`);
      } else {
        await http_api.post(`/api/Subscription/Subscribe`, { "subscribeTo": props.subscribeId });
      }
      setIsSubscribed(!isSubscribed);
    } catch (error) {
      console.error(error);
    }
 };

 const { isAuth } = useSelector((store: any) => store.auth as IAuthUser);
 useEffect(() => {
    if (isAuth) {
      const fetchIsSubscribed = async () => {
        try {
          const response = await http_api.get(`/api/Subscription/isSubscriptions?SubscribeTo=${props.subscribeId}`);
          const isSubscribed = await response.data;
          setIsSubscribed(isSubscribed);
        } catch (error) {
          console.error(error);
        }
      };
      fetchIsSubscribed();
    }
 }, [props.subscribeId, isAuth]);

 return (
    <button
      disabled={props.isLoading}
      onClick={handleToggleSubscription}
      type={props.type}
      className={`w-full h-12 cursor-pointer rounded-md border border-${props.backgroundClassname} bg-${!isSubscribed ? props.backgroundClassname : "secondary"} p-2 text-white transition hover:bg-opacity-90`}
    >
      {!isSubscribed ? "Subscribed" : "UnSubscribed"}
    </button>
 );
};

export default SubscribeButton;