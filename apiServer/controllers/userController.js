
const createUser = require('../modal/userModal').createUser;
const getProducts = require("../modal/userModal").getProducts;
const JWT = require("jsonwebtoken");

signUpToken = user => {
	return JWT.sign({
		iss:"apiServer",
		sub:user.id,
		iat:new Date().getTime(),
		exp:new Date().setDate(new Date().getDate() + 1)
	}, "apiServerKey");
}

module.exports = {
	signUp:async function(req, res) {
		const {firstName, lastName, email, password} = req.body;
		const findEmail = await createUser.findOne({"web.email":email});
		if(findEmail) {
			return res.status(403).json({statusCode:403, status:"email already exist"});
		}
		const user = new createUser({
			method:'web',
			web: {
				firstName,
				lastName,
				email,
				password
			}
		});
		await user.save();
		const token = signUpToken(user);
	  	res.status(200).json({statusCode:200, token, userDetails:user});
	},
	signIn: async function(req, res) {
		const token = signUpToken(req.user);
		res.status(200).json({statusCode:200, token, userDetails:req.user})
	},
	getProfile: function(req, res) {
		res.send("got profile")	
	},
	signOut: async function(req, res) {
		req.logout();
		//console.log(req.session);
		req.session.destroy();
		res.status(200).json({statusCode:200, statusText:"logout successfully!"});
	},
	getProducts:async function(req, res) {
		//let getProducts = await Products();
		await getProducts().then(function(data){
			if(data) {
				res.status(200).json({statusCode:200, productDetails:data});
			}
			//res.status(401).json({statusCode:401, productDetails:"No data found"});
		})
		
	}
}