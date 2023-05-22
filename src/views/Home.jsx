import './Home.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { checkItem } from '../api/firebase';

export function Home({ setNewToken, token, setToken }) {
	const [existingToken, setExistingToken] = useState('');
	const [joiningError, setJoiningError] = useState(false);
	const navigate = useNavigate();
	// useEffect will watch for changes to the token and will redirect whenever it exists
	useEffect(() => {
		if (token) navigate('/list');
		// disable warning that navigate should be a dependency
		// eslint-disable-next-line
	}, [token]);
	function handleTokenChange(e) {
		setExistingToken(e.target.value);
	}

	function handleSubmit(e) {
		e.preventDefault();
		const trimmedToken = existingToken.trim();
		checkItem(trimmedToken)
			.then((shoppingList) => {
				if (shoppingList) {
					setToken(trimmedToken);
				} else {
					setJoiningError(true);
				}
			})
			.catch((error) => {
				setJoiningError(true);
				console.log(error);
			});
		setExistingToken('');
	}
	if (token) return <p></p>;
	return (
		<div className="home">
			<img className="hero-image" src="./img/hero.jpeg" alt="hero" />
			<p className="welcome-message">
				Welcome to Smart Shopping List app - your companion for efficient and
				organized shopping!
			</p>
			<div className="button-container">
				<button onClick={setNewToken}>Create New List</button>
			</div>
			<div className="form-container">
				<form onSubmit={handleSubmit}>
					<label htmlFor="existingToken">Enter existing token:</label>
					<br />
					<input
						type="text"
						id="existingToken"
						value={existingToken}
						onChange={handleTokenChange}
					/>
					<br />
					<button className="existing-btn">Join existing list</button>
					{joiningError && <p>No such list exist</p>}
				</form>
			</div>
		</div>
	);
}
