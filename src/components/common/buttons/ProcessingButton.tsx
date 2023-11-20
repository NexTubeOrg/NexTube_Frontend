import { EventHandler } from 'react';
import OperationLoader from '../../../common/OperationLoader';

export const ProcessingButton = (props: {
  isLoading: boolean;
  onClick: EventHandler<any> | undefined;
  text: string;
  backgroundClassname: string;
  type: 'submit' | 'reset' | 'button' | undefined;
}) => {
  return (
    <>
      <button
        onClick={props.onClick}
        type={props.type}
        className={`w-full h-12 cursor-pointer rounded-md border border-${props.backgroundClassname} bg-${props.backgroundClassname} p-2 text-white transition hover:bg-opacity-90`}
      >
        {props.isLoading && <OperationLoader></OperationLoader>}
        {!props.isLoading && <span>{props.text}</span>}
      </button>
    </>
  );
};
