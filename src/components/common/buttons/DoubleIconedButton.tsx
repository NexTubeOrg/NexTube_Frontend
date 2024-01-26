import { EventHandler } from 'react';
import OperationLoader from '../../../common/OperationLoader';

export const DoubleIconedProcessingButton = (props: {
  isLoadingLeft: boolean;
  isLoadingRight: boolean;
  onClickLeft: EventHandler<any> | undefined;
  onClickRight: EventHandler<any> | undefined;
  textLeft: string;
  textRight: string;
  backgroundClassnameLeft: string;
  backgroundClassnameRight: string;
  typeLeft: 'submit' | 'reset' | 'button' | undefined;
  typeRight: 'submit' | 'reset' | 'button' | undefined;
  iconLeft: any;
  iconRight: any;
  iconLeftPress: any;
  iconRightPress: any;
  iconLeftColor: string;
  iconRightColor: string;
}) => {
  return (
    <>
      <button
        onClick={props.onClickLeft}
        type={props.typeLeft}
        className={`w-full h-12 cursor-pointer rounded-l-lg border border-${props.backgroundClassnameLeft} bg-${props.backgroundClassnameLeft} p-2 text-white transition hover:bg-opacity-90`}
      >
        {props.isLoadingLeft && <OperationLoader></OperationLoader>}
        {!props.isLoadingLeft && (
          <div className="flex items-center">
            <div className={`h-8 w-8 mr-2 text-${props.iconLeftColor}`}>
              {props.iconLeftColor == 'white'
                ? props.iconLeft
                : props.iconLeftPress}
            </div>
            <span className="font-bold">{props.textLeft}</span>
          </div>
        )}
      </button>
      <button
        onClick={props.onClickRight}
        type={props.typeRight}
        className={`w-full  h-12 cursor-pointer rounded-r-lg border border-${props.backgroundClassnameRight} bg-${props.backgroundClassnameRight} p-2 text-white transition hover:bg-opacity-90`}
      >
        {props.isLoadingRight && <OperationLoader></OperationLoader>}
        {!props.isLoadingRight && (
          <div className="flex items-center">
            <div className={`h-8 w-8 mr-2 text-${props.iconRightColor}`}>
              {props.iconRightColor == 'white'
                ? props.iconRight
                : props.iconRightPress}
            </div>
            <span>{props.textRight}</span>
          </div>
        )}
      </button>
    </>
  );
};
