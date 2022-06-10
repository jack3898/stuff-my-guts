import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './pages/home/Home';

const client = new ApolloClient({
	uri: 'http://localhost:3001/graphql',
	cache: new InMemoryCache()
});

function App() {
	return (
		<ApolloProvider client={client}>
			<Home />
		</ApolloProvider>
	);
}

ReactDOM.createRoot(document.querySelector('#app') as Element).render(<App />);
