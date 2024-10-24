/* eslint-disable @typescript-eslint/no-explicit-any */
import { Employee } from "@prisma/client";
import jwt from "jsonwebtoken";
import "dotenv/config";

type TToken = "access" | "refresh" | "both";

type TVToken = Exclude<TToken, "both">;



export const createBothTokens = (
  user: Employee
): Promise<{
  accessToken: string;
  refreshToken: string;
}> => {
  const ACCESS_TOKEN_EXPIRATION_TIME = "3d";
const REFRESH_TOKEN_EXPIRATION_TIME = "3d";
  return new Promise((resolve, reject) => {
    // SIGN ACCESS TOKEN FIRST
    jwt.sign(
      {
        id: user.id,
      },
        process.env.ACCESS_TOKEN_SECRET!,
      {
        expiresIn: ACCESS_TOKEN_EXPIRATION_TIME,
      },
      (e, accessToken) => {
        if (e) {
          return reject(e);
        }

        // SIGN REFRESH TOKEN
        jwt.sign(
          {
            id: user.id,
          },
          process.env.REFRESH_TOKEN_SECRET!,
          {
            expiresIn: REFRESH_TOKEN_EXPIRATION_TIME,
          },
          (e, refreshToken) => {
            if (e) {
              return reject(e);
            }

            resolve({
              accessToken: accessToken!,
              refreshToken: refreshToken!,
            });
          }
        );
      }
    );
  });
};

export function verifyToken({
  type,
  token,
}: {
  type: TVToken;
  token: string;
}): Promise<any> {
  let SECRET: string;

  if (type === "access") {
    SECRET = process.env.ACCESS_TOKEN_SECRET!;
  } else {
    SECRET = process.env.REFRESH_TOKEN_SECRET!;
  }

  return new Promise((resolve, rejected) => {
    jwt.verify(token, SECRET, (e, user) => {
      if (e) return rejected(e);
      resolve(user!);
    });
  });
}
