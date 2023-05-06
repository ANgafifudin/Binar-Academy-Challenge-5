const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
const {
  register,
  login,
  createAdmin,
  getUsers,
  logout,
} = require("./controllers/userController");
const {
  createCar,
  getCars,
  updateCar,
  deleteCar,
  getDeleteCars,
} = require("./controllers/carsController");
const { verifyToken } = require("./middlewares/authMiddleware");
const prefix = "/v1/api/";

// User API
app.post(prefix + "register", register);
app.post(prefix + "login", login);
app.post(prefix + "createadmin", verifyToken, createAdmin);
app.get(prefix + "users", verifyToken, getUsers);
app.delete(prefix + "logout", logout);

// Cars API
app.post(prefix + "createcar", verifyToken, createCar);
app.get(prefix + "cars", getCars);
app.put(prefix + "updatecar/:id", verifyToken, updateCar);
app.put(prefix + "deletecar/:id", verifyToken, deleteCar);
app.get(prefix + "deletedcars", verifyToken, getDeleteCars);

app.listen(port, () => {
  console.log(`Server berjalan pada port: ${port}`);
});
