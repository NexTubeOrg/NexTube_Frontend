
import UsersListContainer from '../../../components/Admin/AllUsers';
const Admin = () => {
  return (
    <>
<div className="grid  grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
  <h1 className='text-white text-3xl mb-2'>Admin panel</h1>
      <div className="col-span-12 xl:col-span-8">
          <UsersListContainer />
        </div>
      </div>

      
    </>
  );
};

export default Admin;