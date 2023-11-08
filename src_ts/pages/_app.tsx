import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "../utilities/client/apollo-client";

/**
 * A global wrapper around the application
 * @param Component The component page to render
 * @param props Any existing page props to pass into the page component
 */
export default function App({ Component, props }) {
  return (
    <ApolloProvider client={apolloClient}>
      <Component {...props}/>
    </ApolloProvider>
  );
}
