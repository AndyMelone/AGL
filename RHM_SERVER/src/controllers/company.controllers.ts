/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

export const createCompany = async (req: Request, res: Response) => {
  const {
    name,
    industry,
    address,
    contactEmail,
    contactPhone,
    licenseType,
    maxEmployees,
    subscriptionStartDate,
    subscriptionEndDate,
    website,
    logo,
    admin,
  } = req.body;
  try {
    if (
      !name ||
      !industry ||
      !address ||
      !contactEmail ||
      !contactPhone ||
      !maxEmployees ||
      !admin
    ) {
      return res.status(400).json({
        ok: false,
        message: "All fields are required",
        data: null,
      });
    }

    const companyExists = await prisma.marketPlace.findFirst({
      where: {
        contactEmail: contactEmail,
      },
    });

    if (companyExists) {
      return res.status(400).json({
        ok: false,
        message: "Company already exists",
        data: null,
      });
    }

    const company = await prisma.marketPlace.create({
      data: {
        name: name,
        address: address,
        contactEmail: contactEmail,
        contactPhone: contactPhone,
        licenseType: licenseType,
        maxEmployees: maxEmployees,
        subscriptionStartDate: subscriptionStartDate,
        subscriptionEndDate: subscriptionEndDate,
        website: website,
        logo: logo,
      },
    });

    const adminCreated = await prisma.employee.create({
      data: {
        email: admin.email,
        firstName: admin.firstName,
        lastName: admin.lastName,
        matricule: admin.matricule,
        createdBy: company.id,
        admin: true,
        pseudo: admin.pseudo,
        password: await hash(admin.password, 10),
        MarketPlace: {
          connect: {
            id: company.id,
          },
        },
      },
    });

    res.status(201).json({
      ok: true,
      message: "Company created successfully",
      data: company,
      user: {
        email: adminCreated.email,
        password: "admin",
      },
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

export const getCompanies = async (req: Request, res: Response) => {
  try {
    const companies = await prisma.marketPlace.findMany();
    res.status(200).json({
      ok: true,
      message: "Companies fetched successfully",
      data: companies,
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

export const editCompany = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    name,
    industry,
    address,
    contactEmail,
    contactPhone,
    licenseType,
    maxEmployees,
    subscriptionStartDate,
    subscriptionEndDate,
    website,
    logo,
  } = req.body;
  try {
    if (
      !name ||
      !industry ||
      !address ||
      !contactEmail ||
      !contactPhone ||
      !maxEmployees ||
      !subscriptionStartDate ||
      !subscriptionEndDate ||
      !website ||
      !logo
    ) {
      return res.status(400).json({
        ok: false,
        message: "All fields are required",
        data: null,
      });
    }

    const companyExists = await prisma.marketPlace.findFirst({
      where: {
        contactEmail: contactEmail,
      },
    });

    if (companyExists) {
      return res.status(400).json({
        ok: false,
        message: "Company already exists",
        data: null,
      });
    }

    const company = await prisma.marketPlace.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        address: address,
        contactEmail: contactEmail,
        contactPhone: contactPhone,
        licenseType: licenseType,
        maxEmployees: maxEmployees,
        subscriptionStartDate: subscriptionStartDate,
        subscriptionEndDate: subscriptionEndDate,
        website: website,
        logo: logo,
      },
    });

    res.status(201).json({
      ok: true,
      message: "Company updated successfully",
      data: company,
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

export const deleteCompany = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.$transaction([
      prisma.attendance.deleteMany({
        where: {
          employee: {
            MarketPlaceId: id,
          },
        },
      }),
      prisma.leaves.deleteMany({
        where: {
          employee: {
            MarketPlaceId: id,
          },
        },
      }),

      prisma.notification.deleteMany({
        where: {
          employee: {
            MarketPlaceId: id,
          },
        },
      }),

      prisma.workHours.deleteMany({
        where: {
          employee: {
            MarketPlaceId: id,
          },
        },
      }),

      prisma.employee.deleteMany({
        where: {
          MarketPlaceId: id,
        },
      }),
      prisma.department.deleteMany({
        where: {
          MarketPlaceId: id,
        },
      }),

      prisma.employee.deleteMany({
        where: {
          MarketPlaceId: id,
        },
      }),

      prisma.marketPlace.delete({
        where: {
          id: id,
        },
      }),
    ]);

    res.status(200).json({
      ok: true,
      message: "Company deleted successfully",
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

export const getCompany = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const company = await prisma.marketPlace.findUnique({
      where: {
        id: id,
      },
    });
    res.status(200).json({
      ok: true,
      message: "Company fetched successfully",
      data: company,
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
