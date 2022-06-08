import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './pages/home/Home';

function App() {
	return <Home />;
}

ReactDOM.createRoot(document.querySelector('#app') as Element).render(<App />);
