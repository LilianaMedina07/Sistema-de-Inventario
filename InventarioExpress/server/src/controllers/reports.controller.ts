import { Request, Response } from 'express';
import { Sale, Purchase, Product } from '../models';

const generate = async (req: Request, res: Response) => {
    try {
        const { start, end, type } = req.query as any;
        const filter: any = {};
        if (start || end) filter.date = {};
        if (start) filter.date.$gte = new Date(start);
        if (end) filter.date.$lte = new Date(end);

        const sales = await Sale.find(filter).populate('product');
        const purchases = await Purchase.find(filter).populate('product');
        const products = await Product.find();

        const totalSales = sales.reduce((s: number, item: any) => s + (item.totalPrice || 0), 0);
        const totalPurchases = purchases.reduce((s: number, item: any) => s + (item.totalPrice || 0), 0);
        const totalInventoryValue = products.reduce((s: number, p: any) => s + ((p.price || 0) * (p.quantity || 0)), 0);

        const report = { totalSales, totalPurchases, totalInventoryValue, salesCount: sales.length, purchasesCount: purchases.length };

        // Allow filtering by type
        if (type === 'sales') return res.status(200).json({ ...report, sales });
        if (type === 'purchases') return res.status(200).json({ ...report, purchases });

        res.status(200).json(report);
    } catch (error) {
        res.status(500).json({ message: 'Error generating report', error });
    }
};

export default { generate };