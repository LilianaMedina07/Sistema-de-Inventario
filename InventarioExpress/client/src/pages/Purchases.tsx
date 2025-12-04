import React, { useEffect, useState } from 'react';
import { fetchPurchases } from '../services/api';

const Purchases: React.FC = () => {
    const [purchases, setPurchases] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const getPurchases = async () => {
            try {
                const data = await fetchPurchases();
                setPurchases(data);
            } catch (err) {
                setError('Failed to fetch purchases');
            } finally {
                setLoading(false);
            }
        };

        getPurchases();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1>Purchases</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Supplier</th>
                        <th>Date</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {purchases.map((purchase) => (
                        <tr key={purchase.id}>
                            <td>{purchase.id}</td>
                            <td>{purchase.supplier}</td>
                            <td>{new Date(purchase.date).toLocaleDateString()}</td>
                            <td>{purchase.total}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Purchases;