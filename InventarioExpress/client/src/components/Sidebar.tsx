import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
    return (
        <div className="sidebar">
            <h2>InventarioExpress</h2>
            <ul>
                <li>
                    <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                    <Link to="/inventory">Inventory</Link>
                </li>
                <li>
                    <Link to="/sales">Sales</Link>
                </li>
                <li>
                    <Link to="/purchases">Purchases</Link>
                </li>
                <li>
                    <Link to="/suppliers">Suppliers</Link>
                </li>
                <li>
                    <Link to="/customers">Customers</Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;