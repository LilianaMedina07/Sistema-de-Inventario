import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="header">
            <h1>InventarioExpress</h1>
            <nav>
                <ul>
                    <li><a href="/">Dashboard</a></li>
                    <li><a href="/inventory">Inventory</a></li>
                    <li><a href="/sales">Sales</a></li>
                    <li><a href="/purchases">Purchases</a></li>
                    <li><a href="/suppliers">Suppliers</a></li>
                    <li><a href="/customers">Customers</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;