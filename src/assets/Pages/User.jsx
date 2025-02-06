import axios from "axios";
import { useEffect, useState } from "react";
import SharedTitle from "../../components/Shared/SharedTitle";

const User = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        axios.get("https://jsonplaceholder.typicode.com/users")
            .then((response) => setUsers(response.data))
            .catch((error) => console.error("Error fetching users:", error));
    }, []);

    return (
        <div className="p-3 md:p-5">
            <SharedTitle heading="Users List" />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3 md:gap-4">
                {users.map((user) => (
                    <div key={user.id} className="bg-white shadow-sm md:shadow-lg p-3 md:p-4 rounded-lg border border-gray-200">
                        <h3 className="text-lg md:text-xl font-semibold">Name: {user.name}</h3>
                        <p className="text-sm md:text-base text-gray-600">Email: {user.email}</p>
                        <p className="text-xs md:text-sm text-gray-500">City: {user.address.city}</p>
                        <button 
                            onClick={() => setSelectedUser(user)}
                            className="mt-2 md:mt-3 text-sm md:text-base bg-teal-500 hover:bg-teal-700 text-white px-3 py-1.5 md:px-4 md:py-2 rounded transition-colors"
                        >
                            View Details
                        </button>
                    </div>
                ))}
            </div>

            {selectedUser && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-2 p-4 md:p-6">
                        <h3 className="text-xl md:text-2xl font-bold mb-3">{selectedUser.name}</h3>
                        <p className="mb-2"><strong>Email:</strong> {selectedUser.email}</p>
                        <p className="mb-2"><strong>Phone:</strong> {selectedUser.phone}</p>
                        <p className="mb-2"><strong>Company:</strong> {selectedUser.company.name}</p>
                        <p className="mb-4"><strong>Website:</strong> {selectedUser.website}</p>
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