import { HandThumbUpIcon, HandThumbDownIcon } from '@heroicons/react/20/solid';
import { DoubleIconedProcessingButton } from '../common/buttons/DoubleIconedButton';
import { useEffect, useState } from 'react';
import http_api from '../../services/http_api';
import { IVideoReactions } from './types';
import numeral from 'numeral';

export const AddVideoReaction = (props: { videoId: number }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [reactions, setReactions] = useState<IVideoReactions>({
    likes: 0,
    dislikes: 0,
  });

  useEffect(() => {
    const loadReactions = async () => {
      setIsLoading(() => true);

      const result = (
        await http_api.get<IVideoReactions>(
          `/api/Video/Reaction/GetCountVideoReactions/${props.videoId}`,
        )
      ).data;
      setReactions(() => result);
      console.log(result);
      setIsLoading(() => false);
    };

    loadReactions();
  }, [props.videoId]);
  return (
    <>
      <div className="flex mr-5">
        <DoubleIconedProcessingButton
          isLoadingLeft={isLoading}
          onClickLeft={() => {}}
          textLeft={`${numeral(reactions.likes).format('0a').toUpperCase()}`}
          typeLeft="button"
          backgroundClassnameLeft="primary"
          iconLeft={<HandThumbUpIcon></HandThumbUpIcon>}
          isLoadingRight={isLoading}
          onClickRight={() => {}}
          textRight={`${
            reactions.dislikes > 0
              ? numeral(reactions.dislikes).format('0a').toUpperCase()
              : ''
          }`}
          typeRight="button"
          iconRight={<HandThumbDownIcon></HandThumbDownIcon>}
          backgroundClassnameRight="secondary"
        ></DoubleIconedProcessingButton>
      </div>
    </>
  );
};
