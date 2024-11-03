// src/services/UserService.ts
import { Role } from "@entities/Role";
import { User } from "@entities/User";
import { UserRepository } from "@repositories/UserRepository";
import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken"

export class UserService {
    static async getUserByJWT(token: string) {
        if (!token) throw new Error("Token not provided");
    
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "defaultSecret") as { userId: string };
        const user = await UserRepository.findOneBy({ id: decoded.userId });
        if (!user) throw new Error("User not found");
    
        return user;
    }

  static async updateUserProfile(id: string, updateData: Partial<User>) {
    await UserRepository.update(id, updateData);
    return await UserRepository.findOneBy({ id });
  }

  static async registerPassword(userId: string, password: string): Promise<void> {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword)
    await UserRepository.update(userId, { password: hashedPassword });
}

static async createUser(data: { email: string; role: Role; name: string; }): Promise<User> {
  const user = new User();
  user.email = data.email;
  user.role = data.role; // Assign "employee" role (id 3)
  user.username = data.name;
  
  return await UserRepository.save(user);
}

}
