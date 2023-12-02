import { useNavigate } from "react-router-dom";
import { handleError } from "../../common/handleError";
import { IVideoUploadRequest } from "../../pages/Video/common/types";
import http_api from "../../services/http_api";
import { useFormik } from "formik";
import { ModalCropper } from "../ModalCropper";

const VideoUpload = () => {

    const navigator = useNavigate();

    const request: IVideoUploadRequest = {
        name: '',
        description: '',
        previewPhoto: null,
        video: null
    }

    const onFormSubmit = async (values: IVideoUploadRequest) => {
        try {
            await http_api.post<IVideoUploadRequest>('/api/video/uploadVideo', values, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            navigator('/');

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
        values.previewPhoto = file;
        console.log(values);
    };

    const onVideoChangeHandler = (f: any) => {
        console.log('video input handle change', f);
        if (f != null) {
            onVideoSaveHandler(f.target.files[0]);
        }
    }

    const onVideoSaveHandler = (file: File) => {
        console.log('image save handle', file);
        values.video = file;
        console.log(values);
    };

    const formik = useFormik({
        initialValues: request,
        onSubmit: onFormSubmit,
    });

    const { values, errors, touched, handleSubmit, handleChange } = formik;

    return (
        <>
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="flex flex-wrap items-center justify-center">
                    <div className="w-full border-stroke dark:border-strokedark xl:w-1/2">
                        <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label htmlFor="name" className="mb-2.5 block font-medium text-black dark:text-white">Name</label>
                                    <div className="relative">
                                        <input
                                            id="name"
                                            name="name"
                                            value={values.name}
                                            onChange={handleChange}
                                            type="text"
                                            placeholder="Enter video name" />
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="name" className="mb-2.5 block font-medium text-black dark:text-white">Description</label>
                                    <div className="relative">
                                        <input
                                            id="description"
                                            name="description"
                                            value={values.description}
                                            onChange={handleChange}
                                            type="text"
                                            placeholder="Enter video name" />
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label className="mb-2.5 block font-medium text-black dark:text-white">Preview photo</label>
                                    <div className="relative">
                                        <ModalCropper onSave={onPreviewPhotoChangeHandler} error={''} />
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label className="mb-2.5 block font-medium text-black dark:text-white">Video</label>
                                    <div className="relative">
                                        <input
                                            id="video"
                                            name="video"
                                            type="file"
                                            onChange={(e: any) => { onVideoChangeHandler(e) }} />
                                    </div>
                                </div>

                                <div className="mb-5">
                                    <button type="submit" className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90">
                                        Upload
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

export default VideoUpload;