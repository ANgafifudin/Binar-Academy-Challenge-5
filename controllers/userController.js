const userService = require("../services/userService");
const { User } = require("../models");

module.exports = {
  async getUsers(req, res) {
    const userToken = req.user;
    if (userToken.role === "member") {
      return res.status(200).json({
        success: false,
        message: "You don't have access",
      });
    }
    try {
      const users = await User.findAll({
        attributes: ["id", "email", "role"],
      });
      res.status(200).json({
        data: users,
      });
    } catch (error) {
      console.log(error);
    }
  },
  async register(req, res) {
    try {
      const data = await userService.register(req.body);
      res.status(201).json(data);
    } catch (error) {
      res.status(400).json(error.message);
      console.log(error);
    }
  },

  async login(req, res) {
    try {
      const data = await userService.login(req.body);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(404).json({ success: false, message: "Login Failed" });
    }
  },
  async createAdmin(req, res) {
    const userToken = req.user;
    if (userToken.role !== "superadmin") {
      return res.status(200).json({
        success: false,
        message: "You don't have access",
      });
    }
    try {
      const data = await userService.createAdmin(req.body);
      res.status(201).json(data);
    } catch (err) {
      res.status(404).json({
        message: err.message,
      });
    }
  },
  async logout(req, res) {
    const refreshToken = req.body.token;

    if (!refreshToken) return res.sendStatus(204);

    res.clearCookie("accessToken");
    return res
      .status(200)
      .json({ success: true, message: "Logout Successfully" });
  },
};
