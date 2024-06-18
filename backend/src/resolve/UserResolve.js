import User from "../../db/Model/UserModel.js";
import { GraphQLError } from "graphql";
import { userValidator } from "../../util/validator/UserValidator.js";
import passport from "passport";

export default {
  Query: {
    user: async (_, {}, context) => {
      try {
        console.log(context.user);
        return context.user;
      } catch (err) {
        throw new GraphQLError(err.message);
      }
    },
  },
  Mutation: {
    deleteUser: async (_, { id }, context) => {
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
