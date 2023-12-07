import { useState } from 'react';
import CheckboxFour from '../../../../CheckboxFour';
import { PrimaryProcessingButton } from '../../../../common/buttons/PrimaryProcessingButton';
import { FieldEditBigInput, FieldEditInput } from '../../../../common/inputs';
import { CancelButton } from '../../../../common/buttons/CancelButton';
import { useNavigate } from 'react-router-dom';

export const AddVideoOverlay = () => {
  const [selected, setSelected] = useState<string>('public');
  const navigator = useNavigate();
  return (
    <>
      <div className="fixed left-0 top-0 z-9999">
        <div className="w-screen h-screen bg-absoluteblack bg-opacity-50 flex justify-center">
          <div className="absolute">
            <div className="bg-secondary relative top-30 left-10 p-6 rounded-md">
              <div className="header flex justify-between">
                <h1 className="text-white text-3xl">Grave book // |</h1>
                <div className="flex items-center justify-center">
                  <div className="w-40 mr-6">
                    <PrimaryProcessingButton
                      text="Save"
                      isLoading={false}
                      onClick={() => {}}
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
                <h1 className="text-white text-3xl">Details</h1>
              </div>
              <div className="content flex">
                <div className="details w-125">
                  <div className="mb-6">
                    <FieldEditInput
                      propertyName="title"
                      value=""
                      handleChange={() => {}}
                      error=""
                      type="text"
                      labelText="Enter video title"
                    ></FieldEditInput>
                  </div>
                  <div className="mb-6">
                    <FieldEditBigInput
                      propertyName="description"
                      value=""
                      handleChange={() => {}}
                      error=""
                      type="text"
                      labelText="Tell viewers about your video"
                    ></FieldEditBigInput>
                  </div>
                  <div className="border-2 rounded-md border-gray p-2">
                    <div className="mb-3">
                      <CheckboxFour
                        description="Make your video public or private"
                        onChange={() => {}}
                        isChecked={true}
                        name={'Save or publish'}
                        id={'publish'}
                      ></CheckboxFour>
                    </div>
                    <div className="ml-6">
                      <div className="mb-3">
                        <CheckboxFour
                          description="Everyone can watch your video"
                          onChange={() => {
                            setSelected('public');
                          }}
                          isChecked={selected === 'public'}
                          name={'Public'}
                          id={'public'}
                        ></CheckboxFour>
                      </div>
                      <div className="">
                        <CheckboxFour
                          description="Only you can watch the video"
                          onChange={() => {
                            setSelected('private');
                          }}
                          isChecked={selected === 'private'}
                          name={'Private'}
                          id={'private'}
                        ></CheckboxFour>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="ml-6">
                  <div className="w-75 h-45 bg-white video-preview">
                    video preview
                  </div>
                  <div className="bg-body p-3">
                    <h3 className="text-gray font-medium text-md">filename</h3>
                    <h2 className="text-white font-medium text-lg">
                      Grave book
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
