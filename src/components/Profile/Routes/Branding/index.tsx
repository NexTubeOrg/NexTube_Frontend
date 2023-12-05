import { PrimaryProcessingButton } from '../../../common/buttons/PrimaryProcessingButton';

export const ProfileBranding = () => {
  return (
    <>
      <div className="item mb-12">
        <h3 className="text-white text-xl mb-2 font-bold">Picture</h3>
        <div className="flex">
          <div className="left">
            <div className="w-36 h-36 dark:bg-primary rounded-full mr-6">
              <img
                className=" fill-white rounded-full dark:bg-transparent"
                src="/human.jpg"
                alt=""
              />
            </div>
          </div>
          <div className="right w-80">
            <p className="text-gray text-lg">
              It`s recommended that you use a picture that`s at least 98 x 98
              pixels and 4 MB or less. Use any known file type.
            </p>
            <div className="w-35 mt-6">
              <PrimaryProcessingButton
                onClick={() => {}}
                isLoading={false}
                text="Upload"
                type="button"
              ></PrimaryProcessingButton>
            </div>
          </div>
        </div>
      </div>
      <div className="item mb-12">
        <h3 className="text-white text-xl mb-2 font-bold">Banner image</h3>
        <div className="flex">
          <div className="left">
            <div className="mr-6">
              <img
                className="w-36 fill-white dark:bg-transparent"
                src="/public/thumb_banner.png"
                alt=""
              />
            </div>
          </div>
          <div className="right w-80">
            <p className="text-gray text-lg">
              For the best results on all devices, use an image that`s at least
              2048 x 1152 pixels and 6 MB or less.
            </p>
            <div className="w-35 mt-6">
              <PrimaryProcessingButton
                onClick={() => {}}
                isLoading={false}
                text="Upload"
                type="button"
              ></PrimaryProcessingButton>
            </div>
          </div>
        </div>
      </div>
      <div className="item mb-12">
        <h3 className="text-white text-xl mb-2 font-bold">Video watermark</h3>
        <div className="flex">
          <div className="left">
            <div className="mr-6">
              <img
                className="w-36 fill-white dark:bg-transparent"
                src="/public/thumb_watermark.png"
                alt=""
              />
            </div>
          </div>
          <div className="right w-80">
            <p className="text-gray text-lg">
              An image that has 1:1 aspect ratio (square). Use any known format
              file that`s 1 MB or less.
            </p>
            <div className="w-35 mt-6">
              <PrimaryProcessingButton
                onClick={() => {}}
                isLoading={false}
                text="Upload"
                type="button"
              ></PrimaryProcessingButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
