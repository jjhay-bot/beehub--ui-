import { ApolloClient, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { httpLink } from "../config";

// ADD HEADER_TOKEN
const authLink = setContext((_, { headers }) => {
  // let token = sessionStorage.getItem("token");
  return {
    headers: {
      ...headers,
      // authorization: `Bearer ${token}`,
    },
  };
});

export const cache = new InMemoryCache({});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: cache,
});

