export const ChannelPhoto = (props: { photoFileId: string | undefined |  null}) => {
  return (
    <>
      <span>
        <img
          className="h-12 w-12 rounded-full"
          src={'/api/Photo/GetPhotoUrl/' + props.photoFileId + '/50'}
          alt="User"
        />
      </span>
    </>
  );
};
