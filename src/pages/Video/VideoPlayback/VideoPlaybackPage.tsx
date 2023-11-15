import { useParams } from "react-router-dom";
import VideoPlayback from "../../../components/video/VideoPlayback";
import http_api from "../../../services/http_api";
import { useEffect, useState } from "react";
import { IGetVideoResult, IVideoLookup } from "./types";

const VideoPlaybackPage = () => {
    const { id } = useParams();

    useEffect(() => {
        const request = async () => {
            const result = await http_api.get<IGetVideoResult>('/api/video/getVideoEntity/' + id);
            setVideo(result.data.videoEntity);
        };

        request();
    }, [id]);

    const [video, setVideo] = useState<IVideoLookup | null>(null);

    return (
        <>
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="flex flex-wrap items-center justify-center h-screen">
                    <div className="w-full border-stroke dark:border-strokedark xl:w-1/2">
                        <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
                            {video&&(<VideoPlayback url={'/api/video/getVideoUrl/' + video?.videoFile} />)}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default VideoPlaybackPage;