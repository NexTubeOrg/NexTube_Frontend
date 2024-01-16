import { useState } from 'react';
import http_api from '../services/http_api';
import { IconedProcessingButton } from './common/buttons/IconedButton';
import {
  ReportLookup,
  TypeOfReport,
} from '../pages/Dashboard/Admin/common/types';
import { FlagIcon } from '@heroicons/react/24/outline';
import { handleSuccess } from '../common/handleError';

const ReportForm = (props: {
  abuser: number | null;
  videoId: number | null;
  onSubmitSuccess: () => void;
}) => {
  const [reportData, setReportData] = useState({
    abuserId: props.abuser,
    body: '',
    type: TypeOfReport.other,
    videoId: props.videoId,
  });

  const handleReportSubmit = async () => {
    try {
      const response = await http_api.post('/api/Admin/ReportUser', reportData);
      console.log('Report submitted successfully:', response.data);
    } catch (error) {
      console.error('Error submitting report:', error);
    }

    props.onSubmitSuccess();
    handleSuccess('Report was sent');
  };

  return (
    <>
      <div className="bg-secondary p-5  mt-5 rounded-lg">
        <form>
          <div className="">
            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Body
              </label>
              <textarea
                rows={6}
                placeholder="Enter report details"
                value={reportData.body}
                onChange={(e) =>
                  setReportData({ ...reportData, body: e.target.value })
                }
                className="w-full text-white h-25  rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
            </div>

            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Type
              </label>
              <select

             value={reportData.type}
  onChange={(e) => setReportData({ ...reportData, type: Number(e.target.value as unknown as TypeOfReport) })}
  className="w-full text-white rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
>
  {Object.keys(TypeOfReport)
  .filter((type) => isNaN(Number(type)))
  .map((type) => (
    <option key={type} value={Number(TypeOfReport[type as keyof typeof TypeOfReport])}>
      {type}
    </option>
  ))}
</select>

            </div>

            <div className="mb-2">
              <IconedProcessingButton
                isLoading={false}
                onClick={handleReportSubmit}
                text="Submit Report"
                type="button"
                icon={<FlagIcon />}
                backgroundClassname="primary"
              ></IconedProcessingButton>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ReportForm;
