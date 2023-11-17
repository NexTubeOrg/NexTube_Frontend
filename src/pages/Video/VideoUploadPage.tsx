import VideoUpload from "../../components/video/VideoUpload";

const VideoUploadPage = () => {

    return (
        <>
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="flex flex-wrap items-center justify-center h-screen">
                    <div className="w-full border-stroke dark:border-strokedark xl:w-1/2">
                        <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
                            <VideoUpload/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default VideoUploadPage;