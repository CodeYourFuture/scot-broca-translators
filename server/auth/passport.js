const passport = require("passport");
const passportJWT = require("passport-jwt");
const { ExtractJwt, Strategy: JwtStrategy } = passportJWT;
const db = require("../services/database/users");

const config = {};
config.secretOrKey = process.env.JWT_SECRET || "your_jwt_secret";
config.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken("authorization");

passport.use(
	new JwtStrategy(config, async (jwtPayload, done) => {
		try {
			const user = await db.getUserById(jwtPayload.userId);
			if (user) {
				return done(null, user);
			} else {
				return done(null, false);
			}
		} catch (e) {
			return done(e, false);
		}
	})
);
