/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createDepartement = async (req: Request, res: Response) => {
  try {
    const { name, managerId, location, budget, description } = req.body;

    if(!name) {
      return res.status(400).json({
        ok: false,
        message: "Veuillez renseigner le nom du departement",
        data: null,
      });
    }

    const departementExist = await prisma.department.findFirst({
      where: {
        companyId: req.company,
        name: name,
      },
    });

    if (departementExist) {
      return res.status(400).json({
        ok: false,
        code: "departement/already-exist",
        message: "Departement déjà existant",
        data: null,
      });
    }

    const departement = await prisma.department.create({
      data: {
        companyId: req.company,
        name: name,
        managerId: managerId,
        location: location,
        budget: budget,
        description: description,
        createdBy: req.user.id,
      },
    });

    res.status(201).json({
      ok: true,
      message: "Departement créer avec succès",
      data: departement,
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

export const getDepartements = async (req: Request, res: Response) => {
  try {
    const departements = await prisma.department.findMany({
      where: {
        companyId: req.company,
      },
      include: {
        employees: true,
        manager: true,
        Position: true,
      },
    });

    res.status(200).json({
      ok: true,
      message: "Departements fetched successfully",
      data: departements,
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

export const getDepartement = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const departementExists = await prisma.department.findFirst({
      where: {
        id: id,
        companyId: req.company,
      },
      include: {
        employees: true,
        manager: true,
        Position: true,
      },
    });

    if (!departementExists) {
      return res.status(404).json({
        ok: false,
        message: "Departement not found",
        data: null,
      });
    }

    res.status(200).json({
      ok: true,
      message: "Departement fetched successfully",
      data: departementExists,
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

export const updateDepartement = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, managerId, location, budget, description } = req.body;

    const departementExists = await prisma.department.findFirst({
      where: {
        id: id,
        companyId: req.company,
      },
    });

    if (!departementExists) {
      return res.status(404).json({
        ok: false,
        message: "Departement not found",
        data: null,
      });
    }

    const departement = await prisma.department.update({
      where: {
        id: id,
        companyId: req.company,
      },
      data: {
        name: name,
        managerId: managerId,
        location: location,
        budget: budget,
        description: description,
      },
    });

    res.status(200).json({
      ok: true,
      message: "Departement updated successfully",
      data: departement,
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

export const deleteDepartement = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const departementExists = await prisma.department.findUnique({
      where: {
        id: id,
        companyId: req.company,
      },
    });

    if (!departementExists) {
      return res.status(404).json({
        ok: false,
        message: "Departement not found",
        data: null,
      });
    }

    if (req.body.deleteEmployee === true) {
      await prisma.employee.deleteMany({
        where: {
          departmentId: id,
          companyId: req.company,
        },
      });
    }

    await prisma.position.deleteMany({
      where: {
        departmentId: id,
      },
    });

    await prisma.department.delete({
      where: {
        id: id,
        companyId: req.company,
      },
    });

    res.status(200).json({
      ok: true,
      message: "Departement deleted successfully",
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

export const addEmployeeToDepartement = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { employeeId, positionId } = req.body;

    const departementExists = await prisma.department.findFirst({
      where: {
        id: id,
        companyId: req.company,
      },
    });

    if (!departementExists) {
      return res.status(404).json({
        ok: false,
        message: "Departement not found",
        data: null,
      });
    }

    const employeeExists = await prisma.employee.findFirst({
      where: {
        id: employeeId,
        companyId: req.company,
      },
    });

    if (!employeeExists) {
      return res.status(404).json({
        ok: false,
        message: "Employee not found",
        data: null,
      });
    }

    const positionExists = await prisma.position.findFirst({
      where: {
        id: positionId,
        departmentId: id,
      },
    });

    if (!positionExists) {
      return res.status(404).json({
        ok: false,
        message: "Position not found",
        data: null,
      });
    }

    const employee = await prisma.employee.update({
      where: {
        id: employeeId,
      },
      data: {
        departmentId: id,
        positionId: positionId,
      },
    });

    res.status(200).json({
      ok: true,
      message: "Employee added to departement successfully",
      data: employee,
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
