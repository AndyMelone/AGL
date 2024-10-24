import { Router } from "express";
import roleRouter from "./routes/role.routes";
import companyRouter from "./routes/company.routes";
import leaveRouter from "./routes/leave.routes";
import postRouter from "./routes/post.routes";

import departmentRouter from "./routes/departement.routes";
import employeRouter from "./routes/employe.routes";
import mobileRouter from "./routes/mobile.routes";
import authRouter from "./routes/auth.routes";
import teamRouter from "./routes/teams.routes";
import stocksRoutes from "./routes/stocks.routes";

const mainRouter = Router();

mainRouter.use("/roles", roleRouter);
mainRouter.use("/company", companyRouter);
mainRouter.use("/leave", leaveRouter);
mainRouter.use("/post", postRouter);
mainRouter.use("/departement", departmentRouter);
mainRouter.use("/employe", employeRouter);
mainRouter.use("/mob", mobileRouter);
mainRouter.use("/auth", authRouter);
mainRouter.use("/team", teamRouter);
mainRouter.use("/stocks", stocksRoutes);

export default mainRouter;
