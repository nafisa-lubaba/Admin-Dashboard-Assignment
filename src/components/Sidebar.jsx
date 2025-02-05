import { Link } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { FaBox } from "react-icons/fa";


const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-gray-500 text-white p-5">


      <h2 className="text-xl font-bold mb-4 ">Admin Dashboard</h2>
      <hr className="border-dashed border-white p-5" />
      <div className="border-dashed border-white">

      </div>
      <nav>
        <ul>
          <li className="mb-2">
            <div className="flex gap-3 ">
              <div><FaUserAlt />
              </div>
              <Link to="/" className="hover:text-gray-300">Users</Link>

            </div>


          </li>
          <li className="mb-2">
           <div className="flex gap-3">
            <div>
            <FaBox />
            </div>
           <Link to="/products" className="hover:text-gray-300">Products</Link>
           </div>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;