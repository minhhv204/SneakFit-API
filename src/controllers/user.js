import User from "../models/UserModel.js";

class UserController {
    async getAllUser(req, res, next) {
        try {
            const users = await User.find();
            res.status(200).json(users);
        } catch (error) {
            next(error);
        }
    }
    async getUserById(req, res, next) {
        try {
            const user = await User.findById(req.params.id);
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    }
    async updateUser(req, res, next) {
        try {
            const user = await User.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
            });
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    }

    async deleteUser(req, res, next) {
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    }
}
export default UserController