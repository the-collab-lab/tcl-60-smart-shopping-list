import { ListItem } from '../components';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function List({ data, token }) {
	const navigate = useNavigate();
	useEffect(() => {
		if (!token) navigate('/');
		// disable warning that navigate should be a dependency
		// eslint-disable-next-line
	}, [token]);
	const [query, setQuery] = useState('');
	const handleChange = (event) => {
		setQuery(event.target.value);
	};
	if (!token) return <p></p>;
	return (
		<>
			{!data?.length ? (
				<div>
					<p>
						Your list is empty. Click the add item button to start your list.
					</p>
					<button onClick={() => navigate('/add-item')}>Add Item</button>
				</div>
			) : (
				<>
					<div>
						<label htmlFor="query">Filter your list</label>
						<input
							id="query"
							value={query}
							onChange={handleChange}
							name="query"
						/>
						{query ? <button onClick={() => setQuery('')}>Clear</button> : null}
					</div>
					<ul>
						{data
							.filter((item) =>
								item.name.toLowerCase().includes(query.toLowerCase()),
							)
							.map((item) => (
								<ListItem
									key={item.id}
									name={item.name}
									itemId={item.id}
									dateLastPurchased={item.dateLastPurchased}
								/>
							))}
					</ul>
					<div>
						<p>
							Use the token{' '}
							<em style={{ textDecoration: 'underline' }}>{token}</em> to share
							your shopping list
						</p>
					</div>
				</>
			)}
		</>
	);
}
