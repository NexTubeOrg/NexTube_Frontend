import { Link } from 'react-router-dom';

const VideoItem = () => {
  return (
    <>
      <div className="item mx-2 my-5">
        <Link to={'/watch/1'}>
          <div className="w-75 h-45 bg-white"></div>
        </Link>

        <div className="flex items-start mt-5">
          <Link to={'/channel/1'}>
            <div className="rounded-full bg-white w-12 h-12 mr-5"></div>
          </Link>
          <div className="text">
            <Link to={'/watch/1'}>
              <h3 className="text-white text-lg">Video title</h3>
            </Link>
            <div className="mt-2">
              <Link to={'/channel/1'}>
                <h4 className="text-white text-sm">Channel name</h4>
              </Link>
              <h4 className="text-white text-sm">
                <span className="mr-2">310K views</span>{' '}
                <span>4 years ago</span>
              </h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export { VideoItem };
