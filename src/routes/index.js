import { Router } from "express";
import categoriesRouter from "./categories.js";
import productsRouter from "./products.js";
import cartsRouter from "./carts.js";
import articlesRouter from "./article.js";

const router = Router();

router.get("/", (req, res) => {
  res.send("Home");
});

router.use("/categories", categoriesRouter);
router.use("/products", productsRouter);
router.use("/carts", cartsRouter);
router.use("/articles", articlesRouter);

export default router;
