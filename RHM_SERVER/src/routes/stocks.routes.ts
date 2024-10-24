import { Router } from "express";
import * as stocks from "../controllers/stocks.controllers";
import { checkAuth } from "../middlewares/auth.middlewares";

const stocksRoutes: Router = Router();

// stocksRoutes.use(checkAuth);

export default stocksRoutes;
