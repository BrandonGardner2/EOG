import { createClient } from 'urql';

// I noticed that the client was defined in the Weather component.
// The graphql client will be used universally though.
// Using this network folder instead.
const gqlClient = createClient({
  url: 'https://react.eogresources.com/graphql',
});

export default gqlClient;
