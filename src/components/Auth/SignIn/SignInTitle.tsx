// src/components/Auth/SignIn/SignInTitle.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';

export const SignInTitle = () => {
  const { t } = useTranslation();

  return (
    <>
      <h2 className="text-5xl font-bold text-black dark:text-white sm:text-title-xl5">
        <p>
          <span>{t('auth.signIn.title.line1')}</span>
        </p>
        <p>
          <span className="dark:text-secondary">{t('auth.signIn.title.line2')}</span>{' '}
          <span className="dark:text-primary">{t('auth.signIn.title.line3')}</span>
        </p>
      </h2>
    </>
  );
};
