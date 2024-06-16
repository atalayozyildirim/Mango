import Badge from "../../db/Model/BadgeModel.js";
import { GraphQLError } from "graphql";

export default {
  Query: {
    badge: async (_, { id }) => {
      try {
        const badge = await Badge.findById(id);
        return badge;
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
  },
  Mutation: {
    addBadge: async (_, { body }, context) => {
      try {
        if (!context.user) {
          throw new GraphQLError("You are not authenticated");
        }

        if (body === null || body === undefined) {
          throw new GraphQLError("Please provide badge details");
        }
        const newBadge = new Badge({
          ...body,
          userId: context.user._id,
        });
        await newBadge.save();
        return newBadge;
      } catch (err) {
        throw new GraphQLError(err.message);
      }
    },
    deleteBadge: async (_, { id, body }, context) => {
      try {
        if (!context.user) {
          throw new GraphQLError("You are not authenticated");
        }
        const badge = await Badge.findById(id);
        if (!badge) {
          throw new GraphQLError("Badge not found");
        }
        if (badge.userId.toString() !== context.user._id.toString()) {
          throw new GraphQLError("You are not authorized to delete this badge");
        }
        await badge.delete();
        return badge;
      } catch (err) {
        throw new GraphQLError(err.message);
      }
    },
  },
};
