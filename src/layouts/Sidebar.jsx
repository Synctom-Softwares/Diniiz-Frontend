/* eslint-disable no-unused-vars */
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { adminComponentMap } from '../features/adminComponentMap';

const Sidebar = () => {
  const role = useSelector((state) => state.auth.userData?.role);

  const links = Object.entries(adminComponentMap)
    .filter(([_, value]) => value.roles[role])
    .map(([key, value]) => ({
      path: `/${key}`,
      label: value.label,
    }));

  return (
    <nav className="flex flex-col gap-2 p-4 text-left">
      {links.map(({ path, label }) => (
        <NavLink
          key={path}
          to={path}
          className={({ isActive }) =>
            isActive ? 'text-primary font-semibold' : 'text-gray-700'
          }
        >
          {label}
        </NavLink>
      ))}
    </nav>
  );
};

export default Sidebar;
