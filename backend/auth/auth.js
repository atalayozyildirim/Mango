import passport from "passport";
import { OAuth2Strategy as GoogleStrategy } from "passport-google-oauth";
import { Strategy as LocalStrategy } from "passport-local";
import UserModel from "../db/Model/UserModel.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: "206934614072-edgvddi9olcplovmc1tt2ftridam031j",
      clientSecret: "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",
      callbackURL: "http://localhost:5000/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await UserModel.findOne({ googleId: profile.id });
        if (user) {
          done(null, user);
        } else {
          var newUser = new UserModel({
            name: profile.displayName,
            googleId: profile.id,
            image: profile.photos[0].value,
            email: profile.emails[0].value,
            accessToken: accessToken,
            refreshToken: refreshToken,
            expires_in: profile.expires_in,
          });
          const savedUser = await newUser.save();
          done(null, savedUser);
          console.log(savedUser);
        }
      } catch (err) {
        console.log(err);
        done(err);
      }
    }
  )
);

passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const user = await UserModel.findOne({ email });
        if (!user) return done(null, false, { message: "Incorrect email" });

        const isMatch = await user.validPassword(password);
        if (!isMatch)
          return done(null, false, { message: "Incorrect password." });

        return done(null, user);
      } catch (err) {
        done(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await UserModel.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});
