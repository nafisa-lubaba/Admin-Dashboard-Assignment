import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SharedTitle from '../../components/Shared/SharedTitle';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [name, setName] = useState("");
    const [alert, setAlert] = useState({ show: false, message: '', type: '' });
    const [isLoading, setIsLoading] = useState(false);

    const showAlert = (message, type) => {
        setAlert({ show: true, message, type });
        setTimeout(() => setAlert({ show: false, message: '', type: '' }), 3000);
    };

    const fetchProducts = async () => {
        try {
            const response = await axios.get("https://api.restful-api.dev/objects");
            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching products:", error);
            showAlert('Failed to fetch products', 'error');
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleAddProducts = async () => {
        if (!name) {
            showAlert('Please enter a product name', 'error');
            return;
        }

        setIsLoading(true);
        const productData = {
            name: name,
            data: {
                year: new Date().getFullYear(),
                price: 100,
                description: "Product description"
            }
        };

        try {
            const response = await axios.post("https://api.restful-api.dev/objects", productData);
            setProducts(prevProducts => [response.data, ...prevProducts]);
            setName("");
            showAlert('Product added successfully!', 'success');
        } catch (error) {
            console.error("Error adding product:", error);
            showAlert('Failed to add product', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteProducts = async (id) => {
        try {
            setIsLoading(true);
            await axios.delete(`https://api.restful-api.dev/objects/${id}`);

            setProducts(prevProducts => prevProducts.filter(product => product.id !== id));
            showAlert('Product deleted successfully!', 'success');
        } catch (error) {
            console.error("Delete error:", error.response || error);
            showAlert('Failed to delete product. Please try again.', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='p-5 max-w-3xl mx-auto'>
            <SharedTitle heading="Products" />

            {alert.show && (
                <div 
                    className={`mb-4 p-4 rounded-md text-center ${
                        alert.type === 'success' 
                            ? 'bg-green-100 text-green-700 border border-green-400' 
                            : 'bg-red-100 text-red-700 border border-red-400'
                    }`}
                >
                    {alert.message}
                </div>
            )}

            {/* Product Input Section */}
            <div className="mb-6 flex flex-wrap items-center gap-3">
                <input
                    type="text"
                    placeholder='Product Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className='border p-2 rounded flex-1 w-full md:w-auto'
                    disabled={isLoading}
                />
                <button
                    onClick={handleAddProducts}
                    className={`px-4 py-2 rounded text-white w-full md:w-auto ${
                        isLoading ? 'bg-teal-300 cursor-not-allowed' : 'bg-teal-500 hover:bg-teal-600'
                    }`}
                    disabled={isLoading}
                >
                    {isLoading ? 'Processing...' : 'Add Product'}
                </button>
            </div>

            {/* Product List */}
            {products.length === 0 ? (
                <p className="text-gray-500 text-center">No products available</p>
            ) : (
                <ul className="space-y-3">
                    {products.map((product) => (
                        <li 
                            key={product.id} 
                            className='bg-white p-4 rounded-lg border border-gray-200 flex flex-col sm:flex-row items-center justify-between shadow-sm'
                        >
                            <div className="text-center sm:text-left">
                                <span className="font-medium">{product.name}</span>
                            </div>
                            <button
                                onClick={() => handleDeleteProducts(product.id)}
                                className={`rounded px-4 py-2 text-white mt-2 sm:mt-0 ${
                                    isLoading ? 'bg-red-300 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600'
                                }`}
                                disabled={isLoading}
                            >
                                {isLoading ? 'Deleting...' : 'Delete'}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Products;

