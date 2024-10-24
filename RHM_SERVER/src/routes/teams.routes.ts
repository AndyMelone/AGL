import { Router } from "express";

import { checkAuth } from "../middlewares/auth.middlewares";
import * as team from "../controllers/teams.controllers";

const teamRouter: Router = Router();

teamRouter.use(checkAuth)

// POST REQUEST
teamRouter.post("/", team.createTeam)

// GET REQUEST

export default teamRouter;