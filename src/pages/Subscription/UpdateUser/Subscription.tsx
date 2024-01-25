import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
 
import { IAuthUser } from '../../../store/reducers/auth/types';
import http_api from '../../../services/http_api';
 import { store } from '../../../store';
import { SubscriptionReducerActionsType } from '../../../store/reducers/subscription/types';
import { t } from 'i18next';


const SubscribeButton = (props: {
 isLoading: boolean;
 onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
 text: string;
 backgroundClassname: string;
 type: 'submit' | 'reset' | 'button' | undefined;
 subscribeId: string|undefined;
}) => {
 const [isSubscribed, setIsSubscribed] = useState(false);
 
 const handleToggleSubscription = async () => {
 
    try {
      if (isSubscribed) {
        const result= await http_api.delete(`/api/subscription/unsubscribe?SubscribeTo=${props.subscribeId}`);
        console.log("delete",result);
        store.dispatch({
          type: SubscriptionReducerActionsType.DELETE_SUBSCRIBER,
          payload:  result.data
        });
      } else {
        console.log("idProps",props.subscribeId);
       const result= await http_api.post(`/api/subscription/subscribe`, {"subscribeTo": props.subscribeId});
       console.log("add",result);
        store.dispatch({
          type:SubscriptionReducerActionsType.ADD_SUBSCRIBER ,
          payload:result.data
        });
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
          console.log("idSubs",props.subscribeId);
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
      {!isSubscribed ? t("watchVideo.subscribe") : t("watchVideo.subscribed")}
    </button>
 );
};

export default SubscribeButton;