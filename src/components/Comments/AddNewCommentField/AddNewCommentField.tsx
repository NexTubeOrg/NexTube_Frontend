import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ILoginRequest, ILoginResult } from './types';
import * as yup from 'yup';
import { useFormik } from 'formik';
import http_api from '../../../services/http_api';
import { AuthUserActionType, IUser } from '../../../store/reducers/auth/types';
import jwtDecode from 'jwt-decode';
import { EventHandler, useState } from 'react';
import { storeToken } from '../../../services/tokenService';
import classNames from 'classnames';
import GoogleAuth from '../../../components/GoogleAuth';
import { handleError, handleSuccess } from '../../../common/handleError';
import { IAddNewCommentRequest, ICommentLookup } from '../Common/types';

const AddNewCommentField = (props: {
  videoId: number;
  onCommentAdd: EventHandler<any>;
}) => {
  const requestSchema = yup.object({
    videoId: yup.number().required('Enter video id'),
    content: yup.string().required('Enter comment'),
  });

  const onFormSubmit = async (values: IAddNewCommentRequest) => {
    try {
      console.log(values);
      const result = (
        await http_api.post<ICommentLookup>(
          '/api/Video/Comment/AddComment',
          values,
        )
      ).data;

      handleSuccess('Add comment successfully');
      props.onCommentAdd(result);
      resetForm();
    } catch (error) {
      console.error('Add commentn error', error);
      handleError(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      content: '',
      videoId: props.videoId,
    },
    validationSchema: requestSchema,
    onSubmit: onFormSubmit,
  });

  const { values, errors, touched, handleSubmit, handleChange, resetForm } =
    formik;

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col p-6.5">
          <div className="mb-2">
            <div className="relative">
              <input
                id="content"
                name="content"
                value={values.content}
                onChange={handleChange}
                type="text"
                placeholder="Enter comment text"
                className={classNames(
                  'w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary',
                  {
                    'dark:border-danger dark:text-danger': errors.content,
                  },
                )}
              />
              {errors.content && (
                <div className="mt-2 text-md dark:text-danger">
                  {errors.content}
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="reset"
              onClick={() => {
                resetForm();
              }}
              className="w-30 mr-2 cursor-pointer rounded-lg border border-graydark bg-graydark p-2 text-white transition hover:bg-opacity-90"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-30 cursor-pointer rounded-lg border border-primary bg-primary p-2 text-white transition hover:bg-opacity-90"
            >
              Add comment
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddNewCommentField;
