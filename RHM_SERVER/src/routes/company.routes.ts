import { Router } from "express";

import * as company from "../controllers/company.controllers";

const companyRouter: Router = Router();

// POST REQUEST
companyRouter.post("/", company.createCompany);

// GET REQUEST
companyRouter.get("/", company.getCompanies);
companyRouter.get("/:id", company.getCompanies);

// PUT REQUEST
companyRouter.put("/:id", company.editCompany);

// DELETE REQUEST
companyRouter.delete("/:id", company.deleteCompany);

export default companyRouter;
