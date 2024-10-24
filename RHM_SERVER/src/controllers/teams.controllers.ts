/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createTeam = async (req: Request, res: Response) => {

    try {
        const { name, managerId, description } = req.body;
    
        if(!name) {
        return res.status(400).json({
            ok: false,
            message: "Veuillez renseigner le nom de l'équipe",
            data: null,
        });
        }
    
        const teamExist = await prisma.team.findFirst({
        where: {
            companyId: req.company,
            name: name,
        },
        });
    
        if (teamExist) {
        return res.status(400).json({
            ok: false,
            code: "team/already-exist",
            message: "L'équipe existe déjà",
            data: null,
        });
        }
    
        const team = await prisma.team.create({
        data: {
            companyId: req.company,
            name: name,
            managerId: managerId,
            description: description,
            createdBy: req.user.id,
        },
        });
    
        res.status(201).json({
        ok: true,
        message: "L'équipe a été créée avec succès",
        data: team,
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