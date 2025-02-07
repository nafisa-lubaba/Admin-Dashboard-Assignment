import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SharedTitle from '../../components/Shared/SharedTitle';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [name, setName] = useState("");
    const [search, setSearch] = useState("");
    const [sortOrder, setSortOrder] = useState(""); // Sorting state
    const [alert, setAlert] = useState({ show: false, message: '', type: '' });
    const [isLoading, setIsLoading] = useState(false);

    // Show alert message
    const showAlert = (message, type) => {
        setAlert({ show: true, message, type });
        setTimeout(() => setAlert({ show: false, message: '', type: '' }), 3000);
    };

    // Fetch products from API
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

    // Add new product
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

    // Delete product
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

    // Filtered and sorted products
    const filteredProducts = products
        .filter(product => {
            const productName = product.name?.toLowerCase() || "";
            const productPrice = (product.data?.price ?? "").toString();

            return (
                productName.includes(search.toLowerCase()) ||
                productPrice.includes(search)
            );
        })
        .sort((a, b) => {
            const priceA = a.data?.price ?? 0;
            const priceB = b.data?.price ?? 0;
            return sortOrder === "asc" ? priceA - priceB : sortOrder === "desc" ? priceB - priceA : 0;
        });

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

            {/* Search and Sort Controls */}
            <div className="mb-4 flex flex-col md:flex-row gap-3">
                <input
                    type="text"
                    placeholder='Search by Name or Price'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className='border p-2 rounded flex-1 w-full md:w-auto'
                />

                <select 
                    onChange={(e) => setSortOrder(e.target.value)} 
                    className="border p-2 rounded bg-teal-500 text-white"
                >
                    <option value="">Sort by Price</option>
                    <option value="asc">Low to High</option>
                    <option value="desc">High to Low</option>
                </select>
            </div>

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
            {filteredProducts.length === 0 ? (
                <p className="text-gray-500 text-center">No products available</p>
            ) : (
                <ul className="space-y-3">
                    {filteredProducts.map((product) => (
                        <li 
                            key={product.id} 
                            className='bg-white p-4 rounded-lg border border-gray-200 flex flex-col sm:flex-row items-center justify-between shadow-sm'
                        >
                           <div className=''>
                           <div className="text-center sm:text-left">
                                <span className="font-medium">Product Name:{product.name || "Unnamed Product"}</span>
                            </div>
                            <div className="text-center sm:text-left mt-2">
                                <span className="font-medium">
                                   Price: ${product.data?.price ?? "N/A"}
                                </span>
                            </div>
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
