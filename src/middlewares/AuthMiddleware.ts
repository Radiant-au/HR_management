import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export function authenticateToken(req: Request, res: Response, next: NextFunction): void {
  const token = req.headers['authorization']?.split(' ')[1];
  
  if (!token) {
     res.sendStatus(403);
  }

  jwt.verify(token, process.env.JWT_SECRET!, (err) => {
    if (err) {
      return res.sendStatus(403);
    }

    // If token is valid, proceed to the next middleware/route handler
    next();
  });
}
