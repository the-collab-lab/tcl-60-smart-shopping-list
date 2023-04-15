import './Home.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export function Home({ setNewToken, token }) {
	const navigate = useNavigate();
	// useEffect will watch for changes to the token and will redirect whenever it exists
	useEffect(() => {
		if (token) navigate('/list');
		// disable warning that navigate should be a dependency
		// eslint-disable-next-line
	}, [token]);

	return (
		<div className="Home">
			<p>
				Hello from the home (<code>/</code>) page!
			</p>
			<button onClick={setNewToken}>New List</button>
		</div>
	);
}
