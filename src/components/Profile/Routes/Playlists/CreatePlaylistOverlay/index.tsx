// src/components/Profile/Routes/Playlists/CreatePlaylistOverlay/index.tsx
import { useEffect, useState } from 'react';
import { PrimaryProcessingButton } from '../../../../common/buttons/PrimaryProcessingButton';
import { FieldEditInput } from '../../../../common/inputs';
import { CancelButton } from '../../../../common/buttons/CancelButton';
import { useNavigate } from 'react-router-dom';
import { ModalCropper } from '../../../../ModalCropper';
import http_api from '../../../../../services/http_api';
import { handleError, handleSuccess } from '../../../../../common/handleError';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { ICreatePlaylistRequest } from './types';
import { store } from '../../../../../store';
import { ProfilePlaylistsActionType } from '../../../../../store/reducers/profilePlaylists/types';
import { IPlaylistLookup } from '../../../../Playlists/types';
import { useTranslation } from 'react-i18next'; // Import the hook

export const CreatePlaylistOverlay = () => {
  const { t } = useTranslation(); // Initialize the hook
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigator = useNavigate();

  const request: ICreatePlaylistRequest = {
    title: '',
    previewImage: null,
  };

  const requestSchema: any = yup.object({
    title: yup.string().required(t('createPlaylistOverlay.enterTitle')).min(2).max(100),
    previewImage: yup.mixed().required(t('createPlaylistOverlay.selectPreview'))
  });

  const handleEscPress = (event: any) => {
    if (event.keyCode === 27) {
      navigator('..');
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleEscPress);
    return () => {
      document.removeEventListener('keydown', handleEscPress);
    };
  }, []);

  const onFormSubmit = async (values: ICreatePlaylistRequest) => {
    try {
      setIsLoading(true);

      const result = (
        await http_api.post<IPlaylistLookup>(
          '/api/Video/Playlist/CreatePlaylist',
          values,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        )
      ).data;

      store.dispatch({
        type: ProfilePlaylistsActionType.APPEND_TO_LIST_ITEM,
        payload: result,
      });

      setIsLoading(false);
      navigator('..');

      handleSuccess(t('createPlaylistOverlay.createSuccess'));
    } catch (error: any) {
      handleError(error);
    }
  };

  const onPreviewPhotoChangeHandler = (f: File) => {
    console.log('image input handle change', f);
    if (f != null) {
      onPreviewPhotoSaveHandler(f);
    }
  };

  const onPreviewPhotoSaveHandler = (file: File) => {
    console.log('image save handle', file);
    values.previewImage = file;
    console.log(values);
  };

  const formik = useFormik({
    initialValues: request,
    validationSchema: requestSchema,
    onSubmit: onFormSubmit,
  });

  const { values, errors, touched, handleSubmit, handleChange } = formik;

  return (
    <>
      <div className="overflow-y-auto fixed left-0 top-0 z-9999 bg-opacity-50  bg-absoluteblack">
        <div className="w-screen h-screen flex justify-center">
          <div className="absolute">
            <form
              className="md:mb-10 overflow-y-auto bg-secondary relative sm:top-0 md:top-10 lg:top-30 lg:left-10 p-6 rounded-md"
              onSubmit={handleSubmit}
            >
              <div className="header flex justify-between">
                <h1 className="text-white text-3xl">{values.title}</h1>
                <div className="flex items-center justify-center">
                  <div className="w-40 mr-6">
                    <PrimaryProcessingButton
                      text={t('createPlaylistOverlay.createButton')}
                      isLoading={isLoading}
                      onClick={handleSubmit}
                      type="submit"
                    ></PrimaryProcessingButton>
                  </div>
                  <div className="">
                    <CancelButton
                      onClick={() => {
                        navigator('..');
                      }}
                    ></CancelButton>
                  </div>
                </div>
              </div>
              <hr className="mx-6 h-0.5 my-8 border-0 dark:bg-primary"></hr>
              <div className="mb-3">
                <h1 className="text-white text-3xl">{t('createPlaylistOverlay.details')}</h1>
              </div>
              <div className="content md:flex">
                <div className="details md:w-60 lg:w-125">
                  <div className="mb-6">
                    <FieldEditInput
                      propertyName="title"
                      value={values.title}
                      handleChange={handleChange}
                      error={errors.title ?? ''}
                      type="text"
                      labelText={t('createPlaylistOverlay.enterTitle')}
                    ></FieldEditInput>
                  </div>
                </div>
                <div className="ml-6 w-75 overflow-x-hidden">
                  <div className="bg-body p-3">
                    <label className="mb-3 block text-black dark:text-white">
                      {t('createPlaylistOverlay.selectPreview')}
                    </label>
                    <ModalCropper
                      aspectRatio={1920 / 1080}
                      onSave={onPreviewPhotoChangeHandler}
                      error={errors.previewImage ?? ''}
                    ></ModalCropper>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
