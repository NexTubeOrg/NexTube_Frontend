import {
  HandThumbUpIcon,
  HandThumbDownIcon,
} from '@heroicons/react/24/outline';

import {
  HandThumbUpIcon as SolidHandThumbUpIcon,
  HandThumbDownIcon as SolidHandThumbDownIcon,
} from '@heroicons/react/20/solid';

import { DoubleIconedProcessingButton } from '../common/buttons/DoubleIconedButton';
import { useEffect, useState } from 'react';
import http_api from '../../services/http_api';
import { IVideoReactions, ReactionTypes } from './types';
import numeral from 'numeral';
import { useSelector } from 'react-redux';
import { IAuthUser } from '../../store/reducers/auth/types';
import { handleError } from '../../common/handleError';

export const AddVideoReaction = (props: { videoId: number }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [reactions, setReactions] = useState<IVideoReactions>({
    likes: 0,
    dislikes: 0,
    wasLikedByRequester: false,
    wasDislikedByRequester: false,
  });
  const { isAuth } = useSelector((store: any) => store.auth as IAuthUser);

  useEffect(() => {
    const loadReactions = async () => {
      setIsLoading(() => true);

      const result = (
        await http_api.get<IVideoReactions>(
          `/api/Video/Reaction/GetCountVideoReactions${
            isAuth ? 'WithStatus' : ''
          }/${props.videoId}`,
        )
      ).data;
      setReactions(() => result);
      console.log(result);
      setIsLoading(() => false);
    };

    loadReactions();
  }, [props.videoId]);

  const likeVideo = async () => {
    if (!isAuth) {
      handleError('Sign in to like');
      return;
    }
    setReactions((r) => {
      return {
        likes: r.wasLikedByRequester ? r.likes - 1 : r.likes + 1,
        dislikes: r.wasDislikedByRequester ? r.dislikes - 1 : r.dislikes,
        wasLikedByRequester: !r.wasLikedByRequester,
        wasDislikedByRequester: false,
      };
    });

    const request = {
      videoId: props.videoId,
      reactionType: ReactionTypes.Like,
    };

    await http_api.post<any>(`/api/Video/Reaction/ReactVideo`, request);
  };

  const dislikeVideo = async () => {
    if (!isAuth) {
      handleError('Sign in to dislike');
      return;
    }
    setReactions((r) => {
      return {
        likes: r.wasLikedByRequester ? r.likes - 1 : r.likes,
        dislikes: r.wasDislikedByRequester ? r.dislikes - 1 : r.dislikes + 1,
        wasLikedByRequester: false,
        wasDislikedByRequester: !r.wasDislikedByRequester,
      };
    });

    const request = {
      videoId: props.videoId,
      reactionType: ReactionTypes.Dislike,
    };
    await http_api.post<any>(`/api/Video/Reaction/ReactVideo`, request);
  };

  return (
    <>
      <div className="flex mr-5">
        <DoubleIconedProcessingButton
          isLoadingLeft={isLoading}
          onClickLeft={() => likeVideo()}
          textLeft={`${numeral(reactions.likes).format('0a').toUpperCase()}`}
          typeLeft="button"
          backgroundClassnameLeft="primary"
          iconLeft={<HandThumbUpIcon></HandThumbUpIcon>}
          isLoadingRight={isLoading}
          onClickRight={() => dislikeVideo()}
          textRight={`${
            reactions.dislikes > 0
              ? numeral(reactions.dislikes).format('0a').toUpperCase()
              : ''
          }`}
          typeRight="button"
          iconRight={<HandThumbDownIcon></HandThumbDownIcon>}
          iconLeftColor={reactions.wasLikedByRequester ? 'success' : 'white'}
          iconRightColor={reactions.wasDislikedByRequester ? 'danger' : 'white'}
          iconLeftPress={<SolidHandThumbUpIcon></SolidHandThumbUpIcon>}
          iconRightPress={<SolidHandThumbDownIcon></SolidHandThumbDownIcon>}
          backgroundClassnameRight="secondary"
        ></DoubleIconedProcessingButton>
      </div>
    </>
  );
};
