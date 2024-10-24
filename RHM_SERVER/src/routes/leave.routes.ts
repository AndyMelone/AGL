import { Router } from "express";

import * as leave from "../controllers/leave.controllers";

const leaveRouter: Router = Router();

// POST REQUEST
leaveRouter.post("/", leave.createLeave);
leaveRouter.post("/approve/:id", leave.approveLeave);
leaveRouter.post("/reject", leave.rejectLeave);

// GET REQUEST
leaveRouter.get("/", leave.getLeaves);
leaveRouter.get("/id/:id", leave.getLeave);
leaveRouter.get("/pending", leave.getleavePending);

// PUT REQUEST
leaveRouter.put("/:id", leave.updateLeave);

// DELETE REQUEST
leaveRouter.delete("/:id", leave.deleteLeave);

export default leaveRouter;
