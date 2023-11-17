import { useEffect, useState } from "react";
import http_api from "../../services/http_api";
import { IGetVideoRecomendationResult, IVideoLookup } from "../../pages/Video/common/types";
import VideoShortcut from "./VideoShortcut";
import { Link } from "react-router-dom";

const VideoRecomendationList = () => {

    useEffect(() => {
        const request = async () => {
            const result = await http_api.get<IGetVideoRecomendationResult>('/api/video/getAllVideoEntities');
            console.log(result);
            setVideos(result.data.videoEntities);
        };

        request();
    }, []);

    const [videos, setVideos] = useState<IVideoLookup[] | null>(null);

    const viewData = videos?.map((video) => (
        <VideoShortcut videoLookup={video} />
    ));

    return (
        <>
            <div>
                {viewData}
            </div>
        </>
    )
};

export default VideoRecomendationList;