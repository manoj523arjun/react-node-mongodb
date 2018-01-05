
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const {ExtractJwt} = require('passport-jwt');
const createUser = require("./modal/userModal").createUser;



passport.use(new JwtStrategy({
		jwtFromRequest : ExtractJwt.fromHeader("authorization"),
		secretOrKey:"apiServerKey"		
	}, async (payload, done) => {
		console.log(payload)
		try {
			console.log(payload);
			const userVal = await createUser.findById(payload.sub);
			if(!userVal) {
				return done(null, false)
			}
			done(null, userVal);
		} catch(e) {
			done(e, false);
		}
	}
));

passport.use(new LocalStrategy({
		usernameField:'email'
	},
	async function(email, password, done) {
		try {
			const user = await createUser.findOne({"web.email":email});
			const checkPass = await createUser.findOne({"web.password":password});
			if(!user) {
				return done(null, false, {error:'Invalid email'})
			}
			if(!checkPass) {
				return done(null, false, {error:'Invalid password'})
			}
			done(null, user);
		} catch(e) {
			done(e, false)
		}
	}
));
