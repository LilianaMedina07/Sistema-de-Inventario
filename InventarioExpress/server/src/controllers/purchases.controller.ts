import { Request, Response } from 'express';
import { Purchase, Product } from '../models';

const getAll = async (req: Request, res: Response) => {
    try {
        const purchases = await Purchase.find().populate('product');
        res.status(200).json(purchases);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching purchases', error });
    }
};

const create = async (req: Request, res: Response) => {
    try {
        const { product: productId, quantity, totalPrice, date } = req.body;

        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        // Increase inventory
        product.quantity = (product.quantity || 0) + quantity;
        await product.save();

        const purchase = new Purchase({ product: productId, quantity, totalPrice, date });
        await purchase.save();

        res.status(201).json(purchase);
    } catch (error) {
        res.status(500).json({ message: 'Error creating purchase', error });
    }
};

export default { getAll, create };

export const getPurchaseById = async (req: Request, res: Response) => {
    try {
        const purchase = await Purchase.findById(req.params.id);
        if (!purchase) {
            return res.status(404).json({ message: 'Purchase not found' });
        }
        res.status(200).json(purchase);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching purchase', error });
    }
};

export const updatePurchase = async (req: Request, res: Response) => {
    try {
        const purchase = await Purchase.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!purchase) {
            return res.status(404).json({ message: 'Purchase not found' });
        }
        res.status(200).json(purchase);
    } catch (error) {
        res.status(500).json({ message: 'Error updating purchase', error });
    }
};

export const deletePurchase = async (req: Request, res: Response) => {
    try {
        const purchase = await Purchase.findByIdAndDelete(req.params.id);
        if (!purchase) {
            return res.status(404).json({ message: 'Purchase not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting purchase', error });
    }
};