import { ApolloClient, InMemoryCache, makeVar, split } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { createUploadLink } from "apollo-upload-client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";

const TOKEN = "TOKEN";

export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)));

export const logUserIn = (token) => {
  localStorage.setItem(TOKEN, token);
  isLoggedInVar(true);
};

export const logUserOut = () => {
  localStorage.removeItem(TOKEN);
  isLoggedInVar(false);
  window.location.replace("/signIn");
};

const uploadHttpLink = createUploadLink({
  // uri: "http://localhost:4000/graphql",
  uri: "http://192.168.123.105:4000/graphql",
  // process.env.NODE_ENV === "production"
  //   ? "https://my.domain/graphql"
  //   : "http://localhost:4000/graphql",
});

const wsLink = new WebSocketLink({
  // uri: "ws://localhost:4000/graphql",
  uri: "ws://192.168.123.105:4000/graphql",
  options: {
    connectionParams: () => ({
      token: localStorage.getItem(TOKEN),
    }),
  },
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      token: localStorage.getItem(TOKEN),
    },
  };
});

const httpLinks = authLink.concat(uploadHttpLink);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLinks
);

export const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache({
    // typePolicies: {
    //   User: {
    //     keyFields: false,
    //   },
    // },
  }),
});
