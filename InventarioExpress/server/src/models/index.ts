import { Schema, model } from 'mongoose';

// Product Schema
const productSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    supplier: { type: Schema.Types.ObjectId, ref: 'Supplier' }
});

// Supplier Schema
const supplierSchema = new Schema({
    name: { type: String, required: true },
    contactInfo: { type: String },
    address: { type: String }
});

// Customer Schema
const customerSchema = new Schema({
    name: { type: String, required: true },
    contactInfo: { type: String },
    address: { type: String }
});

// Sale Schema
const saleSchema = new Schema({
    product: { type: Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    date: { type: Date, default: Date.now }
});

// Purchase Schema
const purchaseSchema = new Schema({
    product: { type: Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    date: { type: Date, default: Date.now }
});

// Models
const Product = model('Product', productSchema);
const Supplier = model('Supplier', supplierSchema);
const Customer = model('Customer', customerSchema);
const Sale = model('Sale', saleSchema);
const Purchase = model('Purchase', purchaseSchema);

export { Product, Supplier, Customer, Sale, Purchase };