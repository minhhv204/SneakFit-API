import express from "express";
import { getAllUser, signin, signup } from "../controllers/signup";
const router = express.Router();

router.post("/auth/signup", signup);
router.post("/auth/signin", signin);
router.get("/auth/getall", getAllUser);
export default router;
