const express = require("express");
const mongoose = require('mongoose');
const createUser = require('./modal/userModal').createUser;
const bodyParser = require('body-parser');
const logger = require("morgan");
const expressSession = require('express-session');
var router = require("./routers/userRouter");
var productRouter = require("./routers/productRouter");

const passport = require("passport");

passport.serializeUser(function(user, done) {
  done(null, user.id);
});
 
passport.deserializeUser(function(id, done) {
  createUser.findById(id, function (err, user) {
    done(err, user);
  });
});

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/apiServer', {useMongoClient:true});

const app = new express();

app.use(logger("dev"));

app.use(bodyParser.json());


app.use(expressSession({ secret: 'apiserver-session', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next)=>{
	res.setHeader("Access-Control-Allow-Origin", "*");
  	res.setHeader("Access-Control-Allow-Headers", "access-control-allow-origin,content-type, authorization");
  	next();
})
app.use("/users", router);
app.use("/products", productRouter);

/*app.post('/signUp', async function (req, res) {
	const {name, email, password} = req.body;
	const findEmail = await createUser.findOne({"web.email":email});
	if(findEmail) {
		return res.status(403).json({status:"email already exist"});
	}
	const user = new createUser({
		method:'web',
		web: {
			name,
			email,
			password
		}
	});
	await user.save();
	const token = signUpToken(user);
  	res.status(200).json({token});
})*/

const port = process.env["API_PORT"] || 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}`))