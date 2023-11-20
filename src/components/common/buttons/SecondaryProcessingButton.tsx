import { EventHandler } from 'react';
import { ProcessingButton } from './ProcessingButton';

export const SecondaryProcessingButton = (props: {
  isLoading: boolean;
  onClick: EventHandler<any>;
  text: string;
  type: 'submit' | 'reset' | 'button' | undefined;
}) => {
  return (
    <>
      <ProcessingButton
        isLoading={props.isLoading}
        onClick={props.onClick}
        text={props.text}
        backgroundClassname="secondary"
        type={props.type}
      ></ProcessingButton>
    </>
  );
};
