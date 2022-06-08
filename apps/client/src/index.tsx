import Test from '@mealideas/components/src/Test';
import ReactDOM from 'react-dom/client';
import './index.css';

function App() {
	return (
		<div>
			<p>Works!</p>
			<Test />
		</div>
	);
}

ReactDOM.createRoot(document.querySelector('#app') as Element).render(<App />);
