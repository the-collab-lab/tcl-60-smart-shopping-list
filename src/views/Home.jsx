import './Home.css';
import { useNavigate } from 'react-router-dom';

export function Home({ newToken }) {
	const navigate = useNavigate();
	const tokenFromStorage = localStorage.getItem('tcl-shopping-list-token');
	function handleClick() {
		newToken();
		navigate('/list');
	}
	if (tokenFromStorage) navigate('/list');
	return (
		<div className="Home">
			<p>
				Hello from the home (<code>/</code>) page!
			</p>
			<button onClick={handleClick}>New List</button>
		</div>
	);
}
