export const ChannelPhoto = (props: { photoUrl: string }) => {
  return (
    <>
      <span>
        <img
          className="h-12 w-12 rounded-full"
          src={'/api/Photo/GetPhotoUrl/' + props.photoUrl + '/50'}
          alt="User"
        />
      </span>
    </>
  );
};
