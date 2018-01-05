

const express = require("express");
var router = express.Router();
const {userMiddleware} = require("../middleware/userMiddleware");
const userRoutes = require("../controllers/userController");
const passport = require("passport");
const passportConfig = require("../passport");

router.post('/signUp', 
	function(req, res, next){
		userMiddleware(req, res, next)
	}, 
	function(req, res) {
		userRoutes.signUp(req, res);
	}
);
router.post('/signIn', 
	function(req, res, next){
		userMiddleware(req, res, next)
	},
	passport.authenticate('local', {session:false}),
	function(req, res) {
		userRoutes.signIn(req, res);
	}
);
router.get('/getProfile',
	passport.authenticate('jwt', {session:true}),
	function(req, res) {
		userRoutes.getProfile(req, res);
	}
);
router.get('/logout',
	passport.authenticate('jwt', {session:true}),
	function(req, res) {
		userRoutes.signOut(req, res);
	}
);

module.exports = router;