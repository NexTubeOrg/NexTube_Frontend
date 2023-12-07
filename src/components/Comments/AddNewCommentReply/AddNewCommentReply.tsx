import { useState } from 'react';
import { SecondaryProcessingButton } from '../../common/buttons/SecondaryProcessingButton';
import AddNewCommentField from '../AddNewCommentField/AddNewCommentField';
import classNames from 'classnames';

const AddNewCommentReply = (props: {
  videoId: number;
  rootCommentId: number | undefined;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <div className="w-30">
        <button
          className={classNames('text-primary px-1 py-0.5', {
            'bg-white rounded-md': isOpen,
          })}
          onClick={() => {
            setIsOpen((o) => !o);
          }}
        >
          Reply
        </button>
      </div>
      {isOpen && (
        <AddNewCommentField
          focus={true}
          onSubmit={() => setIsOpen(() => false)}
          onCancel={() => setIsOpen(() => false)}
          videoId={props.videoId}
          rootCommentId={props.rootCommentId}
        ></AddNewCommentField>
      )}
    </>
  );
};
export default AddNewCommentReply;
