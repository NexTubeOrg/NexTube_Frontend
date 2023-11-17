import { Link } from "react-router-dom";
import { IVideoLookup } from "../../pages/Video/common/types";
import { useEffect } from "react";

const VideoShortcut = (props: {
    videoLookup: IVideoLookup
}) => {

    useEffect(() => {
            console.log(props);
    }, []);

    return (
        <>
            <div>
                <Link to={'/video/watch/' + props.videoLookup.id}>
                    <img src={"/api/photo/getPhotoUrl/" + props.videoLookup.previewPhotoFile + '/600'} width={300} height={300}/>
                </Link>
                <div>
                    <img src={"/api/photo/getPhotoUrl/" + props.videoLookup.creator?.channelPhoto + '/50'} />
                    <h3>{props.videoLookup.name}</h3>
                </div>
                <span>{props.videoLookup.creator?.firstName} {props.videoLookup.creator?.lastName}</span>
                <div>
                    <span>100k views</span>
                    <span>{props.videoLookup.dateCreated}</span>
                </div>
            </div>
        </>
    )
};

export default VideoShortcut;