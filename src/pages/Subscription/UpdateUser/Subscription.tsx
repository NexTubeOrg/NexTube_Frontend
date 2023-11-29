import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useFormik } from 'formik';
import classNames from 'classnames';
 
 
 
const UpdateUser = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const subscribeMethod = async (channelId) => {
    const response = await fetch(`/api/Subscription/Subscriptions`,channelId) {
      method: "POST",
    });
  
    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  };
  
  const handleClick = () => {
    subscribeMethod(channelId);
    setIsSubscribed(!isSubscribed);
  };
 
  

  return (
     <>
  <button onClick={handleClick}>
      {isSubscribed ? "Відписатися" : "Підписатися"}
    </button>
     
     </>
  );
};

export default UpdateUser;
