import { Router } from 'express';
import authController from '../controllers/auth.controller';
import inventoryController from '../controllers/inventory.controller';
import salesController from '../controllers/sales.controller';
import purchasesController from '../controllers/purchases.controller';
import suppliersController from '../controllers/suppliers.controller';
import customersController from '../controllers/customers.controller';
import reportsController from '../controllers/reports.controller';

const router = Router();

// Auth routes
router.post('/auth/login', authController.login);
router.post('/auth/register', authController.register);

// Inventory routes
router.get('/inventory', inventoryController.getAll);
router.post('/inventory', inventoryController.create);
router.get('/inventory/:id', inventoryController.getById);
router.put('/inventory/:id', inventoryController.update);
router.delete('/inventory/:id', inventoryController.delete);

// Sales routes
router.get('/sales', salesController.getAll);
router.post('/sales', salesController.create);

// Purchases routes
router.get('/purchases', purchasesController.getAll);
router.post('/purchases', purchasesController.create);

// Suppliers routes
router.get('/suppliers', suppliersController.getAll);
router.post('/suppliers', suppliersController.create);

// Customers routes
router.get('/customers', customersController.getAll);
router.post('/customers', customersController.create);

// Reports routes
router.get('/reports', reportsController.generate);

export default router;