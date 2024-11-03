import { UserRepository } from '@repositories/UserRepository';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


export async function authenticateToken(req: Request, res: Response, next: NextFunction): Promise<void> {
  const token = req.headers['authorization']?.split(' ')[1];
  
  if (!token) {
     res.status(403).json({ message: "JSON Token is not provided" });
     return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "defaultSecret") as { userId: string };
    const user = await UserRepository.findOne({where : { id: decoded.userId } , relations : ['role']});
    req.body.userRole = user.role.name; // Attach user role to req.body
    next();
  } catch (err) {
    res.status(403).json({ message: "JSON token is not valid or expired" });
  }
}

export function authorizeRoles(...allowedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.body.userRole;

    if (!allowedRoles.includes(userRole)) {
       res.status(403).json({ message: "Access denied" });
       return
    }

    next();
  };
}

