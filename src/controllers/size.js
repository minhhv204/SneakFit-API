import Product from '../models/ProductModel.js';
import Size from '../models/Size.js';

class SizeController {
    // Thêm size mới cho sản phẩm
    async addSize(req, res) {
        try {
            const { size, quantity, productId } = req.body;

            // Kiểm tra sản phẩm có tồn tại không
            const product = await Product.findById(productId);
            if (!product) {
                return res.status(404).json({ message: 'Sản phẩm không tồn tại' });
            }

            // Tạo size mới
            const newSize = new Size({
                product: productId,
                size,
                quantity,
            });

            await newSize.save();
            return res.status(201).json({ message: 'Đã thêm size mới', size: newSize });
        } catch (error) {
            return res.status(500).json({ message: 'Lỗi server', error });
        }
    }

    // Lấy danh sách size theo productId
    async getSizesByProduct(req, res) {
        try {
            const { productId } = req.params;
            const sizes = await Size.find({ product: productId });
            if (!sizes.length) {
                return res.status(404).json({ message: 'Không tìm thấy size cho sản phẩm này' });
            }

            return res.status(200).json(sizes);
        } catch (error) {
            console.error("Error details:", error);  // Ghi chi tiết lỗi vào console
            return res.status(500).json({ message: 'Lỗi server', error: error.message });
        }
    }

    // Cập nhật số lượng cho size cụ thể
    async updateSizeQuantity(req, res) {
        try {
            const { sizeId } = req.params;
            const { quantity } = req.body;

            const size = await Size.findById(sizeId);
            if (!size) {
                return res.status(404).json({ message: 'Size không tồn tại' });
            }

            // Cập nhật số lượng
            size.quantity = quantity;
            await size.save();

            return res.status(200).json({ message: 'Đã cập nhật số lượng', size });
        } catch (error) {
            return res.status(500).json({ message: 'Lỗi server', error });
        }
    }

    // Xóa size khỏi sản phẩm
    async deleteSize(req, res) {
        try {
            const { sizeId } = req.params;

            const size = await Size.findByIdAndDelete(sizeId);
            if (!size) {
                return res.status(404).json({ message: 'Size không tồn tại' });
            }

            return res.status(200).json({ message: 'Đã xóa size', size });
        } catch (error) {
            return res.status(500).json({ message: 'Lỗi server', error });
        }
    }
}

export default SizeController;
