const express = require("express");
const routes = express.Router();
const loginController  =  require("../controllers/login");




//  POST SignUp is working successfully return token  ✔✔✔
routes.post("/specific/signup",loginController.signup);

// POST SignIn is working successfully return token ✔✔✔
routes.post("/specific/signin",loginController.signin);

module.exports = routes;