
import React from 'react';
import { ReportLookup } from "../../pages/Dashboard/Admin/common/types";
import http_api from '../../services/http_api';

interface ReportItemProps {
  report: ReportLookup;
}

const ReportItem: React.FC<ReportItemProps> = ({ report }) => {
  const handleViewAbuser = () => {
    // Implement logic to view abuser details if needed
  };

  return (
    <div className="report-item">
      <div className="report-details">
        <p>Abuser: {`${report.abuser?.firstName} ${report.abuser?.lastName}` || 'N/A'}</p>
        <p>Creator: {`${report.creator?.firstName} ${report.creator?.lastName}` || 'N/A'}</p>
        <p>Body: {report.body || 'N/A'}</p>
        <p>Type: {report.type || 'N/A'}</p>
        <p>Date Created: {report.dateCreated || 'N/A'}</p>
        <p>Video ID: {report.videoId || 'N/A'}</p>
      </div>
      <div className='report-actions'>
        <button type="button" onClick={handleViewAbuser} className="action-button cursor-pointer rounded-lg border border-primary bg-primary p-2 text-white transition hover:bg-opacity-90">View Abuser</button>
      </div>
      <br/>
    </div>
  );
};

export default ReportItem;
