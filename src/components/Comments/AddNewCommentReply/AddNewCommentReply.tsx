import { useState } from 'react';
import { SecondaryProcessingButton } from '../../common/buttons/SecondaryProcessingButton';
import AddNewCommentField from '../AddNewCommentField/AddNewCommentField';

const AddNewCommentReply = (props: {
  videoId: number;
  rootCommentId: number | undefined;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      {!isOpen && (
        <div className="w-30">
          <SecondaryProcessingButton
            onClick={() => {
              setIsOpen(() => true);
            }}
            type="button"
            text="Add reply"
            isLoading={false}
          ></SecondaryProcessingButton>
        </div>
      )}
      {isOpen && (
        <AddNewCommentField
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
