import React, { useState, useEffect } from 'react';
import { fetchSales, createSale } from '../services/api';

const Sales = () => {
    const [sales, setSales] = useState([]);
    const [newSale, setNewSale] = useState({ productId: '', quantity: 0, customerId: '' });

    useEffect(() => {
        const loadSales = async () => {
            const salesData = await fetchSales();
            setSales(salesData);
        };
        loadSales();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewSale({ ...newSale, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createSale(newSale);
        setNewSale({ productId: '', quantity: 0, customerId: '' });
        const salesData = await fetchSales();
        setSales(salesData);
    };

    return (
        <div>
            <h1>Sales Management</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="productId"
                    value={newSale.productId}
                    onChange={handleInputChange}
                    placeholder="Product ID"
                    required
                />
                <input
                    type="number"
                    name="quantity"
                    value={newSale.quantity}
                    onChange={handleInputChange}
                    placeholder="Quantity"
                    required
                />
                <input
                    type="text"
                    name="customerId"
                    value={newSale.customerId}
                    onChange={handleInputChange}
                    placeholder="Customer ID"
                    required
                />
                <button type="submit">Add Sale</button>
            </form>
            <h2>Sales List</h2>
            <ul>
                {sales.map((sale) => (
                    <li key={sale.id}>
                        Product ID: {sale.productId}, Quantity: {sale.quantity}, Customer ID: {sale.customerId}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sales;