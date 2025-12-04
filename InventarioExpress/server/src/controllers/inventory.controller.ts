import { Request, Response } from 'express';
import { Product } from '../models';

const getAll = async (req: Request, res: Response) => {
    try {
        const products = await Product.find().populate('supplier');
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error });
    }
};

const create = async (req: Request, res: Response) => {
    try {
        const payload = req.body;
        const product = new Product(payload);
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ message: 'Error creating product', error });
    }
};

const getById = async (req: Request, res: Response) => {
    try {
        const product = await Product.findById(req.params.id).populate('supplier');
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching product', error });
    }
};

const update = async (req: Request, res: Response) => {
    try {
        const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json(updated);
    } catch (error) {
        res.status(400).json({ message: 'Error updating product', error });
    }
};

const remove = async (req: Request, res: Response) => {
    try {
        const deleted = await Product.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: 'Product not found' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product', error });
    }
};

export default { getAll, create, getById, update, delete: remove };