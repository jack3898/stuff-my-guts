import ReactDOM from 'react-dom/client';
import './index.css';

function App() {
	return <p>Works!</p>;
}

ReactDOM.createRoot(document.querySelector('#app') as Element).render(<App />);
