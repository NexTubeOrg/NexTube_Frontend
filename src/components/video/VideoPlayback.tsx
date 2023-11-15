import { useEffect } from "react";
import { BsCheckLg } from "react-icons/bs";
import { Player } from "video-react";

const VideoPlayback = (props: {
    url: string | undefined | null
}) => {

    useEffect(() => {
        console.log(props.url);
    });

    return (
        <>
            <Player>
                <source src={props.url??""}/>
            </Player>
        </>
    );
};

export default VideoPlayback;