import React, { useEffect, useState } from 'react';
import { fetchCustomers, deleteCustomer } from '../services/api';

const Customers = () => {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        const loadCustomers = async () => {
            const data = await fetchCustomers();
            setCustomers(data);
        };

        loadCustomers();
    }, []);

    const handleDelete = async (id) => {
        await deleteCustomer(id);
        setCustomers(customers.filter(customer => customer.id !== id));
    };

    return (
        <div>
            <h1>Customers</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map(customer => (
                        <tr key={customer.id}>
                            <td>{customer.id}</td>
                            <td>{customer.name}</td>
                            <td>{customer.email}</td>
                            <td>
                                <button onClick={() => handleDelete(customer.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Customers;