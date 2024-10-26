import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export const getStocks = async (req: Request, res: Response) => {
  try {
    const stocks = await prisma.product.findMany({
      where: {
        quantity: {
          gt: 0,
        },
      },
    });

    res.status(200).json({
      ok: true,
      message: "Stocks fetched successfully",
      data: stocks,
    });
  } catch (e: any) {
    res.status(500).json({
      ok: false,
      message: e.message,
      data: null,
    });
  }
};
