/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createLeave = async (req: Request, res: Response) => {
  try {
    const { leaveType, startDate, endDate } = req.body;
    const { id } = req.user as any;

    const leave = await prisma.leaves.create({
      data: {
        employeeId: id,
        leaveType: leaveType,
        startDate: startDate,
        endDate: endDate,
      },
    });

    res.status(201).json({
      ok: true,
      message: "Congé créé avec succès",
      data: leave,
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

export const getLeaves = async (req: Request, res: Response) => {
  try {
    const leave = await prisma.leaves.findMany({
      where: {
        employee: {
          companyId: req.company,
        },
      },
      include: {
        employee: true,
      },
    });

    res.status(200).json({
      ok: true,
      message: "Congés récupérés avec succès",
      data: leave,
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

export const getLeave = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const leaveExist = await prisma.leaves.findFirst({
      where: {
        id: id,
        employee: {
          companyId: req.company,
        },
      },
    });

    if (!leaveExist) {
      return res.status(404).json({
        ok: false,
        message: "Congé introuvable",
        data: null,
      });
    }

    const leave = await prisma.leaves.findUnique({
      where: {
        id: id,
        employee: {
          companyId: req.company,
        },
      },
      include: {
        employee: true,
      },
    });

    res.status(200).json({
      ok: true,
      message: "Congé récupéré avec succès",
      data: leave,
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

export const getleavePending = async (req: Request, res: Response) => {
  try {
    const leave = await prisma.leaves.findMany({
      where: {
        employee: {
          companyId: req.company,
        },
        status: "En attente",
      },
      include: {
        employee: true,
      },
    });

    res.status(200).json({
      ok: true,
      message: "Congés en attente récupérés avec succès",
      data: leave,
    });
  } catch (error: any | Error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: error.message,
      data: null,
    });
  }
}

export const updateLeave = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { leaveType, startDate, endDate } = req.body;

    const leaveExist = await prisma.leaves.findFirst({
      where: {
        id: id,
        employee: {
          companyId: req.company,
        },
      },
    });

    if (!leaveExist) {
      return res.status(404).json({
        ok: false,
        message: "Congé introuvable",
        data: null,
      });
    }

    const leave = await prisma.leaves.update({
      where: {
        id: id,
      },
      data: {
        leaveType: leaveType,
        startDate: startDate,
        endDate: endDate,
      },
    });

    res.status(200).json({
      ok: true,
      message: "Congé mis à jour avec succès",
      data: leave,
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

export const deleteLeave = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const leaveExists = await prisma.leaves.findFirst({
      where: {
        id: id,
        employee: {
          companyId: req.company,
        },
      },
    });

    if (!leaveExists) {
      return res.status(404).json({
        ok: false,
        message: "Congé introuvable",
        data: null,
      });
    }

    await prisma.leaves.delete({
      where: {
        id: id,
      },
    });

    res.status(200).json({
      ok: true,
      message: "Congé supprimé avec succès",
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

export const approveLeave = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        ok: false,
        message: "Veuilez fournir l'identifiant de la demande de congé",
        data: null,
      });
    }

    const leaveExist = await prisma.leaves.findFirst({
      where: {
        id: id,
        employee: {
          companyId: req.company,
        },
      },
    });

    if (!leaveExist) {
      return res.status(404).json({
        ok: false,
        message: "Congé introuvable",
        data: null,
      });
    }

    const leave = await prisma.leaves.update({
      where: {
        id: id,
      },
      data: {
        status: "APROUVE",
        approvalDate: new Date(),
        startDate : req.body.startDate,
        endDate : req.body.endDate,
      },
    });

    res.status(200).json({
      ok: true,
      message: "Congé approuvé avec succès",
      data: leave,
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

export const rejectLeave = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        ok: false,
        message: "Veuilez fournir l'identifiant de la demande de congé",
        data: null,
      });
    }

    const leaveExist = await prisma.leaves.findFirst({
      where: {
        id: id,
        employee: {
          companyId: req.company,
        },
      },
    });

    if (!leaveExist) {
      return res.status(404).json({
        ok: false,
        message: "Congé introuvable",
        data: null,
      });
    }

    const leave = await prisma.leaves.update({
      where: {
        id: id,
      },
      data: {
        status: "REJETE",
        rejectionDate: new Date(),
        rejectionReason: req.body.rejectionReason,
      },
    });

    res.status(200).json({
      ok: true,
      message: "Congé rejeté avec succès",
      data: leave,
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