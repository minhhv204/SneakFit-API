import { StatusCodes } from "http-status-codes";
import ApiError from "../utils/ApiError.js";
import Article from "../models/Article.js";

class ArticlesController {
  // GET /articles
  async getAllArticles(req, res, next) {
    try {
      const articles = await Article.find();
      res.status(StatusCodes.OK).json(articles);
    } catch (error) {
      next(error);
    }
  }

  // GET /articles/:id
  async getArticleDetail(req, res, next) {
    try {
      const article = await Article.findById(req.params.id);
      if (!article) throw new ApiError(404, "Article Not Found");
      res.status(StatusCodes.OK).json(article);
    } catch (error) {
      next(error);
    }
  }

  // POST /articles
  async createArticle(req, res, next) {
    try {
      const newArticle = await Article.create(req.body);
      res.status(StatusCodes.CREATED).json({
        message: "Create Article Successful",
        data: newArticle,
      });
    } catch (error) {
      next(error);
    }
  }

  // PUT /articles/:id
  async updateArticle(req, res, next) {
    try {
      const updateArticle = await Article.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updateArticle) throw new ApiError(404, "Article Not Found");

      res.status(StatusCodes.OK).json({
        message: "Update Article Successful",
        data: updateArticle,
      });
    } catch (error) {
      next(error);
    }
  }

  // DELETE /articles/:id
  async deleteArticle(req, res, next) {
    try {
      const article = await Article.findByIdAndDelete(req.params.id);
      if (!article) throw new ApiError(404, "Article Not Found");
      res.status(StatusCodes.OK).json({
        message: "Delete Article Done",
      });
    } catch (error) {
      next(error);
    }
  }
}

export default ArticlesController;
