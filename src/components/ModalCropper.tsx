import React, { LegacyRef, useEffect, useRef, useState } from 'react';
import { ICroppedModal } from '../common/CropperDialog/types';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';
import classNames from 'classnames';
import './../common/CropperDialog/style.css';
const defaultThumb = '/imageThumb.svg';

export const ModalCropper: React.FC<ICroppedModal> = ({
  imageUri = defaultThumb,
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
          aspectRatio: 1 / 1,
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

  console.log(imageUri);
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

          {error && <div className="invalid-feedback">{error}</div>}
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
          <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
            <div className="w-full flex justify-end">
              <strong
                className="text-xl align-center cursor-pointer "
                onClick={() => toggleModal()}
              >
                &times;
              </strong>
              <div>
                {/* modal body */}
                <div tabIndex={-1}>
                  <div className="modal-dialog fix-max-width">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                          Edit image
                        </h5>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                          onClick={toggleModal}
                        ></button>
                      </div>
                      <div className="modal-body">
                        <img
                          ref={
                            imageCropperEditAreaRef as LegacyRef<HTMLImageElement>
                          }
                        />
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-bs-dismiss="modal"
                          onClick={toggleModal}
                        >
                          Cancel
                        </button>
                        <button
                          onClick={onSaveCroppedHandler}
                          type="button"
                          className="btn btn-primary"
                        >
                          Save changes
                        </button>
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
