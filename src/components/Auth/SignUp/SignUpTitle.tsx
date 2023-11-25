const SignUpTitle = (props: { text: string }) => {
  return (
    <>
      <h2 className="text-5xl font-bold text-black dark:text-white sm:text-title-xl5">
        <p>
          <span>{props.text}</span>
        </p>
      </h2>
    </>
  );
};
const SubTitle = (props: { text: string }) => {
  return (
    <>
      <h2 className="text-2xl font-bold text-black dark:text-gray sm:text-title-xl5">
        <p>
          <span>{props.text}</span>
        </p>
      </h2>
    </>
  );
};

export { SignUpTitle, SubTitle };
