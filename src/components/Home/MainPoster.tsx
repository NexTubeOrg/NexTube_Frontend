// src/components/Home/MainPoster.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import './style.css';

export const MainPoster = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="h-[50vh]">
        <div className="h-full flex items-center justify-between">
          <div className="flex z-[9997] flex-col min-[1000px]:w-[32em] min-[1364px]:w-[64em]">
            <div className="mb-2">
              <h1 className="text-white text-6xl font-semibold">
                {t('mainPoster.watchNow')}
              </h1>
            </div>
            <div className="mb-2">
              <h2 className=" font-semibold text-primary  text-5xl">
                {t('mainPoster.title')}
              </h2>
            </div>
            <div className="mb-2">
              <p className="font-semibold text-white text-3xl">
                {t('mainPoster.description')}
              </p>
            </div>
          </div>
          <div className="relative h-full w-full">
            <div className="absolute z-[99] -top-[4em] -left-[20em] h-full w-[64em]">
              <div className="h-full w-full flex justify-end">
                <div
                  className={`banner h-[130%] w-full bg-cover bg-gray`}
                  style={{
                    backgroundImage: `url('/banner.jpg')`,
                  }}
                ></div>

                <div className="fade-gradient w-full h-[130%] absolute"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
