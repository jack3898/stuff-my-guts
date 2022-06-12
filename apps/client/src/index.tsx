import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import Header from '@mealideas/components/src/core-page/Header';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import Home from './pages/home/Home';
import Login from './pages/login/Login';

const client = new ApolloClient({
	uri: 'http://localhost:3001/graphql',
	cache: new InMemoryCache()
});

function App() {
	return (
		<ApolloProvider client={client}>
			<Header title="Stuff My Guts" tagline="Inspiring your next meal" />
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="login" element={<Login />} />
				</Routes>
			</BrowserRouter>
		</ApolloProvider>
	);
}

ReactDOM.createRoot(document.querySelector('#app') as Element).render(<App />);
