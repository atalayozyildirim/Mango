import { createAsyncThunk } from "@reduxjs/toolkit";
import { gql } from "@apollo/client";
import { client } from "@/graphql/Client";

export const getPosts: any | void = createAsyncThunk(
  "post/getPosts",
  async () => {
    const GET_POSTS = gql`
      query {
        posts {
          content
          title
        }
      }
    `;

    const response = await client.query({
      query: GET_POSTS,
    });
    console.log(response.data.posts);
    return response.data.posts;
  }
);

export const createPost: any | void = createAsyncThunk(
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
        }
      }
    `;

    const response = await client.mutate({
      mutation: CREATE_POST,
      variables: {
        title: data.title,
        authorName: data.authorName,
        content: data.content,
        video: data.video || "",
        uri: data.uri || "",
        image: data.image || [],
        date: data.date,
      },
    });

    return response.data;
  }
);
