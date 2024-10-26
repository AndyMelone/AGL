import { Router } from "express";

import * as employe from "../controllers/presence.controllers";
import { getEmployetask } from "../controllers/employe.controllers";

const mobileRouter: Router = Router();

// POST REQUEST
mobileRouter.post("/makePresence", employe.makePresence);
mobileRouter.post("/list", employe.getPresenceList);
mobileRouter.get("/getTaskList/:id", getEmployetask);

export default mobileRouter;
