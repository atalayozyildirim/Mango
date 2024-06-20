import { client } from "@/graphql/Client";
import { gql } from "@apollo/client";
import { createAsyncThunk } from "@reduxjs/toolkit";

const search: any | void = createAsyncThunk(
  "search/search",
  async (data: any) => {
    const SEARCH_DATA = gql``;

    const response = await client.query({
      query: SEARCH_DATA,
    });

    return response.data;
  }
);

export { search };
