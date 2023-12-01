import { NavLink } from 'react-router-dom';

export const PrimaryButtonLink = (props: { urlTo: string; title: string }) => {
  return (
    <>
      <NavLink
        to={props.urlTo}
        className={`relative flex items-center justify-center p-2 cursor-pointer rounded-md bg-primary  text-white transition hover:bg-opacity-90`}
      >
        <div className="rounded-md gradient absolute inset-0"></div>
        {props.title}
      </NavLink>
    </>
  );
};
