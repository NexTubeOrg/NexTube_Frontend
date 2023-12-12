
import React, { useEffect, useState } from 'react';
import http_api from '../../services/http_api';
import InfiniteScroll from 'react-infinite-scroll-component';
import ReportItem from './ReportItem';
import './style.css';

const AllReports: React.FC = () => {
  const [reports, setReports] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [pageSize, setPageSize] = useState(2);

  const fetchReports = async () => {
    try {
      const response = await http_api.get(`/api/Admin/GetAllReports?page=${page}&pageSize=${pageSize}`);
      const newReports = response.data || [];
      setReports((prevReports) => [...prevReports, ...newReports]);
      setPage(page + 1);
      setHasMore(newReports.length > 0);
    } catch (error) {
      console.error('Error fetching reports:', error);
    }
  };

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const threshold = 1;
    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;

    if (scrollHeight - (scrollTop + clientHeight) < threshold && hasMore) {
      fetchReports();
    }
  };

  useEffect(() => {
    fetchReports();
  }, []); 

  const updateReportsAfterAction = (reportId) => {
    setReports((prevReports) => prevReports.filter((report) => report.id !== reportId));
  };

  return (
    <div className="custom-scrollbar moderator-panel" onScroll={handleScroll}>
      <InfiniteScroll
        dataLength={reports.length}
        next={fetchReports}
        hasMore={hasMore}
        loader={<h4 className='text-white'></h4>}
        scrollableTarget="custom-scrollbar"
      >
        <div className="report-list ">
          {reports.map((report) => (
            <ReportItem
              key={report.id}
              report={report}
              updateReportsAfterAction={updateReportsAfterAction}
            />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default AllReports;
