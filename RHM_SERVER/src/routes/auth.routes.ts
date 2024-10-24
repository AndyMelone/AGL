import { Router } from "express";
import { login } from "../controllers/employe.controllers";

const authRouter: Router = Router();

// POST REQUEST
authRouter.post("/login", login);

export default authRouter;