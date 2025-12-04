// This file defines TypeScript types and interfaces used throughout the backend application.

export interface Product {
    id: string;
    name: string;
    description: string;
    quantity: number;
    price: number;
}

export interface Supplier {
    id: string;
    name: string;
    contactInfo: string;
}

export interface Customer {
    id: string;
    name: string;
    email: string;
    phone: string;
}

export interface Sale {
    id: string;
    productId: string;
    customerId: string;
    quantity: number;
    totalPrice: number;
    date: Date;
}

export interface Purchase {
    id: string;
    productId: string;
    supplierId: string;
    quantity: number;
    totalPrice: number;
    date: Date;
}

export interface Report {
    totalSales: number;
    totalPurchases: number;
    totalInventoryValue: number;
}