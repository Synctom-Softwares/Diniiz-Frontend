
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar'; 

const AdminLayout = () => {
  return (
    <div className="flex h-screen">
      <aside className="w-[250px] sticky top-0 h-full bg-white">
        <Sidebar />
      </aside>
      <main className="flex-1 overflow-y-auto bg-[#f7f7ff]">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;