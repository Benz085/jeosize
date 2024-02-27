import { config } from "../config";
import passport from "passport";
import {
  Strategy as JwtStrategy,
  ExtractJwt,
} from "passport-jwt";

const opts: any = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.JWT_SECRET,
};

passport.use(
  new JwtStrategy(opts, async (jwtPayload, done) => {
    try {
      const user = jwtPayload;
      if (!user) {
        return done(new Error("ไม่พบผู้ใช้งานในระบบ"), null);
      }
      return done(null, user);
    } catch (error) {
      done(error);
    }
  })
);

export default passport;
