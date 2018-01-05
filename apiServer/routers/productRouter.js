

const express = require("express");
var productRouter = express.Router();
const {userMiddleware} = require("../middleware/userMiddleware");
const userRoutes = require("../controllers/userController");


productRouter.get('/getProducts',
	function(req, res, next){
		userMiddleware(req, res, next)
	},
	function(req, res) {
		userRoutes.getProducts(req, res);
	}
);

module.exports = productRouter; 