import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import Sales from './pages/Sales';
import Purchases from './pages/Purchases';
import Suppliers from './pages/Suppliers';
import Customers from './pages/Customers';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import './styles/globals.css';

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Sidebar />
      <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/inventory" component={Inventory} />
        <Route path="/sales" component={Sales} />
        <Route path="/purchases" component={Purchases} />
        <Route path="/suppliers" component={Suppliers} />
        <Route path="/customers" component={Customers} />
      </Switch>
    </Router>
  );
};

export default App;