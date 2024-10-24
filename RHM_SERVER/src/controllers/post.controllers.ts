/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createPost = async (req: Request, res: Response) => {
  try {
    const { title, description, departmentId, responsibilities, requirements } =
      req.body;

    console.log(req.body);

    const postExist = await prisma.position.findMany({
      where: {
        title: title,
        departmentId: departmentId,
        employees: {
          some: {
            MarketPlaceId: req.company,
          },
        },
      },
    });

    if (postExist.length > 0) {
      return res.status(400).json({
        ok: false,
        message: "Post already exist in the department",
        data: null,
      });
    }

    const post = await prisma.position.create({
      data: {
        title: title,
        description: description,
        department: {
          connect: { id: departmentId },
        },
        responsibilities: JSON.stringify(responsibilities),
        requirements: JSON.stringify(requirements),
        createdBy: req.user.id,
      },
    });

    res.status(201).json({
      ok: true,
      message: "Post created successfully",
      data: post,
    });
  } catch (error: any | Error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: error.message,
      data: null,
    });
  }
};

export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await prisma.position.findMany({
      where: {
        department: {
          MarketPlaceId: req.company,
        },
      },
      include: {
        department: true,
        employees: true,
      },
    });
    res.status(200).json({
      ok: true,
      message: "Posts fetched successfully",
      data: posts,
    });
  } catch (error: any | Error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: error.message,
      data: null,
    });
  }
};

export const getPost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const postExists = await prisma.position.findFirst({
      where: {
        id: id,
        department: {
          MarketPlaceId: req.company,
        },
      },
    });

    if (!postExists) {
      return res.status(404).json({
        ok: false,
        message: "Post does not exist in the company",
        data: null,
      });
    }

    const post = await prisma.position.findUnique({
      where: {
        id: id,
      },
      include: {
        department: true,
        employees: true,
      },
    });

    res.status(200).json({
      ok: true,
      message: "Post fetched successfully",
      data: post,
    });
  } catch (error: any | Error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: error.message,
      data: null,
    });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, departmentId, responsibilities, requirements } =
      req.body;

    const postExists = await prisma.position.findFirst({
      where: {
        id: id,
        department: {
          MarketPlaceId: req.company,
        },
      },
    });

    if (!postExists) {
      return res.status(404).json({
        ok: false,
        message: "Post does not exist in the company",
        data: null,
      });
    }

    const post = await prisma.position.update({
      where: {
        id: id,
      },
      data: {
        title: title,
        description: description,
        departmentId: departmentId,
        responsibilities: JSON.stringify(responsibilities),
        requirements: JSON.stringify(requirements),
      },
    });

    res.status(200).json({
      ok: true,
      message: "Post updated successfully",
      data: post,
    });
  } catch (error: any | Error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: error.message,
      data: null,
    });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const postExists = await prisma.position.findFirst({
      where: {
        id: id,
        department: {
          MarketPlaceId: req.company,
        },
      },
    });

    if (!postExists) {
      return res.status(404).json({
        ok: false,
        message: "Post does not exist in the company",
        data: null,
      });
    }

    await prisma.position.delete({
      where: {
        id: id,
      },
    });

    res.status(200).json({
      ok: true,
      message: "Post deleted successfully",
      data: null,
    });
  } catch (error: any | Error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: error.message,
      data: null,
    });
  }
};
