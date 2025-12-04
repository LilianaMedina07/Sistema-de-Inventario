import { Request, Response } from 'express';
import { Supplier } from '../models';

const getAll = async (req: Request, res: Response) => {
    try {
        const suppliers = await Supplier.find();
        res.status(200).json(suppliers);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving suppliers', error });
    }
};

const getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const supplier = await Supplier.findById(id);
        if (!supplier) return res.status(404).json({ message: 'Supplier not found' });
        res.status(200).json(supplier);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving supplier', error });
    }
};

const create = async (req: Request, res: Response) => {
    const newSupplier = new Supplier(req.body);
    try {
        const savedSupplier = await newSupplier.save();
        res.status(201).json(savedSupplier);
    } catch (error) {
        res.status(400).json({ message: 'Error creating supplier', error });
    }
};

const update = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const updatedSupplier = await Supplier.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedSupplier) return res.status(404).json({ message: 'Supplier not found' });
        res.status(200).json(updatedSupplier);
    } catch (error) {
        res.status(400).json({ message: 'Error updating supplier', error });
    }
};

const remove = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const deletedSupplier = await Supplier.findByIdAndDelete(id);
        if (!deletedSupplier) return res.status(404).json({ message: 'Supplier not found' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting supplier', error });
    }
};

export default { getAll, create, getById, update, delete: remove };