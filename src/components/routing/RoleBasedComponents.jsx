import { useSelector } from 'react-redux';
import { adminComponentMap } from '../../features/adminComponentMap';
import { Suspense } from 'react';

const RoleBasedComponents = ({ route }) => {
  const {userData, role } = useSelector((state) => state.auth);
// const role = "super"

  const roles = userData?.role?.split("-")[0]

  if (!userData || !roles) return <div className="p-4 text-red-500">Unauthorized</div>;

  const Component = adminComponentMap[route]?.roles?.[roles];

  if (!Component) {
    return (
      <div className="p-4 text-gray-600">
        <strong>{route}</strong> not available for <strong>{role}</strong>
      </div>
    );
  }

  return (
    <Suspense fallback={<div className="p-4">Loading...</div>}>
      <Component />
    </Suspense>
  );
};

export default RoleBasedComponents;
