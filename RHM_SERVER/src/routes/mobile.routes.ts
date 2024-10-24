import { Router } from "express";

import * as employe from "../controllers/presence.controllers";

const mobileRouter: Router = Router();

// POST REQUEST
mobileRouter.post("/makePresence", employe.makePresence);
mobileRouter.post("/list", employe.getPresenceList);

export default mobileRouter;
