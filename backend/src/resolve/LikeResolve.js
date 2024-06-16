import Like from "../../db/Model/LikeModel.js";
import { GraphQLError } from "graphql";

export default {
  Query: {
    like: async (_, { userId, postId }) => {
      try {
        const like = await Like.findOne({ userId, postId });
        return like;
      } catch (err) {
        throw new GraphQLError(err);
      }
    },
  },
  Mutation: {
    addLike: async (_, { userId, postId, liked }, context) => {
      try {
        if (context.user == null) {
          throw new GraphQLError("Unauthorized");
        }

        const like = await Like.findOne({ userId, postId });

        if (like) {
          like.liked = !liked;
          await like.save();
        } else {
          await Like.create({ userId, postId, liked });
        }
      } catch (err) {
        throw new GraphQLError(err);
      }
    },
  },
};
