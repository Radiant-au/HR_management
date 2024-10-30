// src/controllers/UserController.ts
import { UserService } from "@services/UserService";
import { Request, Response } from "express";


export class UserController {
  static async getUserProfile(req: Request, res: Response) {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token){
        res.status(401).json({ message: "Token not provided" });
        return;
      }  

      const user = await UserService.getUserByJWT(token);
      res.json(user);
    } catch (error) {
      res.status(403).json({ message: error.message });
    }
  }

  static async updateProfile(req: Request, res: Response) {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token){
        res.status(401).json({ message: "Token not provided" });
        return;
      }

      const user = await UserService.getUserByJWT(token);
      const updatedUser = await UserService.updateUserProfile(user.id, req.body);
      res.json(updatedUser);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}
