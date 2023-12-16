import { NavLink, useLocation } from 'react-router-dom';
import { INavbarReference } from './types';
import classNames from 'classnames';

export const Navbar = (props: {
  refs: INavbarReference[];
  routeLength: number;
}) => {
  const location = useLocation();
  const parts = location.pathname.split('/');
  const currentRoute =
    parts.length == props.routeLength ? parts.findLast(() => true) : '';
  console.log(location.pathname.split('/'));

  const references = props.refs.map((r, id) => (
    <>
      <li key={id} className="mr-6">
        <NavLink
          className={classNames('text-gray', {
            'text-white border-b-2 border-primary':
              r.path == currentRoute || (currentRoute == '' && r.index == true),
          })}
          to={r.path}
        >
          {r.title}
        </NavLink>
      </li>
    </>
  ));
  return (
    <>
      <nav>
        <ul className="flex w-full">{references}</ul>
      </nav>
    </>
  );
};
