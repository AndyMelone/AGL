import { Router } from "express";
import * as role from "../controllers/role.controllers";
import { checkAuth } from "../middlewares/auth.middlewares";


const roleRouter: Router = Router();

roleRouter.use(checkAuth)

// POST REQUEST 
roleRouter.post("/", role.createRole)

// GET REQUEST
roleRouter.get("/", role.getRoles)

// PUT REQUEST
roleRouter.put("/:id", role.editRole)

// DELETE REQUEST
roleRouter.delete("/:id", role.deleteRole)


export default roleRouter