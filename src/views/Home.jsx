import './Home.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export function Home({ setNewToken, token }) {
	const navigate = useNavigate();
	useEffect(() => {
		if (token) navigate('/list');
	}, [token, navigate]);

	return (
		<div className="Home">
			<p>
				Hello from the home (<code>/</code>) page!
			</p>
			<button onClick={setNewToken}>New List</button>
		</div>
	);
}
