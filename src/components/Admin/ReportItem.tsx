// ReportItem.tsx
import React from 'react';
import { ReportLookup, TypeOfReport } from "../../pages/Dashboard/Admin/common/types";
import http_api from '../../services/http_api';
import { Link } from 'react-router-dom';

interface ReportItemProps {
  report: ReportLookup;
  updateReportsAfterAction: (reportId: number) => void;
}

const ReportItem: React.FC<ReportItemProps> = ({ report, updateReportsAfterAction }) => {
  const handleBanAbuser = async () => {
    try {
      const requestBanData = {
        userId: report.abuser?.userId,
      };
      await http_api.delete(`/api/Admin/DeleteVideoAsModerator/${report.videoId}`);
      await http_api.post('/api/Admin/BanUser', requestBanData);
      updateReportsAfterAction(report.id);
    } catch (error) {
      console.error('Error banning user or removing report:', error);
    }
  };

  const handleRejectReport = async () => {
    try {
      await http_api.delete(`/api/Admin/RemoveReportByEntityId/${report.id}`);
      updateReportsAfterAction(report.id);
    } catch (error) {
      console.error('Error removing report:', error);
    }
  };

  const handleDeleteVideo = async () => {
    try {

      await http_api.delete(`/api/Admin/DeleteVideoAsModerator/${report.videoId}`);
      updateReportsAfterAction(report.id);
    } catch (error) {
      console.error('Error deleting video:', error);
    }
  };

  return (
    <div className="report-item bg-secondary p-5 mt-5 rounded-lg">
      <div className="report-details">
        <p>Report ID: {report.id || 'None'}</p>
        <p>Abuser: <Link to={`/channel/${report.abuser?.userId}`}>{`${report.abuser?.firstName} ${report.abuser?.lastName}` || 'N/A'}</Link></p>
        <p>Creator: <Link to={`/channel/${report.creator?.userId}`}>{`${report.creator?.firstName} ${report.creator?.lastName}` || 'N/A'}</Link></p>
        <p>Body: {report.body || 'N/A'}</p>
        <p>Type: {TypeOfReport[report.type] || 'N/A'}</p>
        {report.videoId && (
        <a>Video: <Link to={`/video/watch/${report.videoId}`}>{`/video/watch/${report.videoId}`}</Link></a>
        )}
      </div>
      <div className='report-actions'>
        {report.videoId && (
        <button type="button" onClick={handleDeleteVideo} className="action-button cursor-pointer rounded-lg border border-primary bg-primary p-2 text-white transition hover:bg-opacity-90">Delete Video 🫵</button>
        )}   
        <button type="button" onClick={handleBanAbuser} className="action-button cursor-pointer rounded-lg border border-primary bg-primary p-2 text-white transition hover:bg-opacity-90">Ban Abuser 👎</button>
        
        <button type="button" onClick={handleRejectReport} className="action-button cursor-pointer rounded-lg border border-primary bg-primary p-2 text-white transition hover:bg-opacity-90">Reject Report 👍</button>
         
      </div>
      <br />
    </div>
  );
};

export default ReportItem;
