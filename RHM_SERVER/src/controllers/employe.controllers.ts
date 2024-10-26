/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { compare, hash } from "bcrypt";
import { createBothTokens } from "../utils/auth.utils";

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
          pseudo: matricule,
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
          pseudo: matricule,
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

export const createTask = async (req: Request, res: Response) => {
  const { title, description, employeeId, date, time } = req.body;

  try {
    if (!title || !employeeId) {
      return res.json({
        ok: false,
        message: "Veuillez renseigner tous les champs obligatoires",
        data: null,
      });
    }

    const employee = await prisma.employee.findUnique({
      where: { id: employeeId },
    });

    if (!employee) {
      return res.status(404).json({ ok: false, message: "Employé non trouvé" });
    }

    const task = await prisma.task.create({
      data: {
        title: title,
        description: description,
        employee: { connect: { id: employeeId } },
        dueDate: date,
        dueTime: time,
        createdBy: req.user.id,
      },
    });

    return res.status(201).json({
      ok: true,
      message: "Task created successfully",
      data: task,
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

export const getEmployeeById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.json({
        ok: false,
        message: "Veuillez renseigner l'identifiant de l'employé",
        data: null,
      });
    }

    const employee = await prisma.employee.findUnique({
      where: {
        id: id,
        MarketPlace: { id: req.company },
      },
      include: {
        position: true,
        department: true,
        Breaks: true,
        attendances: true,
        leaves: true,
        managedDepartments: true,
        notifications: true,
        Inventory: true,
        tasks: true,
        MarketPlace: true,
        workHours: true,
      },
    });

    if (!employee) {
      return res.json({
        ok: false,
        message: "Employee not found",
        data: null,
      });
    }

    return res.status(200).json({
      ok: true,
      message: "Employee fetched successfully",
      data: employee,
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

export const getEmployetask = async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log(id);
  try {
    if (!id) {
      return res.json({
        ok: false,
        message: "Veuillez renseigner l'identifiant de l'employé",
        data: null,
      });
    }

    const tasks = await prisma.task.findMany({
      where: {
        employeeId: id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      ok: true,
      message: "Employee tasks fetched successfully",
      data: tasks,
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
