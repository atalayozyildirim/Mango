import { Config } from "@/config/config";
import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: Config.API_URL + "api",
  cache: new InMemoryCache(),
});
