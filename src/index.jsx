import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { AuthContextProvider } from "./module/context/AuthContext";
import ChatContextProvider from "./module/context/ChatContext";

const client = new ApolloClient({
  uri: "http://192.168.1.43:5000/graphql",
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <AuthContextProvider>
        <ChatContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ChatContextProvider>
      </AuthContextProvider>
    </ApolloProvider>
  </React.StrictMode>
);
