import "./App.css";
import Home from "./components/Home";
import HowTo from "./components/HowTo";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Posts from "./components/Posts";
import Main from "./components/Main";
import Friends from "./components/Friends";
import ChannelDeets from "./components/ChannelDeets";
import { AppContext } from "./context/appContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloProvider,
  from,
  split,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import Swal from "sweetalert2";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";

import Profile from "./components/Profile";
//Temp//
import Channel2 from "./components/Channel2";
//EF Temp//
const httpLink = new HttpLink({
  // uri: "https://intouch-server-development.up.railway.app/graphql",
  uri: "https://in-touch-server.vercel.app/graphql",
  // uri: "http://localhost:4000/graphql",
});

const wsLink = new GraphQLWsLink(
  createClient({
    // url: "wss://intouch-server-development.up.railway.app/subscriptions",
    url: "https://in-touch-server.vercel.app/subscriptions",
    // url: "http://localhost:4000/subscriptions",
    // connectionParams: {
    //   authToken: token ? `${token}` : "",
    // },
  })
);
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach((error) => {
      // console.log(`${error.extensions.exception.stacktrace[0].split(":")[0]}`);
      if (
        error.extensions &&
        error.extensions.exception &&
        error.extensions.exception.stacktrace &&
        error.extensions.exception.stacktrace[0].split(":")[0] ==
          "TokenExpiredError"
      ) {
        Swal.fire({
          icon: "error",
          title: "Token expired",
          text: "Please login again",
        }).then(() => {
          //we can't use useNavigate here
          window.localStorage.clear();
          window.location.href = "/login";
        });
      }
    });

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? `${token}` : "",
    },
  };
});
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  from([errorLink, authLink, httpLink])
);
const client = new ApolloClient({
  cache: new InMemoryCache(),
  //SPlit link required
  link: splitLink,
  request: (operation) => {
    // console.log(operation);
  },
});

function App() {
  return (
    <AppContext.Provider value={{}}>
      <ApolloProvider client={client}>
        <Router>
          <div className="App">
            <div className="App-body">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/token-how-to" element={<HowTo />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route
                  path="/user/:userId"
                  element={<Main component="user" />}
                />
                <Route
                  path="/profile"
                  element={<Main component="user" person="self" />}
                />
                <Route
                  path="/channel/members"
                  element={<Main component="members" />}
                />
                <Route path="/posts" element={<Posts />} />
                <Route path="/friends" element={<Main component="friends" />} />
                <Route path="/main" element={<Main component="feed" />} />
              </Routes>
            </div>
          </div>
        </Router>
      </ApolloProvider>
    </AppContext.Provider>
  );
}

export default App;
