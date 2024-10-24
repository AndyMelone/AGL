/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/auth.utils";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma";

export async function checkAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { access } = req.cookies || req.body;

  try {
    if (!access) {
      res.status(400);
      throw new Error("You are not authenticated");
    }

    const payload = await verifyToken({ type: "access", token: access }).catch(
      (e) => {
        if (e instanceof jwt.TokenExpiredError) {
          res.status(403).json({
            ok: false,
            name: e.name,
            message: e.message,
          });
          throw e;
        }
        if (e instanceof jwt.JsonWebTokenError) {
          res.status(400).json({
            ok: false,
            name: e.name,
            message: e.message,
          });
          throw e;
        }
      }
    );

    const user = await prisma.employee.findUnique({
      where: {
        id: payload.id,
      },
    });

    if (!user) {
      res.status(400);
      throw new Error("You are not authenticated");
    }
    req.user = user;
    req.company = user.MarketPlaceId;
    next();
  } catch (e: any) {
    res.json({
      name: e.name,
      message: e.message,
    });
  }
}
