import { XMarkIcon } from '@heroicons/react/20/solid';
import { EventHandler } from 'react';

export const CancelButton = (props: { onClick: EventHandler<any> }) => {
  return (
    <>
      <button onClick={props.onClick}>
        <div className="w-10 h-10 text-gray">
          <XMarkIcon></XMarkIcon>
        </div>
      </button>
    </>
  );
};
