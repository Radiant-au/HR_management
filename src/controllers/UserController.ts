// src/controllers/UserController.ts
import { UserResponseDto } from "@dtos/UserDto";
import { UserService } from "@services/UserService";
import { Request, Response } from "express";


export class UserController {

  static async getUserProfile(req: Request, res: Response){
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token){
        res.status(401).json({ message: "Token not provided" });
        return;
      }  

      const user = await UserService.getUserByJWT(token);
      const response :UserResponseDto = {
        username : user.username,
        email : user.email,
        profileImg : user.profileImg,
        role : user.role.name
      }
      res.json(response);
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

      const profileImg = req.file?.filename; 
      const updatedUser = await UserService.updateUserProfile(token , profileImg , req.body);
      res.json(updatedUser);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async registerPassword(req: Request, res: Response) {
    try {

      const id = req.params.id;
      const update = await UserService.registerPassword(id , req.body.password);
      res.json(update);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}
