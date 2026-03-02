import type { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { env } from "../config/env.js";

type AuthBody = {
  email: string;
  password: string;
};

export async function register(
  req: Request<{}, {}, AuthBody>,
  res: Response,
  next: NextFunction
) {
  try {
    const { email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      res.status(400).json({ message: "이미 존재하는 이메일입니다." });
      return;
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashed
    });

    res.status(201).json({ message: "회원가입 성공", userId: user._id });
  } catch (error) {
    next(error);
  }
}

export async function login(
  req: Request<{}, {}, AuthBody>,
  res: Response,
  next: NextFunction
) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "이메일 또는 비밀번호 오류" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: "이메일 또는 비밀번호 오류" });
      return;
    }

    const token = jwt.sign(
      { id: user._id.toString(), email: user.email },
      env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (error) {
    next(error);
  }
}