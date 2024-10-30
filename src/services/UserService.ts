// src/services/UserService.ts
import { User } from "@entities/User";
import { UserRepository } from "@repositories/UserRepository";

import jwt from "jsonwebtoken"

export class UserService {
    static async getUserByJWT(token: string) {
        if (!token) throw new Error("Token not provided");
    
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "defaultSecret") as { userId: number };
        const user = await UserRepository.findOneBy({ id: decoded.userId });
        if (!user) throw new Error("User not found");
    
        return user;
    }

  static async updateUserProfile(id: number, updateData: Partial<User>) {
    await UserRepository.update(id, updateData);
    return await UserRepository.findOneBy({ id });
  }
}
