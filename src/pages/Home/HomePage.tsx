import CommentsContainer from '../../components/Comments/CommentsContainer/CommentsContainer';

const HomePage = () => {
  return (
    <>
      <h1>this is Home page</h1>
      <CommentsContainer videoId={3}></CommentsContainer>
    </>
  );
};
export default HomePage;
