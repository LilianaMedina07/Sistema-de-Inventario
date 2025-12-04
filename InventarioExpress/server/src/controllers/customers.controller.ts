import { Request, Response } from 'express';
import { Customer } from '../models';

const getAll = async (req: Request, res: Response) => {
    try {
        const customers = await Customer.find();
        res.status(200).json(customers);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving customers', error });
    }
};

const getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const customer = await Customer.findById(id);
        if (!customer) return res.status(404).json({ message: 'Customer not found' });
        res.status(200).json(customer);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving customer', error });
    }
};

const create = async (req: Request, res: Response) => {
    const newCustomer = new Customer(req.body);
    try {
        const savedCustomer = await newCustomer.save();
        res.status(201).json(savedCustomer);
    } catch (error) {
        res.status(400).json({ message: 'Error creating customer', error });
    }
};

const update = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const updatedCustomer = await Customer.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedCustomer) return res.status(404).json({ message: 'Customer not found' });
        res.status(200).json(updatedCustomer);
    } catch (error) {
        res.status(400).json({ message: 'Error updating customer', error });
    }
};

const remove = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const deletedCustomer = await Customer.findByIdAndDelete(id);
        if (!deletedCustomer) return res.status(404).json({ message: 'Customer not found' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting customer', error });
    }
};

export default { getAll, create, getById, update, delete: remove };