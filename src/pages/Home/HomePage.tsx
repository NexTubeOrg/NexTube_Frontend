import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <h1>this is Home page</h1>
      <Link to="/update-user">Перейти на сторінку "Про нас"</Link>
    </>
  );
};
export default HomePage;
