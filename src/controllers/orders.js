import { StatusCodes } from "http-status-codes";
import Order from "../models/OrderModel.js";
import ApiError from "../utils/ApiError.js";
import Cart from "../models/CartModel.js";
import Product from "../models/ProductModel.js";

class OrdersController {
  // GET /orders
  async getAllOrders(req, res, next) {
    try {
      const orders = await Order.find().populate({
        path: "products",
        populate: {
          path: "product",
          model: Product,
        },
      });
      res.status(StatusCodes.OK).json(orders);
    } catch (error) {
      next(error);
    }
  }
  // GET /orders/:id
  async getOrderDetail(req, res, next) {
    try {
      const order = await Order.findById(req.params.id).populate("products.product");
      if (!order) throw new ApiError(404, "Order Not Found");
      
      res.status(200).json({
        message: "Order retrieved successfully",
        data: order,
      });
    } catch (error) {
      next(error);
    }
  }

  async getOrderUser(req, res, next) {
    try {
      const order = await Order.find({user: req.params.id}).populate({
        path: "products",
        populate: {
          path: "product",
          model: Product,
        },
      });;

      // if (!order) throw new ApiError(404, "Order Not Found");
      res.status(StatusCodes.OK).json(order);
    } catch (error) {
      next(error);
    }
  }
  // POST /orders
  async createOrder(req, res, next) {
    console.log(122);
    
    try {
      console.log("User ID from request:", req.body.user);
      const cart = await Cart.findOne({ user: req.body.user });
      if (!cart) {
        
        throw new ApiError(404, "Cart Not Found");
      }
  
      // Sau khi đảm bảo `Cart` tồn tại, tiến hành tạo `Order`
      const newOrder = await Order.create(req.body);
  
      // Xóa `Cart` sau khi đã tạo `Order`
      await Cart.findOneAndDelete({ user: req.body.user });
  
      res.status(StatusCodes.CREATED).json({
        message: "Create Order Successful",
        data: newOrder,
      });
    } catch (error) {
      next(error);
    }
  }
  
  // PUT /orders/:id
  async updateOrder(req, res, next) {
    try {
      const updateOrder = await Order.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updateOrder) throw new ApiError(404, "Order Not Found");

      res.status(StatusCodes.OK).json({
        message: "Update Order Successfull",
        data: updateOrder,
      });
    } catch (error) {
      next(error);
    }
  }
  // DELETE /orders/:id
  async deleteOrder(req, res, next) {
    try {
      const order = await Order.findByIdAndDelete(req.params.id);
      if (!order) throw new ApiError(404, "Order Not Found");
      res.status(StatusCodes.OK).json({
        message: "Delete Order Done",
      });
    } catch (error) {
      next(error);
    }
  }
}

export default OrdersController;
