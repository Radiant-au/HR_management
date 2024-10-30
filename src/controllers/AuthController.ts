// src/controllers/AuthController.ts
import { AuthService } from "@services/AuthService";
import { Request, Response } from "express";


export class AuthController {
  static async register(req: Request, res: Response) {
    const { username, email, password } = req.body;
    try {
      const user = await AuthService.register(username, email, password);
      res.json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const token = await AuthService.login(email, password);
      res.json(token);
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  }
}
