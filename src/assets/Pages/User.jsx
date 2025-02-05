import axios from "axios";
import { useEffect, useState } from "react";
import SharedTitle from "../../components/Shared/SharedTitle";


const User = () => {
    const [user, SetUser] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    useEffect(() => {
        axios.get("https://jsonplaceholder.typicode.com/users")
            .then((response) => SetUser(response.data))
            .catch((error) => console.error("Error fetching users:", error));
    }, []

    )
    return (
        <div className="p-5">
            <SharedTitle heading="Users List"></SharedTitle>
        {/* <h2 className="text-3xl font-bold mb-5 flex  justify-center ">Users List</h2> */}
  
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          {user.map((user) => (
            <div key={user.id} className="bg-white shadow-lg p-4 rounded-lg border border-gray-200">
              <h3 className="text-xl font-semibold">Name: {user.name}</h3>
              <p className="text-gray-600">Email: {user.email}</p>
              <p className="text-gray-500">City: {user.address.city}</p>
              <button 
                onClick={() => setSelectedUser(user)}
                className="mt-3 bg-teal-300 text-white px-4 py-2 rounded hover:bg-teal-500"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
  
        {selectedUser && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h3 className="text-2xl font-bold">{selectedUser.name}</h3>
              <p><strong>Email:</strong> {selectedUser.email}</p>
              <p><strong>Phone:</strong> {selectedUser.phone}</p>
              <p><strong>Company:</strong> {selectedUser.company.name}</p>
              <p><strong>Website:</strong> {selectedUser.website}</p>
              <button 
                onClick={() => setSelectedUser(null)}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    );
};

export default User;