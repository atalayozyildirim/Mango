import Comment from "../../db/Model/Comment.js";
import { GraphQLError } from "graphql";

export default {
  Query: {
    comment: async (_, { id }) => {
      try {
        const comment = await Comment.findById(id);

        return comment;
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
  },
  Mutation: {
    addComment: async (_, { body }, context) => {
      try {
        if (!context.user) {
          throw new GraphQLError("User not authenticated");
        }

        if (!body) {
          throw new GraphQLError("Comment body is required");
        }

        const comment = new Comment({
          body,
          user: context.user.id,
        });

        await comment.save();

        return comment;
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    updateComment: async (_, { id, body }, context) => {
      try {
        if (!context.user) {
          throw new GraphQLError("User not authenticated");
        }

        if (!body) {
          throw new GraphQLError("Comment body is required");
        }

        const comment = await Comment.findById(id);

        if (!comment) {
          throw new GraphQLError("Comment not found");
        }

        if (comment.user.toString() !== context.user.id) {
          throw new GraphQLError("User not authorized");
        }

        comment.body = body;

        await comment.save();

        return comment;
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    deleteComment: async (_, { id }, context) => {
      try {
        if (!context.user) {
          throw new GraphQLError("User not authenticated");
        }

        const comment = await Comment.findById(id);

        if (!comment) {
          throw new GraphQLError("Comment not found");
        }

        if (comment.user.toString() !== context.user.id) {
          throw new GraphQLError("User not authorized");
        }

        await comment.remove();
        return comment;
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
  },
};
