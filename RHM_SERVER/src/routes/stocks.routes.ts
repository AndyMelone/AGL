import { Router } from "express";
import * as stocks from "../controllers/stocks.controllers";
import { checkAuth } from "../middlewares/auth.middlewares";

const router: Router = Router();

router.use(checkAuth);

router.get("/", stocks.getStocks);

export default router;
