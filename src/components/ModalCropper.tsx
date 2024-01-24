import React, { LegacyRef, useEffect, useRef, useState } from 'react';
import { ICroppedModal } from '../common/CropperDialog/types';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';
import classNames from 'classnames';
import './../common/CropperDialog/style.css';
import { ProcessingButton } from './common/buttons/ProcessingButton';
import { PrimaryProcessingButton } from './common/buttons/PrimaryProcessingButton';
const defaultThumb = '/imageThumb.svg';

export const ModalCropper: React.FC<ICroppedModal> = ({
  imageUri = defaultThumb,
  aspectRatio = 1 / 1,
  error = null,
  onSave = null,
}) => {
  const [shown, setShown] = useState<boolean>(false);
  const [wasClicked, setWasClicked] = useState<boolean>(false);
  const [croppedImage, setCroppedImage] = useState<string>(imageUri);
  const [cropper, setCropper] = useState<Cropper | null>(null);

  const imagePreviewRef = useRef<HTMLImageElement>();
  const imageCropperEditAreaRef = useRef<HTMLImageElement>();
  const fileSelectInputRef = useRef<HTMLInputElement>();

  useEffect(() => {
    if (cropper == null && imageCropperEditAreaRef.current) {
      const cropperObj = new Cropper(
        imageCropperEditAreaRef.current as HTMLImageElement,
        {
          viewMode: 1,
          aspectRatio: aspectRatio,
        },
      );
      setCropper(cropperObj);
    }
  }, [imageUri]);

  // show/hide modal window
  const toggleModal = async () => {
    await setShown((prev) => !prev);
  };

  // save cropped image from Cropper to croppedImage
  const onSaveCroppedHandler = async (e: any) => {
    const base64croppedImageResult = cropper
      ?.getCroppedCanvas()
      .toDataURL() as string;
    await setCroppedImage(base64croppedImageResult);

    try {
      const resp = await fetch(base64croppedImageResult);
      const blob = await resp.blob();
      const filename = `${'image'}.${blob.type}`;
      const file = new File([blob], filename, { type: blob.type });

      if (onSave) onSave(file);
    } catch (er) {
      error = er as string;
    }
    await toggleModal();
  };

  // select image from file OR edit received from above
  const onCroppedImageResultClick = async (e: any) => {
    if (!wasClicked && imageUri != defaultThumb) {
      console.log('imageUri != defaultThumb');
      cropper?.replace(imageUri);
      await toggleModal();
      await setWasClicked(true);
    } else {
      console.log('need to select');
      await fileSelectInputRef.current?.click();
    }
  };

  // the user has selected an image. opens modal to edit
  const onImageChangeHandler = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = e.target.files;
    if (!files || !files.length) {
      error = 'Select images!';
      return;
    }

    const file = files[0];
    if (!/^image\/\w+/.test(file.type)) {
      error = 'Select correct image!';
      return;
    }
    const url = URL.createObjectURL(file);

    cropper?.replace(url);
    await toggleModal();
  };

  return (
    <>
      <div className="relative">
        <div>
          {/* hidden file input */}
          <input
            type="file"
            accept="image/*"
            className={'hidden'}
            id="image"
            name="image"
            ref={fileSelectInputRef as LegacyRef<HTMLInputElement>}
            onChange={onImageChangeHandler}
          />

          {/* cropped result and button to select and crop image again */}
          <div className="wrapper dark:bg-secondary rounded-full p-7">
            <img
              className="cur-pointer w-20 fill-white rounded-full dark:bg-transparent"
              src={croppedImage}
              ref={imagePreviewRef as LegacyRef<HTMLImageElement>}
              alt="Result"
              onClick={onCroppedImageResultClick}
            />
          </div>

          {error && <div className="invalid-feedback text-danger">{error}</div>}
        </div>
        <span className="absolute right-4 top-4">{/* insert here svg */}</span>
      </div>

      <div
        className="modal-container fixed z-50 flex top-25 bottom-5 max-w-xl"
        onClick={(e: any) => {
          if (e.target.className === 'modal-container') toggleModal();
        }}
      >
        <div
          className={classNames(
            '"modal rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-graydark overflow-auto"',
            { hidden: !shown },
          )}
        >
          <div className="fixed inset-0 flex items-center justify-center bg-secondary bg-opacity-75 z-50 rounded-md">
            <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
              <div className="w-full flex justify-end bg-body rounded-xl">
                <div>
                  {/* modal body */}
                  <div tabIndex={-1}>
                    <div className="w-[50vw] z-999999">
                      <div className="modal-content">
                        <div className="modal-header border-secondary border-0 border-b-[1px] mb-6">
                          <div className="p-3">
                            <h5 className="text-white">Edit image</h5>
                          </div>
                        </div>
                        <div className="modal-body flex justify-center">
                          <div className="w-2/3  h-100">
                            <img
                              className="bg-cover w-2/3 h-100"
                              ref={
                                imageCropperEditAreaRef as LegacyRef<HTMLImageElement>
                              }
                            />
                          </div>
                        </div>
                        <div className="border-secondary border-0 border-t-[1px] mt-6 p-3">
                          <div className="flex w-full justify-end items-end">
                            <div className="w-30">
                              <ProcessingButton
                                isLoading={false}
                                onClick={() => {
                                  toggleModal();
                                }}
                                text="Cancel"
                                backgroundClassname="transparent"
                                type="button"
                              ></ProcessingButton>
                            </div>
                            <div className="w-30">
                              <PrimaryProcessingButton
                                isLoading={false}
                                onClick={() => {
                                  onSaveCroppedHandler(null);
                                }}
                                text="Save changes"
                                type="button"
                              ></PrimaryProcessingButton>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
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
