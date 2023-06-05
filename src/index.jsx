import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { AuthContextProvider } from "./context/AuthContext";
import ChatContextProvider from "./context/ChatContext";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "http://192.168.1.49:5000/graphql", // Replace with your GraphQL server endpoint
});

const authLink = setContext((_, { headers }) => {
  // Get the token from local storage or any other storage mechanism
  const token = localStorage.getItem("token");

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "", // Set the authorization header
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <AuthContextProvider>
          <ChatContextProvider>
            <App />
          </ChatContextProvider>
        </AuthContextProvider>
      </BrowserRouter>
    </ApolloProvider>
  </>
);
