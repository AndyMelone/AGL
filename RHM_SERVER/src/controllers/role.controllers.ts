/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createRole = async (req: Request, res: Response) => {
  const { name, description, permissions } = req.body;
  try {
    if (!name || !description) {
      return res.status(400).json({
        ok: false,
        message: "Name and description are required",
        data: null,
      });
    }

    const role = await prisma.role.create({
      data: {
        name: name,
        description: description,
        permissions: permissions,
        companyId: req.company,
        createdBy: req.user.id,
      },
    });

    res.status(201).json({
      ok: true,
      message: "Role created successfully",
      data: role,
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

export const getRoles = async (req: Request, res: Response) => {
  try {
    const roles = await prisma.role.findMany({
      where: {
        companyId: req.company,
      },
    });
    res.status(200).json({
      ok: true,
      message: "Roles fetched successfully",
      data: roles,
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

export const editRole = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, permissions } = req.body;
  try {
    if (!name || !description) {
      return res.status(400).json({
        ok: false,
        message: "Name and description are required",
        data: null,
      });
    }

    const ifExist = await prisma.role.findUnique({
      where: {
        id: id,
        company : req.company
      },
    });

    if (!ifExist) {
      return res.status(400).json({
        ok: false,
        message: "This role note exist",
        data: null,
      });
    }

    const role = await prisma.role.update({
      where: {
        id: id,
        companyId: req.company,
      },
      data: {
        name: name,
        description: description,
        permissions: permissions,
      },
    });

    res.status(200).json({
      ok: true,
      message: "Role updated successfully",
      data: role,
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

export const deleteRole = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.role.delete({
      where: {
        id: id,
        company : req.company
      },
    });

    res.status(200).json({
      ok: true,
      message: "Role deleted successfully",
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

export const getRole = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const role = await prisma.role.findUnique({
      where: {
        id: id,
        company: req.company
      },
    });

    if (!role) {
      return res.status(404).json({
        ok: false,
        message: "Role not found",
        data: null,
      });
    }

    res.status(200).json({
      ok: true,
      message: "Role fetched successfully",
      data: role,
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
