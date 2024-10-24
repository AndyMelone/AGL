import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

export const seedCompany = async () => {
  try {
    const companyCount = await prisma.marketPlace.count();
    if (companyCount === 0) {
      const newCompany = await prisma.marketPlace.create({
        data: {
          name: "Loutché",
          address: "Abidjan Youpougon magasin",
          contactEmail: "Loutche@loutche.com",
          contactPhone: "0768101008",
          licenseType: "Basic",
          maxEmployees: 100,
          subscriptionStartDate: new Date().toISOString(),
          subscriptionEndDate: null,
          website: "https://loutche-vercel.app",
          logo: null,
        },
      });

      const departemenrtCreated = await prisma.department.create({
        data: {
          name: "INFORMATIQUE",
          MarketPlaceId: newCompany.id,
          description: "Departement informatique",
          location: "Abidjan",
          createdBy: "System",
        },
      });
      const departemenrtCreated2 = await prisma.department.create({
        data: {
          name: "RH",
          MarketPlaceId: newCompany.id,
          description: "Departement RH",
          location: "Abidjan",
          createdBy: "System",
        },
      });
      await prisma.employee.create({
        data: {
          firstName: "Employe",
          lastName: "Employe",
          email: "admin@admin.co",
          gender: "Homme",
          dateOfBirth: new Date().toISOString(),
          address: "Abidjan",
          phoneNumber: "0768101008",
          MarketPlaceId: newCompany.id,
          departmentId: null,
          comments: "Ce commentaire est pour l'employe",
          createdBy: "System",
          emergencyContactName: "Employe",
          emergencyContactPhone: "0768101008",
          admin: true,
          password: await hash("admin", 10),
          pseudo: "admin",
          matricule: "admin",
        },
      });
      await prisma.position.create({
        data: {
          title: "Developpeur",
          description: "Developpeur fullstack",
          departmentId: departemenrtCreated.id,
          responsibilities: JSON.stringify([
            "Developper des applications web",
            "Developper des applications mobiles",
          ]),
          requirements: JSON.stringify([
            "Avoir un diplome en informatique",
            "Avoir une experience de 2 ans minimum",
          ]),
          createdBy: "System",
        },
      });
      await prisma.position.create({
        data: {
          title: "Recruteur",
          description: "Recruteur",
          departmentId: departemenrtCreated2.id,
          responsibilities: JSON.stringify([
            "Recruter des candidats",
            "Faire des entretiens",
          ]),
          requirements: JSON.stringify([
            "Avoir un diplome en RH",
            "Avoir une experience de 2 ans minimum",
          ]),
          createdBy: "System",
        },
      });
    }
  } catch (error) {
    console.error("Error during seeding:", error);
  } finally {
    await prisma.$disconnect();
  }
};
