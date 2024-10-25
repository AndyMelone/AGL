import { Router } from "express";

import * as employe from "../controllers/employe.controllers";
import { checkAuth } from "../middlewares/auth.middlewares";

const employeRouter: Router = Router();

employeRouter.use(checkAuth);

// POST REQUEST
employeRouter.post("/", employe.createEmployee);
employeRouter.post("/create-task", employe.createTask);

// GET REQUEST
employeRouter.get("/", employe.getEmployees);
employeRouter.get("/:id", employe.getEmployeeById);

//DELETE REQUEST
employeRouter.delete("/:id", employe.deleteEmployee);

export default employeRouter;
