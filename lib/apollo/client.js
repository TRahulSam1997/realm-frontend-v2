import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const defaultOptions = {
	watchQuery: {
		fetchPolicy: "no-cache",
		errorPolicy: "ignore",
	},
	query: {
		fetchPolicy: "no-cache",
		errorPolicy: "all",
	},
};

const cache = new InMemoryCache({
	resultCaching: false,
});

const link = createHttpLink({
	uri: `${process.env.NEXT_PUBLIC_WP_API_URL}/graphql`,
})

const client = new ApolloClient({
	connectToDevTools: true,
	link,
	cache,
	defaultOptions
});

export default client;