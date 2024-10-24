import { Router } from "express";

import * as department from "../controllers/departement.controllers";
import { checkAuth } from "../middlewares/auth.middlewares";

const departmentRouter: Router = Router();

departmentRouter.use(checkAuth);

// POST REQUEST
departmentRouter.post("/", department.createDepartement);
departmentRouter.post("/addEmploye", department.addEmployeeToDepartement);


// GET REQUEST
departmentRouter.get("/", department.getDepartements);
departmentRouter.get("/:id", department.getDepartement);

// PUT REQUEST
departmentRouter.put("/:id", department.updateDepartement);

// DELETE REQUEST
departmentRouter.delete("/:id", department.deleteDepartement);

export default departmentRouter;