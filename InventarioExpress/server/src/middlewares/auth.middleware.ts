import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const secretKey = process.env.JWT_SECRET || 'your_secret_key';

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && (authHeader as string).split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded: any = jwt.verify(token, secretKey);
        req.userId = decoded.id;

        // Load user role to attach to request
        const user = await User.findById(decoded.id).select('role');
        req.userRole = user?.role || 'employee';

        next();
    } catch (err) {
        return res.status(403).json({ message: 'Failed to authenticate token' });
    }
};

export const authorize = (roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.userId) {
            return res.status(403).json({ message: 'No user ID found' });
        }

        const userRole = req.userRole as string;
        if (!roles.includes(userRole)) {
            return res.status(403).json({ message: 'Access denied' });
        }

        next();
    };
};