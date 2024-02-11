import React, { useEffect, useState } from 'react';
import http_api from '../../services/http_api';
import InfiniteScroll from 'react-infinite-scroll-component';
import UserItem from './UserItem';
import './style.css';

const AllUsers: React.FC = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [pageSize, setPageSize] = useState(4);

  const fetchUsers = async () => {
    try {
      const response = await http_api.get(`/api/Admin/GetAllUsers?page=${page}&pageSize=${pageSize}`);
      const newUsers = response.data.users || [];
      setUsers((prevUsers) => [...prevUsers, ...newUsers]);
      setPage(page + 1);
      setHasMore(newUsers.length > 0);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {

    const threshold = 1;
    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;

    if (scrollHeight - (scrollTop + clientHeight) < threshold && hasMore) {
      fetchUsers();
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []); 

  return (
    <div className="custom-scrollbar admin-panel " onScroll={handleScroll}>
      <InfiniteScroll 
        dataLength={users.length}
        next={fetchUsers}
        hasMore={hasMore}
        loader={<h4 className='text-white'></h4>}
        scrollableTarget="custom-scrollbar"
      >
        <div className="user-list">
          {users.map((user) => (
            <UserItem key={user.userId} user={user} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default AllUsers;
