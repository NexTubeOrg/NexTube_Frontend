import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // Import the hook

export const SearchField = () => {
  const [searchVideoName, setSearchVideoName] = useState<string>('');
  const nav = useNavigate();
  const { t } = useTranslation(); // Initialize the hook
  return (
    <>
      <form
        onSubmit={(event) => {
          nav('/video/search/' + searchVideoName);
          event.preventDefault();
        }}
      >
        <div className="relative w-100 text-white">
          <button
            type="button"
            onClick={() => {
              nav('/video/search/' + searchVideoName);
            }}
            className="absolute top-1/2 left-0 -translate-y-1/2 text-white"
          >
            <div className="w-5 m-3 relative dark:text-white">
              <MagnifyingGlassIcon></MagnifyingGlassIcon>
            </div>
          </button>

          <input
            type="text"
            placeholder={t("search")}
            className="w-full p-1 bg-secondary pr-4 pl-9 focus:outline-none"
            onChange={(input) => setSearchVideoName(input.target.value)}
          />
        </div>
      </form>
    </>
  );
};
