import { Router } from "express";
import ArticlesController from "../controllers/article.js";

const articlesRouter = Router();

const articlesController = new ArticlesController();

articlesRouter.get("/", articlesController.getAllArticles);
articlesRouter.get("/:id", articlesController.getArticleDetail);
articlesRouter.post("/", articlesController.createArticle);
articlesRouter.put("/:id", articlesController.updateArticle);
articlesRouter.delete("/:id", articlesController.deleteArticle);

export default articlesRouter;
