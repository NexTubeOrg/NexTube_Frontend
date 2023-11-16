import { Modal } from '../../components/ModalSettings';

const HomePage = () => {
  return (
    <>
      <h1>this is Home page</h1>
      <Modal
        closeModal={() => {}}
        onSubmit={() => {}}
        defaultValue={true}
      ></Modal>
    </>
  );
};
export default HomePage;
