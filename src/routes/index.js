import { Router } from "express";
import categoriesRouter from "./categories.js";
import productsRouter from "./products.js";
import cartsRouter from "./carts.js";
<<<<<<< HEAD
import authRouter from "./auth.js";
=======
import articlesRouter from "./article.js";
>>>>>>> ae7af23e91daf224be04a68d29185bd5e7ab0f70

const router = Router();

router.get("/", (req, res) => {
  res.send("Home");
});
router.use("/auth", authRouter);
router.use("/categories", categoriesRouter);
router.use("/products", productsRouter);
router.use("/carts", cartsRouter);
router.use("/articles", articlesRouter);

export default router;
