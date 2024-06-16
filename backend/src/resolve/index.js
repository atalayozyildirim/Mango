import postResolver from "./postResolve.js";
import comnentResolver from "./commentResolve.js";
import LikeResolver from "./LikeResolve.js";
import BadgeResolve from "./BadgeResolve.js";
import UserResolve from "./UserResolve.js";

const resolvers = {
  Query: {
    ...postResolver.Query,
    ...comnentResolver.Query,
    ...LikeResolver.Query,
    ...BadgeResolve.Query,
    ...UserResolve.Query,
  },
  Mutation: {
    ...postResolver.Mutation,
    ...comnentResolver.Mutation,
    ...LikeResolver.Mutation,
    ...BadgeResolve.Mutation,
    ...UserResolve.Mutation,
  },
};

export default resolvers;
