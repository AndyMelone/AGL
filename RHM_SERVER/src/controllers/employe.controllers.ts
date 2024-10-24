/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { compare, hash } from "bcrypt";
import { createBothTokens } from "../utils/auth.utils";

const prisma = new PrismaClient();

export const createEmployee = async (req: Request, res: Response) => {
  const {
    matricule,
    comments,
    flag,
    firstName,
    lastName,
    dateOfBirth,
    placeOfBirth,
    phoneNumber,
    email,
    address,
    gender,
    departmentId,
    positionId,
    contractType,
    salary,
    socialSecurityNumber,
    emergencyContactName,
    emergencyContactPhone,
    emergencyContactlastName,
    emergencyContactEmail,
    emergencyContactAdress,
    admin,
  } = req.body;

  try {
    if (!firstName || !lastName || !dateOfBirth || !gender) {
      return res.json({
        ok: false,
        message: "Veuillez renseigner tous les champs obligatoires",
        data: null,
      });
    }

    if (!matricule) {
      return res.json({
        ok: false,
        message: "Veuillez renseigner le matricule de l'employé",
        data: null,
      });
    }

    const matriculeExists = await prisma.employee.findMany({
      where: {
        matricule: { equals: matricule },
        MarketPlace: { id: req.company },
      },
    });

    if (matriculeExists.length > 0) {
      return res.json({
        ok: false,
        message: "Ce matricule existe déjà",
        data: null,
      });
    }

    const employeeExists = await prisma.employee.findMany({
      where: {
        email: email,
        MarketPlace: { id: req.company },
        matricule: matricule,
      },
    });

    if (employeeExists.length > 0) {
      return res.json({
        ok: false,
        message: "Ce employé existe déjà",
        data: null,
      });
    }

    const imageBuffer = flag ? Buffer.from(flag.split(",")[1], "base64") : null;
    if (!admin) {
      await prisma.employee.create({
        data: {
          MarketPlace: { connect: { id: req.company } },
          matricule: matricule,
          flag: imageBuffer,
          firstName: firstName,
          lastName: lastName,
          dateOfBirth: dateOfBirth,
          placeOfBirth: placeOfBirth,
          phoneNumber: phoneNumber,
          email: email,
          address: address,
          gender: gender,
          department: departmentId
            ? { connect: { id: departmentId } }
            : undefined,
          position: positionId ? { connect: { id: positionId } } : undefined,
          contractType: contractType,
          salary: salary,
          socialSecurityNumber: socialSecurityNumber,
          emergencyContactName: emergencyContactName,
          emergencyContactPhone: emergencyContactPhone,
          emergencyContactlastName: emergencyContactlastName,
          emergencyContactEmail: emergencyContactEmail,
          emergencyContactAdress: emergencyContactAdress,
          comments: comments,
          createdBy: req.user.id,
          password: await hash(matricule, 10),
        },
      });
    } else {
      await prisma.employee.create({
        data: {
          MarketPlace: { connect: { id: req.company } },
          matricule: matricule,
          flag: imageBuffer,
          firstName: firstName,
          lastName: lastName,
          dateOfBirth: dateOfBirth,
          placeOfBirth: placeOfBirth,
          phoneNumber: phoneNumber,
          email: email,
          address: address,
          gender: gender,
          department: departmentId
            ? { connect: { id: departmentId } }
            : undefined,
          position: positionId ? { connect: { id: positionId } } : undefined,
          contractType: contractType,
          salary: salary,
          socialSecurityNumber: socialSecurityNumber,
          emergencyContactName: emergencyContactName,
          emergencyContactPhone: emergencyContactPhone,
          emergencyContactlastName: emergencyContactlastName,
          emergencyContactEmail: emergencyContactEmail,
          emergencyContactAdress: emergencyContactAdress,
          comments: comments,
          createdBy: req.user.id,
          admin: true,
          password: await hash(matricule, 10),
        },
      });
    }

    return res.status(201).json({
      ok: true,
      message: "Employée créé avec succès",
    });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: error.message,
      data: null,
    });
  }
};

export const getEmployees = async (req: Request, res: Response) => {
  try {
    const employees = await prisma.employee.findMany({
      where: {
        MarketPlaceId: req.company,
      },
      include: {
        position: true,
        department: true,
        Breaks: true,
        attendances: true,
        leaves: true,
        managedDepartments: true,
        notifications: true,
      },
    });

    return res.status(200).json({
      ok: true,
      message: "Employees fetched successfully",
      data: employees,
    });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: error.message,
      data: null,
    });
  }
};

export const deleteEmployee = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    if (!id) {
      return res.json({
        ok: false,
        message: "Veuillez renseigner l'identifiant de l'employé",
        data: null,
      });
    }

    const employeeExists = await prisma.employee.findUnique({
      where: {
        id: id,
        MarketPlace: { id: req.company },
      },
    });

    if (!employeeExists) {
      return res.json({
        ok: false,
        message: "Employee not found",
        data: null,
      });
    }

    await prisma.employee.delete({
      where: {
        id: id,
      },
    });

    return res.status(200).json({
      ok: true,
      message: "Employee deleted successfully",
      data: null,
    });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: error.message,
      data: null,
    });
  }
};

export const login = async (req: Request, res: Response) => {
  const { pseudo, password, matricule } = req.body;
  try {
    if ((!pseudo || !password) && !matricule) {
      return res.json({
        ok: false,
        message: "Missing fields",
        data: null,
      });
    }

    if (pseudo && !matricule) {
      const user = await prisma.employee.findFirst({
        where: {
          pseudo: pseudo,
        },
      });

      console.log(user);

      if (!user) {
        return res.status(404).json({
          ok: false,
          message: "User not found",
          data: null,
        });
      }

      // compare password
      const match = await compare(password, user.password);

      if (!match) {
        return res.status(401).json({
          ok: false,
          message: "Invalid credentials",
          data: null,
        });
      }

      const { accessToken, refreshToken } = await createBothTokens(user).catch(
        (e) => {
          res.status(424);
          throw e;
        }
      );

      res.cookie("access", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      });

      res.status(200).json({
        ok: true,
        message: "Login successful",
        data: user,
        token: {
          accessToken: accessToken,
          refreshToken: refreshToken,
        },
      });
    } else if (matricule && !pseudo) {
      const user = await prisma.employee.findFirst({
        where: {
          matricule: matricule,
        },
      });

      if (!user) {
        return res.status(404).json({
          ok: false,
          message: "User not found",
          data: null,
        });
      }

      // compare password
      const match = await compare(matricule, user.password);

      if (!match) {
        return res.status(401).json({
          ok: false,
          message: "Invalid credentials",
          data: null,
        });
      }

      const { accessToken, refreshToken } = await createBothTokens(user).catch(
        (e) => {
          res.status(424);
          throw e;
        }
      );

      res.cookie("access", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      });

      const { password, ...userWithoutPassword } = user;

      res.status(200).json({
        ok: true,
        message: "Login successful",
        data: userWithoutPassword,
        token: {
          accessToken: accessToken,
          refreshToken: refreshToken,
        },
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
