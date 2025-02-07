
import { useEffect, useState } from "react";
import { Search, ArrowUpDown } from "lucide-react";

const User = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "name", direction: "asc" });

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  // Search functionality
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
    
    
  );

  // Sort functionality
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (!sortConfig.key) return 0;

    let aValue = sortConfig.key.includes(".")
      ? sortConfig.key.split(".").reduce((obj, key) => obj[key], a)
      : a[sortConfig.key];
    let bValue = sortConfig.key.includes(".")
      ? sortConfig.key.split(".").reduce((obj, key) => obj[key], b)
      : b[sortConfig.key];

    if (typeof aValue === "string") {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }

    if (sortConfig.direction === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const handleSort = (key) => {
    setSortConfig((current) => ({
      key,
      direction:
        current.key === key && current.direction === "asc" ? "desc" : "asc",
    }));
  };

  return (
    <div className="p-3 md:p-5">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-4">Users List</h1>
        
        {/* Search Bar */}
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search by Name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>

        {/* Sort Controls */}
        <div className="flex flex-wrap gap-2 mb-4 border border-teal-500">
          <button
            onClick={() => handleSort("name")}
            className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <ArrowUpDown size={16} />
            Name
          </button>
          
       
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3 md:gap-4">
        {sortedUsers.map((user) => (
          <div
            key={user.id}
            className="bg-white shadow-sm md:shadow-lg p-3 md:p-4 rounded-lg border border-gray-200 hover:shadow-xl transition-shadow"
          >
            <h3 className="text-lg md:text-xl font-semibold">
              Name: {user.name}
            </h3>
            <p className="text-sm md:text-base text-gray-600">
              Email: {user.email}
            </p>
            <p className="text-xs md:text-sm text-gray-500">
              City: {user.address.city}
            </p>
            <button
              onClick={() => setSelectedUser(user)}
              className="mt-2 md:mt-3 text-sm md:text-base bg-teal-500 hover:bg-teal-700 text-white px-3 py-1.5 md:px-4 md:py-2 rounded transition-colors"
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-2 p-4 md:p-6">
            <h3 className="text-xl md:text-2xl font-bold mb-3">
              {selectedUser.name}
            </h3>
            <p className="mb-2">
              <strong>Email:</strong> {selectedUser.email}
            </p>
            <p className="mb-2">
              <strong>Phone:</strong> {selectedUser.phone}
            </p>
            <p className="mb-2">
              <strong>Company:</strong> {selectedUser.company.name}
            </p>
            <p className="mb-4">
              <strong>Website:</strong> {selectedUser.website}
            </p>
            <button
              onClick={() => setSelectedUser(null)}
              className="w-full md:w-auto bg-teal-500 hover:bg-teal-700 text-white px-4 py-2 rounded transition-colors"
            >
              Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default User;