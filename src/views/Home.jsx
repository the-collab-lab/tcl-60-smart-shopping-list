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
		checkItem(existingToken)
			.then((shoppingList) => {
				if (shoppingList) {
					setToken(existingToken);
					console.log('LIST EXISTS');
				} else {
					console.log('NO LIST');
					setJoiningError(true);
				}
			})
			.catch((error) => {
				setJoiningError(true);
				console.log(error);
			});

		console.log('SUBMITTED');
	}

	return (
		<div className="Home">
			<p>
				Hello from the home (<code>/</code>) page!
			</p>
			<button onClick={setNewToken}>New List</button>
			{/* Search list form */}
			<form onSubmit={handleSubmit}>
				<label htmlFor="existingToken">Existing token</label>
				<input
					type="text"
					id="existingToken"
					value={existingToken}
					onChange={handleTokenChange}
				/>
				<button>Join existing list</button>
				{joiningError && <p>No such list exist</p>}
			</form>
		</div>
	);
}
