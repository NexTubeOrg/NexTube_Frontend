import React from 'react';
import { IUserLookup } from "../../pages/Dashboard/Admin/common/types";
import http_api from '../../services/http_api';
import './style.css';

interface UserItemProps {
  user: IUserLookup;
}

const UserItem: React.FC<UserItemProps> = ({ user }) => {
  const handleBanClick = async () => {
    try {
        const requestData = {
            userId: user.userId,
          };
          
          await http_api.post('/api/Admin/BanUser', requestData);
    } catch (error) {
      console.error('Error banning user:', error);
   
    }
    window.location.reload();
  };
  const handleModClick = async () => {
    try {
        const requestData = 
            user.userId;
         
          
          await http_api.post('/api/Admin/AssignModerator', requestData);
    } catch (error) {
      console.error('Error assigning moderator:', error);
   
    }
    window.location.reload();
  };

  return (
    <div className="user-item">
       
      <div className="user-details">
        <p>{`${user.firstName} ${user.lastName}`}</p>
        <p>ID: {user.userId || 'N/A'}</p>
        <p>Email: {user.email || 'N/A'}</p>
        <p>Roles: {user.roles?.toString() || 'None'}</p>
      </div>
      <div className='user-actions'>
      
        <button type="button"  onClick={handleBanClick} className="action-button cursor-pointer rounded-lg border border-primary bg-primary p-2 text-white transition hover:bg-opacity-90">❌ Ban</button>
        <button type="button" onClick={handleModClick} className="action-button  cursor-pointer rounded-lg border border-primary bg-primary p-2 text-white transition hover:bg-opacity-90">🤓 Mod</button>
      
      </div>
      <br/>
    </div>
  );
};

export default UserItem;
