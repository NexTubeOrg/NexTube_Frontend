import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { useNavigate } from 'react-router-dom';

export const SearchField = () => {
  const nav = useNavigate();
  return (
    <>
      <form action="/video/search" method="GET">
        <div className="relative w-100 text-white">
          <button
            type="button"
            onClick={() => {
              nav('/video/search');
            }}
            className="absolute top-1/2 left-0 -translate-y-1/2 text-white"
          >
            <div className="w-5 m-3 relative dark:text-white">
              <MagnifyingGlassIcon></MagnifyingGlassIcon>
            </div>
          </button>

          <input
            type="text"
            placeholder="Search"
            className="w-full p-1 bg-secondary pr-4 pl-9 focus:outline-none"
          />
        </div>
      </form>
    </>
  );
};
