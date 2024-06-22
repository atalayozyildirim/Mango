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
      mutation Mutation(
        $title: String!
        $content: String!
        $video: String
        $uri: String
        $image: String
        $date: String
      ) {
        addPost(
          title: $title
          content: $content
          video: $video
          uri: $uri
          image: $image
          date: $date
        ) {
          title
          content
          authorName
          likes
          comments
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
          date: data.date,
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
