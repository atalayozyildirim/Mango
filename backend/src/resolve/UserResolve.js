import User from "../../db/Model/UserModel.js";
import { GraphQLError } from "graphql";
import { userValidator } from "../../util/validator/UserValidator.js";
import jwt from "jsonwebtoken";

export default {
  Query: {
    user: async (_, { id }, context) => {
      const token = context.token;
      jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) throw new GraphQLError("Invalid token, please login again");
        console.log(decoded);
        id = decoded.id;
      });

      try {
        const user = await User.findById(id);

        if (!user) throw new GraphQLError("User not found");

        return user;
      } catch (err) {
        throw new GraphQLError(err.message);
      }
    },
  },
  Mutation: {
    addUser: async (_, { body }, context) => {
      // if (body) throw new GraphQLError("Please provide user data");
      // else if (body.password !== body.confirmPassword)
      //   throw new GraphQLError("Password and confirm password do not match");
      // else if (body.password.length < 8)
      //   throw new GraphQLError("Password must be at least 6 characters long");

      const { error } = userValidator.validate(body);

      if (error) throw new GraphQLError(error.details[0].message);
      if (context.user && context.user.id) {
        const user = new User({
          ...body,
          userId: context.user.id,
        });

        await user.save();

        return user;
      } else {
        const user = new User({
          ...body,
        });

        await user.save();

        return user;
      }
    },
    deleteUser: async (_, { id }) => {
      try {
        const user = await User.findByIdAndDelete(id);

        if (!user) throw new GraphQLError("User not found");

        user.save();
        return "User deleted successfully";
      } catch (err) {
        throw new GraphQLError(err.message);
      }
    },
    updateUser: async (_, { id, body }) => {
      try {
        const user = await User.findById(id);

        if (!user) throw new GraphQLError("User not found");

        if (body == null) throw new GraphQLError("Please provide user data");

        user.updateOne(body);

        user.save();

        return user;
      } catch (err) {
        throw new GraphQLError(err.message);
      }
    },
  },
};
