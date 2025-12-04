import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Authentication
export const login = async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
};

export const register = async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
};

// Inventory
export const fetchInventory = async () => {
    const response = await api.get('/inventory');
    return response.data;
};

export const createProduct = async (productData) => {
    const response = await api.post('/inventory', productData);
    return response.data;
};

export const updateProduct = async (productId, productData) => {
    const response = await api.put(`/inventory/${productId}`, productData);
    return response.data;
};

export const deleteProduct = async (productId) => {
    const response = await api.delete(`/inventory/${productId}`);
    return response.data;
};

// Sales
export const fetchSales = async () => {
    const response = await api.get('/sales');
    return response.data;
};

export const createSale = async (saleData) => {
    const response = await api.post('/sales', saleData);
    return response.data;
};

// Purchases
export const fetchPurchases = async () => {
    const response = await api.get('/purchases');
    return response.data;
};

export const createPurchase = async (purchaseData) => {
    const response = await api.post('/purchases', purchaseData);
    return response.data;
};

// Suppliers
export const fetchSuppliers = async () => {
    const response = await api.get('/suppliers');
    return response.data;
};

export const createSupplier = async (supplierData) => {
    const response = await api.post('/suppliers', supplierData);
    return response.data;
};

// Customers
export const fetchCustomers = async () => {
    const response = await api.get('/customers');
    return response.data;
};

export const createCustomer = async (customerData) => {
    const response = await api.post('/customers', customerData);
    return response.data;
};

// Reports
export const fetchReports = async () => {
    const response = await api.get('/reports');
    return response.data;
};

export default api;