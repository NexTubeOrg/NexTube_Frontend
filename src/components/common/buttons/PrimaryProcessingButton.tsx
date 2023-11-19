import { EventHandler } from 'react';
import { ProcessingButton } from './ProcessingButton';

export const PrimaryProcessingButton = (props: {
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
        backgroundClassname="primary"
        type={props.type}
      ></ProcessingButton>
    </>
  );
};
