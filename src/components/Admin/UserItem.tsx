import React from 'react';

import http_api from '../../services/http_api';
import './style.css';
import { Link } from 'react-router-dom';
import { IUser } from '../../store/reducers/auth/types';

interface UserItemProps {
  user: IUser;
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
    <div className="user-item bg-secondary p-5 mt-5 rounded-lg">
       
      <div className="user-details">
        <p><Link to={`/channel/${user.userId || 'N/A'}`}>{`${user.firstName} ${user.lastName}`}</Link></p>
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
