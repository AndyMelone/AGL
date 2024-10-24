import { Router } from "express";

import * as employe from "../controllers/employe.controllers";
import { checkAuth } from "../middlewares/auth.middlewares";

const employeRouter: Router = Router();

employeRouter.use(checkAuth);

// POST REQUEST
employeRouter.post("/", employe.createEmployee);

// GET REQUEST
employeRouter.get("/", employe.getEmployees);

//DELETE REQUEST
employeRouter.delete("/:id", employe.deleteEmployee);


export default employeRouter;