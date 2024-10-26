/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export const makePresence = async (req: Request, res: Response) => {
  try {
    const { employe, object } = req.body;
    console.log("body", req.body);
    const employee = await prisma.employee.findUnique({
      where: {
        id: employe,
      },
    });

    if (!employee) {
      return res.status(404).json({
        ok: false,
        message: "Employé non trouvé",
        data: null,
      });
    }

    // if (!employee || employee.MarketPlaceId !== req.company) {
    //   return res.status(404).json({
    //     ok: false,
    //     message: "Employé non trouvé",
    //     data: null,
    //   });
    // }

    if (object == "checkIn") {
      const alreadyCheckedIn = await prisma.attendance.findFirst({
        where: {
          employeeId: employe,
          checkOutTime: null,
        },
        orderBy: [{ date: "desc" }, { checkInTime: "desc" }],
      });

      if (alreadyCheckedIn) {
        return res.json({
          ok: false,
          message:
            "Vous n'avez pas marqué votre départ la dernière fois, Vouliez-vous marquer votre départ ?",
          data: null,
          action: "checkOut",
        });
      }

      const makePresence = await prisma.attendance.create({
        data: {
          employee: {
            connect: {
              id: employe,
            },
          },
        },
      });

      return res.status(201).json({
        ok: true,
        message: `Bienvenue !", "Vous avez bien marqué votre arrivée. Passez une excellente journée de travail !`,
        data: makePresence,
      });
    }

    if (object == "checkOut") {
      const alreadyCheckedIn = await prisma.attendance.findFirst({
        where: {
          employeeId: employe,
          checkOutTime: null,
        },
        orderBy: [{ date: "desc" }, { checkInTime: "desc" }],
      });

      if (!alreadyCheckedIn) {
        return res.json({
          ok: false,
          message:
            "Vous n'avez pas marqué votre arrivée, Vouliez-vous marquer votre arrivée ?",
          data: null,
          action: "checkIn",
        });
      }

      const makePresence = await prisma.attendance.update({
        where: {
          id: alreadyCheckedIn.id,
        },
        data: {
          checkOutTime: new Date(),
        },
      });

      return res.status(201).json({
        ok: true,
        message: `Votre journée de travail est terminée. Merci pour vos efforts aujourd'hui. Passez une bonne soirée !`,
        data: makePresence,
      });
    }

    if (object == "pause") {
      const alreadyCheckedIn = await prisma.attendance.findFirst({
        where: {
          employeeId: employe,
          checkOutTime: null,
        },
        orderBy: [{ date: "desc" }, { checkInTime: "desc" }],
      });

      if (!alreadyCheckedIn) {
        return res.json({
          ok: false,
          message:
            "Vous n'avez pas marqué votre arrivée, Vouliez-vous marquer votre arrivée ?",
          data: null,
          action: "checkIn",
        });
      }

      const alreadyInBreak = await prisma.break.findFirst({
        where: {
          employeeId: employe,
          EndBreak: null,
          attendanceId: alreadyCheckedIn.id,
        },
        orderBy: [{ date: "desc" }, { Break: "desc" }],
      });

      if (alreadyInBreak) {
        return res.json({
          ok: false,
          message:
            "Vous n'avez pas marqué la fin de votre pause preécedente, Vous ne pouvez pas commencer une autre pause avant de marquer la fin de la pause précédente",
          data: null,
          action: "reprise",
        });
      }

      const makePresence = await prisma.break.create({
        data: {
          employeeId: employe,
          attendanceId: alreadyCheckedIn.id,
        },
      });

      return res.status(201).json({
        ok: true,
        message: `Bonne pause ! Vous avez marqué le début de votre pause avec succès. Revenez en forme !`,
        data: makePresence,
      });
    }

    if (object === "reprise") {
      const alreadyCheckedIn = await prisma.attendance.findFirst({
        where: {
          employeeId: employe,
          checkOutTime: null,
        },
        orderBy: [{ date: "desc" }, { checkInTime: "desc" }],
      });

      if (!alreadyCheckedIn) {
        return res.json({
          ok: false,
          message:
            "Vous n'avez pas marqué votre arrivée, Vouliez-vous marquer votre arrivée ?",
          data: null,
          action: "checkIn",
        });
      }

      const alreadyInBreak = await prisma.break.findFirst({
        where: {
          employeeId: employe,
          EndBreak: null,
        },
        orderBy: [{ date: "desc" }, { Break: "desc" }],
      });

      if (!alreadyInBreak) {
        return res.json({
          ok: false,
          message:
            "Vous n'avez pas marqué le début de votre pause, Vouliez-vous marquer le début de votre pause ?",
          data: null,
          action: "pause",
        });
      }

      const makePresence = await prisma.break.update({
        where: {
          id: alreadyInBreak.id,
        },
        data: {
          EndBreak: new Date(),
        },
      });

      return res.status(201).json({
        ok: true,
        message: `Reprise enregistrée ! Vous êtes maintenant de retour au travail. Passez une excellente fin de journée.`,
        data: makePresence,
      });
    }
  } catch (error: any | Error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: error.message,
      data: null,
    });
  }
};

export const getPresenceList = async (req: Request, res: Response) => {
  try {
    const presence = await prisma.attendance.findMany({
      where: {
        employee: {
          MarketPlaceId: req.company,
        },
      },
      include: {
        employee: true,
        Breaks: {
          orderBy: [{ date: "desc" }, { Break: "desc" }],
        },
      },
      orderBy: [{ date: "desc" }, { checkInTime: "desc" }],
    });

    res.status(200).json({
      ok: true,
      message: "Liste de présences récupérée avec succès",
      data: presence,
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
