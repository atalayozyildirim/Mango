import { GraphQLError } from "graphql";
import PostModel from "../../db/Model/PostModel.js";
import LikeModel from "../../db/Model/LikeModel.js";
import { postValidator } from "../../util/validator/PostValidator.js";
import UserModel from "../../db/Model/UserModel.js";

export default {
  Query: {
    posts: async () => {
      try {
        const data = await PostModel.find({}).limit(5);
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    post: async (_, { id }) => {
      try {
        const data = await PostModel.findById(id);
        return data;
      } catch (err) {
        throw new GraphQLError(err);
      }
    },
    paginatePosts: async (_, { page, limit }) => {
      try {
        const posts = await PostModel.find({})
          .skip((page - 1) * limit)
          .limit(limit)
          .sort({ createdAt: -1 });
        return posts;
      } catch (err) {
        throw new GraphQLError(err);
      }
    },
    popularPosts: async () => {
      try {
        const popularPosts = await LikeModel.aggregate([
          { $group: { _id: "$postId", likes: { $sum: 1 } } },
          { $sort: { likes: -1 } },
        ])
          .limit(5)
          .lookup({
            from: "posts",
            localField: "_id",
            foreignField: "_id",
            as: "post",
          })
          .unwind("post");

        return popularPosts;
      } catch (err) {
        throw new GraphQLError(err);
      }
    },
  },

  Mutation: {
    addPost: async (
      _,
      { title, content, video, uri, image, authorName },
      context
    ) => {
      const user = context.user;
      const body = {
        title,
        content,
        video,
        uri,
        image,
        authorName,
      };
      const { error } = postValidator.validate(body);
      if (error) throw new GraphQLError(error.details[0].message);

      try {
        if (!user) {
          throw new GraphQLError("Unauthorized");
        }
        const newPost = new PostModel({
          title,
          content,
          video,
          uri,
          image,
          authorName,
          user: authorName,
          userId: user.id,
        });

        const post = await newPost.save();

        const userHePostFieldUpdate = await UserModel.findOneAndUpdate(
          { _id: user.id },
          { $push: { Posts: post._id } },
          { new: true }
        );
        return post;
      } catch (err) {
        throw new GraphQLError(err);
      }
    },
    deletePost: async (_, { postId }, context) => {
      const user = context.user;
      try {
        if (!user) {
          throw new GraphQLError("Unauthorized");
        }

        const post = await PostModel.findById(postId);

        if (user.id === post.userId) {
          await post.delete();
          return "Post deleted successfully";
        } else {
          throw new GraphQLError("Action not allowed");
        }
      } catch (err) {
        console.log(err);
      }
    },
    updatePost: async (_, { postId, body }, context) => {
      const user = context.user;
      try {
        if (!user) {
          throw new GraphQLError("Unauthorized");
        }

        const post = await PostModel.findById(postId);

        if (user.id === post.userId) {
          post.body = body;
          await post.save();
          return post;
        } else {
          throw new GraphQLError("Action not allowed");
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};
