// src/services/AuthService.ts
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { UserRepository } from "@repositories/UserRepository";

export class AuthService {
   
  static async register(username: string , email: string , password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = UserRepository.create({ username, email, password: hashedPassword });
    await UserRepository.save(user);
    return user;
  }

  static async login(email: string, password: string) {
    const user = await UserRepository.findOneBy({ email });
    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || "defaultSecret" , {expiresIn : process.env.JWT_EXPIRE_MINUTES + 'm'});
      return { token };
    }
    throw new Error("Invalid email or password");
  }
}
