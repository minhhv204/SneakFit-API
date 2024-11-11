import { Router } from "express";
import UserController from "../controllers/user.js";

const userRouter = Router();
const userController = new UserController();
userRouter.get("/",userController.getAllUser);
userRouter.get("/:id",userController.getUserById);
userRouter.put("/:id",userController.updateUser);
userRouter.delete("/:id",userController.deleteUser);

export default userRouter;