import React, { useEffect, useState } from 'react';
import { fetchInventory, deleteInventoryItem } from '../services/api';
import InventoryTable from '../components/InventoryTable';

const Inventory = () => {
    const [inventoryItems, setInventoryItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadInventory = async () => {
            try {
                const items = await fetchInventory();
                setInventoryItems(items);
            } catch (error) {
                console.error('Error fetching inventory:', error);
            } finally {
                setLoading(false);
            }
        };

        loadInventory();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteInventoryItem(id);
            setInventoryItems(inventoryItems.filter(item => item.id !== id));
        } catch (error) {
            console.error('Error deleting inventory item:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Inventory Management</h1>
            <InventoryTable items={inventoryItems} onDelete={handleDelete} />
        </div>
    );
};

export default Inventory;