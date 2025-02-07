import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  return (
    <div className="w-64 bg-teal-600 min-h-screen p-4">
      <h2 className="text-white text-2xl mb-6">Admin Dashboard</h2>
      <hr className="border-dashed border-white p-5" />
      <nav>
        <NavLink 
          to="/" 
          className={({ isActive }) => `block p-2 text-teal-50 text-lg rounded mb-2 ${isActive ? 'bg-teal-500' : 'hover:bg-teal-500'}`}
        >
          Users
        </NavLink>
        <NavLink
          to="/products"
          className={({ isActive }) => `block p-2 text-teal-50 text-lg rounded mb-2 ${isActive ? 'bg-teal-500' : 'hover:bg-teal-500'}`}
        >
          Products
        </NavLink>
      </nav>
    </div>
  );
}