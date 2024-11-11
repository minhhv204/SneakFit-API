import { Router } from "express";
import categoriesRouter from "./categories.js";
import productsRouter from "./products.js";
import cartsRouter from "./carts.js";
import authRouter from "./auth.js";
import articlesRouter from "./article.js";
import sizeRouter from "./size.js";

const router = Router();

router.get("/", (req, res) => {
  res.send("Home");
});
router.use("/auth", authRouter);
router.use("/categories", categoriesRouter);
router.use("/products", productsRouter);
router.use("/carts", cartsRouter);
router.use("/articles", articlesRouter);
router.use("/sizes", sizeRouter);

export default router;
