import VideoCommentsLoader from '../../components/Comments/CommentsContainer/VideoCommentsLoader';

const HomePage = () => {
  return (
    <>
      <h1>this is Home page</h1>
      <VideoCommentsLoader videoId={3}></VideoCommentsLoader>
    </>
  );
};
export default HomePage;
