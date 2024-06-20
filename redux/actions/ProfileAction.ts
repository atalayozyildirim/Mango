import { createAsyncThunk } from "@reduxjs/toolkit";
import { gql } from "@apollo/client";
import { client } from "@/graphql/Client";

const createProfile: any | void = createAsyncThunk(
  "profile/createProfile",
  async (data: any) => {
    const CREATE_PROFILE = gql``;

    const response = await client.mutate({
      mutation: CREATE_PROFILE,
      variables: {},
    });

    return response.data;
  }
);

export { createProfile };
