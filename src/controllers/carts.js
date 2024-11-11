import { StatusCodes } from "http-status-codes";
import Cart from "../models/CartModel.js";
import ApiError from "../utils/ApiError.js";
import Product from "../models/ProductModel.js";

class CartsController {
  // GET /carts
  async getAllCarts(req, res, next) {
    try {
      const carts = await Cart.find().populate({
        path: "products",
        populate: {
          path: "product",
          model: Product,
        },
      });
      res.status(StatusCodes.OK).json(carts);
    } catch (error) {
      next(error);
    }
  }
  // GET /carts/:id
  async getCartDetail(req, res, next) {
    try {
      const cart = await Cart.findById(req.params.id);

      if (!cart) throw new ApiError(404, "Cart Not Found");
      res.status(StatusCodes.OK).json(cart);
    } catch (error) {
      next(error);
    }
  }
  // GET /carts/:id
  async getCartUser(req, res, next) {
    try {
      const cart = await Cart.findOne({ user: req.params.id }).populate({
        path: "products",
        populate: {
          path: "product",
          model: Product,
        },
      });
      // if (!cart) throw new ApiError(404, "Cart Not Found");
      res.status(StatusCodes.OK).json(cart);
    } catch (error) {
      next(error);
    }
  }
  // POST /carts
  async createCart(req, res, next) {
    try {
      const { quantity, user, product, size } = req.body;
      const cart = await Cart.findOne({ user });
      if (cart) throw new ApiError(404, "Cart Existed, You can only Update Cart");
  
      const newCart = await Cart.create({
        user,
        products: [
          {
            product,
            quantity,
            size, // Đảm bảo size được thêm vào sản phẩm
          },
        ],
      });
      res.status(StatusCodes.CREATED).json({
        message: "Add Cart Successfully",
        data: newCart,
      });
    } catch (error) {
      next(error);
    }
  }
  
  async updateCart(req, res, next) {
    try {
      const { quantity, user, product, size } = req.body;
      console.log('Received Data:', { quantity, user, product, size });
  
      const cart = await Cart.findOne({ user });
      if (!cart) throw new ApiError(404, "Cart Not Found");
  
      // Kiểm tra nếu sản phẩm đã tồn tại trong giỏ hàng với cùng size
      const productExisted = cart.products.find(
        (item) => item.product.toString() === product._id.toString() && item.size === size
      );
      console.log('Product Existed:', productExisted);
  
      let updateCartData;
      if (productExisted) {
        // Cập nhật số lượng sản phẩm nếu đã tồn tại, sử dụng $inc
        updateCartData = await Cart.findOneAndUpdate(
          { user, "products.product": product._id, "products.size": size },
          {
            $inc: { "products.$.quantity": quantity },  // Tăng số lượng
          },
          { new: true }
        );
      } else {
        // Thêm sản phẩm mới vào giỏ hàng nếu chưa có
        updateCartData = await Cart.findByIdAndUpdate(
          req.params.id,
          {
            $push: { products: { product, quantity, size } },
          },
          { new: true }
        );
      }
  
      if (!updateCartData) throw new ApiError(404, "Cart Not Found");
  
      res.status(StatusCodes.OK).json({
        message: "Update Cart Successfull",
        data: updateCartData,
      });
    } catch (error) {
      next(error);
    }
  }
  
  
  async deleteProductCart(req, res, next) {
    try {
      const { userId, id } = req.params;
      const cart = await Cart.findOne({ user: userId });
      if (!cart) throw new ApiError(404, "Cart Not Found");

      const newProductCart = cart.products.filter((item) => item.product != id);

      const updateCart = await Cart.findByIdAndUpdate(
        cart._id,
        { products: newProductCart },
        {
          new: true,
        }
      );
      if (!updateCart) throw new ApiError(404, "Cart Not Found");
      res.status(StatusCodes.CREATED).json({
        message: "Delete Product Cart Successfull",
        data: updateCart,
      });
    } catch (error) {
      next(error);
    }
  }
  // DELETE /carts/:id
  async deleteCart(req, res, next) {
    try {
      const cart = await Cart.findByIdAndDelete(req.params.id);
      if (!cart) throw new ApiError(404, "Cart Not Found");
      res.status(StatusCodes.OK).json({
        message: "Delete Cart Done",
      });
    } catch (error) {
      next(error);
    }
  }
}

export default CartsController;
