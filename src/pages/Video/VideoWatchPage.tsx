import { useParams } from "react-router-dom";
import http_api from "../../services/http_api";
import { useEffect, useState } from "react";
import { IGetVideoResult, IVideoLookup } from "./common/types";
import { WatchVideo } from "../../components/Videos/WatchVideo";

const VideoWatchPage = () => {
    const { id } = useParams();

    useEffect(() => {
        const request = async () => {
            const result = await http_api.get<IGetVideoResult>('/api/video/getVideo?VideoId=' + id);
            setVideo(result.data.video);
        };

        request();
    }, [id]);

    const [video, setVideo] = useState<IVideoLookup>();

    return (
        <>
            {video&&(<WatchVideo video={video}/>)}
        </>
    );
};

export default VideoWatchPage;