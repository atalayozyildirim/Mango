import { createAsyncThunk } from "@reduxjs/toolkit";
import { gql } from "@apollo/client";
import { client } from "@/graphql/Client";
import UserModel from "../../backend/db/Model/PostModel";

export const getPosts: any | void = createAsyncThunk(
  "post/getPosts",
  async () => {
    const GET_POSTS = gql`
      query {
        posts {
          title
          authorName
          content
          uri
          video
        }
      }
    `; // GraphQL query to get all post
    const response = await client.query({
      query: GET_POSTS,
    });
    return response.data;
  }
);

export const createPost = createAsyncThunk(
  "post/createPost",
  async (data: any) => {
    const CREATE_POST = gql`
      mutation AddPost(
        $title: String!
        $content: String!
        $authorName: String!
        $video: String
        $uri: String
        $image: String
      ) {
        addPost(
          title: $title
          content: $content
          authorName: $authorName
          video: $video
          uri: $uri
          image: $image
        ) {
          content
          title
          authorName
          id
        }
      }
    `;

    try {
      const response = await client.mutate({
        mutation: CREATE_POST,
        variables: {
          title: data.title,
          content: data.content,
          authorName: data.authorName,
          video: data.video || "",
          uri: data.uri || "",
          image: data.image || "",
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      return "ERROR ";
    }
  }
);

export const GetPostsWithPagination = createAsyncThunk(
  "post/GetPost",
  async (data: any) => {
    const GET_POSTS = gql`
      query Query($page: Int!, $limit: Int!) {
        paginatePosts(page: $page, limit: $limit) {
          content
          authorName
          userId
        }
      }
    `;
    try {
      const response = await client.query({
        query: GET_POSTS,
        variables: {
          page: data.page,
          limit: data.limit,
        },
      });
      return {
        response: response.data,
        loading: response.loading,
      };
    } catch (error) {
      return "ERROR";
    }
  }
);

export const GetPostById = createAsyncThunk(
  "post/GetPostById",
  async (id: string) => {
    const GET_POST_BY_ID = gql`
      query Post($postId: ID!) {
        post(id: $postId) {
          content
          authorName
          id
          image
          uri
          video
        }
      }
    `;
    try {
      const response = await client.query({
        query: GET_POST_BY_ID,
        variables: {
          postId: id,
        },
      });
      return response.data;
    } catch (error) {
      return JSON.stringify(error);
    }
  }
);
