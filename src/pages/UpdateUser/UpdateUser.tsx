import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as yup from 'yup';
import { useFormik } from 'formik';
 
import classNames from 'classnames';
import { IUserUpdate } from './types';
import { handleError, handleSuccess } from '../../common/handleError';
import http_api from '../../services/http_api';

const UpdateUser = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();

  const requestSchema = yup.object({
    nickname: yup.string().required('Enter nickname'),
    description: yup.string(),
  });

  const onFormSubmit = async (values: IUserUpdate) => {
    try {
      const result = await http_api.put(`/update-user`, values);
 
      dispatch({ type: 'UPDATE_USER', payload: result.data });
      handleSuccess('User updated successfully');
    } catch (error) {
      console.error('Update user error:', error);
      handleError(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      nickname: '',
      description: '',
    },
    validationSchema: requestSchema,
    onSubmit: onFormSubmit,
  });

  const { values, errors, handleSubmit, handleChange } = formik;

  return (
    <>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap items-center justify-center h-screen">
          <div className="w-full border-stroke dark:border-strokedark xl:w-1/2">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                Edit Profile
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="nickname"
                    className="mb-2.5 block font-medium text-black dark:text-white"
                  >
                    nickname
                  </label>
                  <input
                    id="nickname"
                    name="nickname"
                    value={values.nickname}
                    onChange={handleChange}
                    type="text"
                    placeholder="Enter your username"
                    className={classNames(
                      'w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary',
                      {
                        'dark:border-danger dark:text-danger':
                          errors.nickname,
                      },
                    )}
                  />
                  {errors.nickname && (
                    <div className="mt-2 text-md dark:text-danger">
                      {errors.nickname}
                    </div>
                  )}
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="description"
                    className="mb-2.5 block font-medium text-black dark:text-white"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                    placeholder="Enter your description"
                    className={classNames(
                      'w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary',
                      {
                        'dark:border-danger dark:text-danger':
                          errors.description,
                      },
                    )}
                  />
                  {errors.description && (
                    <div className="mt-2 text-md dark:text-danger">
                      {errors.description}
                    </div>
                  )}
                </div>

                <div className="mb-5">
                  <button
                    type="submit"
                    className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateUser;
