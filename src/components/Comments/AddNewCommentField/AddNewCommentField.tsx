import * as yup from 'yup';
import { useFormik } from 'formik';
import http_api from '../../../services/http_api';
import { EventHandler, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { handleError, handleSuccess } from '../../../common/handleError';
import { IAddNewCommentRequest, ICommentLookup } from '../Common/types';
import { PrimaryProcessingButton } from '../../common/buttons/PrimaryProcessingButton';
import { SecondaryProcessingButton } from '../../common/buttons/SecondaryProcessingButton';
import { store } from '../../../store';
import { VideoCommentsReducerActionTypes } from '../../../store/reducers/videoComments/types';
import { ProcessingButton } from '../../common/buttons/ProcessingButton';

const AddNewCommentField = (props: {
  videoId: number;
  rootCommentId: number | undefined;
  focus: boolean | undefined;
  onSubmit: EventHandler<any>;
  onCancel: EventHandler<any>;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [actionsVisible, setActionsVisible] = useState<boolean>(false);
  const requestSchema = yup.object({
    videoId: yup.number().required('Enter video id'),
    content: yup.string().required('Enter comment'),
  });

  const inputRef = useRef<HTMLInputElement | null>(null);

  const onFormSubmit = async (values: IAddNewCommentRequest) => {
    try {
      console.log(values);
      setIsLoading(() => true);

      if (props.rootCommentId == undefined) {
        const result = (
          await http_api.post<ICommentLookup>(
            '/api/Video/Comment/AddComment',
            values,
          )
        ).data;
        handleSuccess('Add comment successfully');
        store.dispatch({
          type: VideoCommentsReducerActionTypes.BEGIN_APPEND_COMMENTS_LIST,
          payload: [result],
        });
      } else {
        const result = (
          await http_api.post<ICommentLookup>(
            '/api/Video/Comment/AddCommentReply',
            values,
          )
        ).data;
        handleSuccess('Add reply successfully');
        store.dispatch({
          type: VideoCommentsReducerActionTypes.APPEND_COMMENT_REPLIES,
          payload: {
            replies: [result],
            rootCommentId: props.rootCommentId,
          },
        });
        props.onSubmit(result);
      }

      resetForm();
    } catch (error) {
      console.error('Add commentn error', error);
      handleError(error);
    } finally {
      setIsLoading(() => false);
    }
  };

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    if (props.focus == true) {
      focusInput();
    }
  }, [props.focus]);

  const formik = useFormik({
    initialValues: {
      content: '',
      videoId: props.videoId,
      rootCommentId: props.rootCommentId,
    },
    validationSchema: requestSchema,
    onSubmit: onFormSubmit,
  });

  const { values, errors, touched, handleSubmit, handleChange, resetForm } =
    formik;

  return (
    <>
      <form onSubmit={handleSubmit} onReset={() => props.onCancel(null)}>
        <div className="flex flex-col p-6.5">
          <div className="mb-2">
            <div className="relative">
              <input
                ref={inputRef}
                autoComplete="off"
                onBlur={() => setActionsVisible((v) => false)}
                onFocus={() => setActionsVisible((v) => true)}
                id="content"
                name="content"
                value={values.content}
                onChange={handleChange}
                type="text"
                placeholder="Add a comment..."
                className={classNames(
                  'w-full border-b-2 dark:border-gray dark:focus:border-white bg-transparent py-1 pr-10 outline-none  focus-visible:shadow-none dark:focus:text-white dark:text-gray dark:bg-body',
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
          {(actionsVisible || values.content.length > 0) && (
            <>
              <div className="flex justify-end">
                <div className="mr-2 w-30">
                  <ProcessingButton
                    isLoading={false}
                    text="Cancel"
                    onClick={() => {
                      resetForm();
                      props.onCancel(null);
                    }}
                    type="reset"
                    backgroundClassname="transparent"
                  ></ProcessingButton>
                </div>
                <div className="w-30">
                  <PrimaryProcessingButton
                    isLoading={isLoading}
                    text="Add comment"
                    onClick={() => {}}
                    type="submit"
                  ></PrimaryProcessingButton>
                </div>
              </div>
            </>
          )}
        </div>
      </form>
    </>
  );
};

export default AddNewCommentField;
