// src/components/Profile/Routes/Videos/EditVideoOverlay/index.tsx
import { useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import CheckboxFour from '../../../../CheckboxFour';
import { PrimaryProcessingButton } from '../../../../common/buttons/PrimaryProcessingButton';
import { FieldEditBigInput, FieldEditInput } from '../../../../common/inputs';
import { CancelButton } from '../../../../common/buttons/CancelButton';
import { useNavigate } from 'react-router-dom';
import { IGetVideoResult, IVideoLookup, IVideoUpdateRequest } from '../../../../../pages/Video/common/types';
import http_api from '../../../../../services/http_api';
import { handleError, handleSuccess } from '../../../../../common/handleError';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { store } from '../../../../../store';
import { ProfileVideosReducerActionsType } from '../../../../../store/reducers/profileVideos/types';
import { useTranslation } from 'react-i18next';

export const EditVideoOverlay = () => {
  const { id } = useParams<string>();
  const { t } = useTranslation();

  const [selected, setSelected] = useState<string>('Public');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigator = useNavigate();
  const root = useRef(null);

  const request: IVideoUpdateRequest = {
    videoId: parseInt(id ?? '', 10),
    name: '',
    description: '',
    accessModificator: selected,
  };

  const requestSchema: any = yup.object({
    name: yup.string().required(t('editVideoOverlay.enterName')).min(2).max(100),
    description: yup.string().required(t('editVideoOverlay.enterDescription')).min(2).max(1000),
  });

  const onFormSubmit = async (values: IVideoUpdateRequest) => {
    try {
      setIsLoading(true);

      const result = await http_api.put<IVideoLookup>('/api/video/updateVideo', values, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      store.dispatch({
        type: ProfileVideosReducerActionsType.EDIT_PROFILE_VIDEO,
        payload: result.data,
      });

      setIsLoading(false);
      navigator('..');

      handleSuccess(t('editVideoOverlay.videoUpdatedSuccessfully'));
    } catch (error: any) {
      handleError(error);
    }
  };

  const formik = useFormik({
    initialValues: request,
    validationSchema: requestSchema,
    onSubmit: onFormSubmit,
  });

  const { values, errors, handleSubmit, handleChange } = formik;

  const handleEscPress = (event: any) => {
    if (event.keyCode === 27) {
      navigator('..');
    }
  };

  useEffect(() => {
    const getVideoRequest = async () => {
      const result = (await http_api.get<IGetVideoResult>(`/api/video/getVideo?VideoId=${id}`)).data.video;

      formik.setValues((prev) => ({
        ...prev,
        name: result.name ?? prev.name,
        description: result.description ?? prev.description,
        accessModificator: result.accessModificator ?? prev.accessModificator,
      }));

      setSelected((prev) => (prev = result.accessModificator ?? prev));
    };
    getVideoRequest();

    document.addEventListener('keydown', handleEscPress);
    return () => {
      document.removeEventListener('keydown', handleEscPress);
    };
  }, []);

  return (
    <>
      <div
        onClick={(event) => {
          if (event.target === root.current) {
            navigator('..');
          }
        }}
        className="overflow-y-auto fixed left-0 top-0 z-9999 bg-opacity-50 bg-absoluteblack"
      >
        <div ref={root} className="w-screen h-screen flex justify-center">
          <div className="absolute">
            <form
              className="md:mb-10 overflow-y-auto bg-secondary relative sm:top-0 md:top-10 lg:top-30 lg:left-10 p-6 rounded-md"
              onSubmit={handleSubmit}
            >
              <div className="header flex justify-between">
                <h1 className="text-white text-3xl">{values.name}</h1>
                <div className="flex items-center justify-center">
                  <div className="w-40 mr-6">
                    <PrimaryProcessingButton
                      text={t('editVideoOverlay.saveButton')}
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
                <h1 className="text-white text-3xl">{t('editVideoOverlay.detailsHeading')}</h1>
              </div>
              <div className="content md:flex">
                <div className="details md:w-60 lg:w-125">
                  <div className="mb-6">
                    <FieldEditInput
                      propertyName="name"
                      value={values.name}
                      handleChange={handleChange}
                      error={errors.name ?? ''}
                      type="text"
                      labelText={t('editVideoOverlay.videoTitleLabel')}
                    ></FieldEditInput>
                  </div>
                  <div className="mb-6">
                    <FieldEditBigInput
                      propertyName="description"
                      value={values.description}
                      handleChange={handleChange}
                      error={errors.description ?? ''}
                      type="text"
                      labelText={t('editVideoOverlay.videoDescriptionLabel')}
                    ></FieldEditBigInput>
                  </div>
                  <div className="border-2 rounded-md border-gray p-2">
                    <div className="mb-3">
                      <CheckboxFour
                        description={t('editVideoOverlay.makeVideoPublicOrPrivateDescription')}
                        onChange={() => {}}
                        isChecked={true}
                        name={t('editVideoOverlay.saveOrPublishLabel')}
                        id={'publish'}
                      ></CheckboxFour>
                    </div>
                    <div className="ml-6">
                      <div className="mb-3">
                        <CheckboxFour
                          description={t('editVideoOverlay.everyoneCanWatchDescription')}
                          onChange={() => {
                            setSelected('Public');
                            values.accessModificator = 'Public';
                          }}
                          isChecked={selected === 'Public'}
                          name={t('editVideoOverlay.publicLabel')}
                          id={'public'}
                        ></CheckboxFour>
                      </div>
                      <div className="">
                        <CheckboxFour
                          description={t('editVideoOverlay.onlyYouCanWatchDescription')}
                          onChange={() => {
                            setSelected('Private');
                            values.accessModificator = 'Private';
                          }}
                          isChecked={selected === 'Private'}
                          name={t('editVideoOverlay.privateLabel')}
                          id={'private'}
                        ></CheckboxFour>
                      </div>
                    </div>
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
