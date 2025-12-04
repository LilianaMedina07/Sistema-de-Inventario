import { Request, Response } from 'express';
import { Sale, Product } from '../models';

const create = async (req: Request, res: Response) => {
    try {
        const { product: productId, quantity, totalPrice, date } = req.body;

        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        if (product.quantity < quantity) return res.status(400).json({ message: 'Insufficient stock' });

        // Decrease inventory
        product.quantity = product.quantity - quantity;
        await product.save();

        const sale = new Sale({ product: productId, quantity, totalPrice, date });
        await sale.save();

        res.status(201).json(sale);
    } catch (error) {
        res.status(500).json({ message: 'Error creating sale', error });
    }
};

const getAll = async (req: Request, res: Response) => {
    try {
        const sales = await Sale.find().populate('product');
        res.status(200).json(sales);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching sales', error });
    }
};

export default { getAll, create };