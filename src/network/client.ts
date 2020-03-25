import { createClient, defaultExchanges, subscriptionExchange } from 'urql';
import { SubscriptionClient } from 'subscriptions-transport-ws';

// According to docs this will work as long as the server is using Apollo server.
const subscriptionClient = new SubscriptionClient('wss://react.eogresources.com/graphql', { reconnect: true });

// I noticed that the client was defined in the Weather component.
// The graphql client will be used universally though.
// Using this network folder instead.
const gqlClient = createClient({
  url: 'https://react.eogresources.com/graphql',
  // need to add suport for subscriptions
  exchanges: [
    ...defaultExchanges,
    subscriptionExchange({
      forwardSubscription(operation) {
        return subscriptionClient.request(operation);
      },
    }),
  ],
});

export default gqlClient;
