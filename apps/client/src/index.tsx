import Header from '@smg/components/src/core-page/Header';
import { Protect } from '@smg/components/src/core-page/Protect';
import { AuthContextProvider } from '@smg/components/src/hooks/useAuth';
import { ApolloClient, ApolloProvider } from '@smg/graphql/apollo/client';
import { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import inMemoryCache from './inMemoryCache.config';

const Home = lazy(() => import('./pages/home/Home'));
const Login = lazy(() => import('./pages/login/Login'));
const Signup = lazy(() => import('./pages/signup/Signup'));
const Account = lazy(() => import('./pages/account/Account'));

const client = new ApolloClient({
	uri: 'http://localhost:3001/graphql',
	cache: inMemoryCache,
	credentials: 'include'
});

function App() {
	return (
		<ApolloProvider client={client}>
			<Suspense>
				<AuthContextProvider directTo="login">
					<BrowserRouter>
						<Header title="Stuff My Guts" tagline="Inspiring your next meal" />
						<Routes>
							{/* Base protected routes */}
							<Route element={<Protect to="/login" />}>
								<Route path="/" element={<Home />} />
								<Route path="account" element={<Account />} />
								<Route path="planner" />
								<Route path="create" />
							</Route>

							{/* Base un-protected routes */}
							<Route element={<Protect to="/" invert={true} />}>
								<Route path="login" element={<Login />} />
								<Route path="signup" element={<Signup />} />
							</Route>
						</Routes>
					</BrowserRouter>
				</AuthContextProvider>
			</Suspense>
		</ApolloProvider>
	);
}

ReactDOM.createRoot(document.querySelector('#app') as Element).render(<App />);
