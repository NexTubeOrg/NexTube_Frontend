import React, { useEffect, useState } from 'react';
import {
  FieldBasicEditBigInput,
  FieldBasicEditInput,
} from '../../../common/inputs';
import { ILoginResult, IUserUpdate } from '../../../../pages/UpdateUser/types';
import http_api from '../../../../services/http_api';
import { useSelector } from 'react-redux';
import { IAuthUser } from '../../../../store/reducers/auth/types';

export const ProfileInfo = () => {
  
  const [userData, setUserData] = useState<IUserUpdate>({
    firstname: '',
    lastname: '',
    nickname: '',
    description: '',
  });
  const { isAuth,user } = useSelector((store: any) => store.auth as IAuthUser);
  useEffect(() => {
     if (isAuth) {
      fetchUserData();
    }
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await http_api.get(`/api/User/GetUser?ChannelId=${user?.userId}`);
      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    
    }
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
   
    if (name === 'fullName') {
      const [firstname, ...lastname] = value.split(' ');
      setUserData((prevData) => ({
        ...prevData,
        firstname: firstname || '',
        lastname: lastname.join(' ') || '',
        fullName: value,
      }));
    } else {
      setUserData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
 

 
  const handleSubmit = async () => {
    try {console.log("UPDate",userData);
      await http_api.put<ILoginResult>('/api/user/updateuser', userData); 
      console.log('Changes saved successfully!');
    } catch (error) {
      console.error('Error saving changes:', error);
      // Обробляйте помилки за необхідності
    }
  };

  return (
    <>
      <div className="mb-6">
        <FieldBasicEditInput
          name="fullName"
          title="Name"
          description="
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil
            reprehenderit repellendus tempora autem culpa minima illo delectus
            placeat accusamus a at exercitationem sed, rem suscipit id tenetur
            distinctio dolorum harum."
          placeholder="Enter channel name"
          value={`${userData.firstName} ${userData.lastName}`}
          handleChange={handleInputChange}
          error=""
          type="text"
        />
        <div className="mb-6">
 
</div>

      </div>
      <div className="mb-6">
        <FieldBasicEditInput
          name="nickname"
          title="Handle"
          description="
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil
            reprehenderit repellendus tempora autem culpa minima illo delectus
            placeat accusamus a at exercitationem sed, rem suscipit id tenetur
            distinctio dolorum harum."
          placeholder="Set your handle"
          value={userData.nickname}
          handleChange={handleInputChange}
          error=""
          type="text"
        />
      </div>
      <div className="mb-6">
        <FieldBasicEditBigInput
          name="description"
          title="Description"
          description=""
          placeholder="Tell viewers about the channel"
          value={userData.description}
          handleChange={handleInputChange}
          error=""
        />
      </div>
      <div className="mb-5">    <button
                  type="submit"
                  className="w-50 cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                  onClick={handleSubmit}
                > Save</button>   </div>
    </>
  );
};

 

