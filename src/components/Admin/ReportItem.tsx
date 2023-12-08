
import React from 'react';
import { ReportLookup,TypeOfReport } from "../../pages/Dashboard/Admin/common/types";
import http_api from '../../services/http_api';

interface ReportItemProps {
  report: ReportLookup;
}

const ReportItem: React.FC<ReportItemProps> = ({ report }) => {
  const handleBanAbuser = async () => {
    try {
        const requestData = {
            userId: report.abuser?.userId,
          };
         
          
          await http_api.post('/api/Admin/BanUser', requestData);
          await http_api.delete(`/api/Admin/RemoveReportByEntityId/${report.id}`);
    } catch (error) {
      console.error('Error banning user or removing report:', error);
   
    }
    //window.location.reload();
  };
  const handleRejectReport = async () => {
    try {
        
        await http_api.delete(`/api/Admin/RemoveReportByEntityId/${report.id}`);
    } catch (error) {
      console.error('Error removing error:', error);
   
    }
    window.location.reload();
  };

  return (
    <div className="report-item">
      <div className="report-details">
      <p>Report ID: {report.id || 'None'}</p>
        <p>Abuser: {`${report.abuser?.firstName} ${report.abuser?.lastName}` || 'N/A'}</p>
        <p>Creator: {`${report.creator?.firstName} ${report.creator?.lastName}` || 'N/A'}</p>
        <p>Body: {report.body || 'N/A'}</p>
        <p>Type: {TypeOfReport[report.type] || 'N/A'}</p>
        <p>Date Created: {report.dateCreated || 'N/A'}</p>
        <p>Video ID: {report.videoId || 'None'}</p>
      </div>
      <div className='report-actions'>
        <button type="button" onClick={handleBanAbuser} className="action-button cursor-pointer rounded-lg border border-primary bg-primary p-2 text-white transition hover:bg-opacity-90">Ban Abuser 👎</button>
        <button type="button" onClick={handleRejectReport} className="action-button cursor-pointer rounded-lg border border-primary bg-primary p-2 text-white transition hover:bg-opacity-90">Reject Report 👍</button>
      </div>
      <br/>
    </div>
  );
};

export default ReportItem;
