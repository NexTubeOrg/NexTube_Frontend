import React from 'react';
import { useTranslation } from 'react-i18next';

export const RecoverPasswordTitle = () => {
  const { t } = useTranslation();

  return (
    <>
      <h2 className="text-5xl font-bold text-black dark:text-white sm:text-title-xl5">
        <p>
          <span>{t('auth.recoverTitle.line1')}</span>
        </p>
        <p>
          <span className="">{t('auth.recoverTitle.line2')}</span>{' '}
          <span className="">{t('auth.recoverTitle.line3')}</span>
        </p>
      </h2>
    </>
  );
};
