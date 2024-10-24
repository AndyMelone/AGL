import { Router } from "express";
import * as post from "../controllers/post.controllers";
import { checkAuth } from "../middlewares/auth.middlewares";


const postRouter: Router = Router();

postRouter.use(checkAuth);

// POST REQUEST
postRouter.post("/", post.createPost);

// GET REQUEST
postRouter.get("/", post.getPosts);
postRouter.get("/:id", post.getPost);

// PUT REQUEST
postRouter.put("/:id", post.updatePost);

// DELETE REQUEST
postRouter.delete("/:id", post.deletePost);

export default postRouter;