import express from "express";
import passport from "passport";
import UserModel from "../../db/Model/UserModel.js";
import { userValidator } from "../../util/validator/UserValidator.js";
import { randomUUID } from "crypto";
import "../../auth/auth.js";

const router = express.Router();

router.get("/token", (req, res) => {
  if (req.user) {
    res.json({ user: req.user });
  }
  res.status(401).json({ message: "Unauthorized" });
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      console.log(req.user);
      res.json({ user: req.user });
    });
  })(req, res, next);
});

router.post("/register", async (req, res, next) => {
  const { email, password, name, phoneNumber } = req.body;

  const ExitUser = await UserModel.findOne({ email: email });
  if (ExitUser)
    return res.status(400).json({ message: "Email already exists" });

  const val = userValidator.validate({ email, password, name, phoneNumber });

  if (val.error) {
    return res.status(400).json({ message: val.error.details[0].message });
  }

  try {
    const user = new UserModel({
      userId: randomUUID(),
      name,
      email,
      password,
      phoneNumber,
    });

    await user.save();

    res.status(201).json({ message: "OK => User Created" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get("/google/callback", passport.authenticate("google"), (req, res) => {
  const token = jwt.sign({ userId: req.user.id }, process.env.SECRET);
  res.redirect("/callback?token=" + token);
});

export default router;
