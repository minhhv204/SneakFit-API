import { Router } from 'express';
import SizeController from '../controllers/size.js';

const sizeRouter = Router();
const sizeController = new SizeController();

// Route GET để lấy tất cả sizes của sản phẩm
sizeRouter.get('/product/:productId', (req, res, next) => {
    console.log('GET /sizes/product/:productId called');
    next();  // Tiến đến controller
}, sizeController.getSizesByProduct);

// Route POST để thêm size cho sản phẩm
sizeRouter.post('/add', sizeController.addSize); // Thêm size mới cho sản phẩm

// Route PUT để cập nhật số lượng size
sizeRouter.put('/:sizeId', sizeController.updateSizeQuantity); // Cập nhật số lượng size

// Route DELETE để xóa size khỏi sản phẩm
sizeRouter.delete('/:sizeId', sizeController.deleteSize); // Xóa size

export default sizeRouter;
