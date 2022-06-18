import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import Header from '@mealideas/components/src/core-page/Header';
import { AuthContextProvider } from '@mealideas/components/src/hooks/useAuth';
import { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';

const Home = lazy(() => import('./pages/home/Home'));
const Login = lazy(() => import('./pages/login/Login'));
const Signup = lazy(() => import('./pages/signup/Signup'));

const client = new ApolloClient({
	uri: 'http://localhost:3001/graphql',
	cache: new InMemoryCache()
});

function App() {
	return (
		<ApolloProvider client={client}>
			<Header title="Stuff My Guts" tagline="Inspiring your next meal" />
			<Suspense>
				<AuthContextProvider directTo="login">
					<BrowserRouter>
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="login" element={<Login />} />
							<Route path="signup" element={<Signup />} />
						</Routes>
					</BrowserRouter>
				</AuthContextProvider>
			</Suspense>
		</ApolloProvider>
	);
}

ReactDOM.createRoot(document.querySelector('#app') as Element).render(<App />);
