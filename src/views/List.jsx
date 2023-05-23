import { ListItem } from '../components';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FiSearch } from 'react-icons/fi';
import './List.css';

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
		<div className="list-container">
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
						<div className="search-bar">
							<label htmlFor="query" className="filter-label">
								Filter your list
							</label>
							<input
								type="text"
								id="query"
								value={query}
								onChange={handleChange}
								name="query"
							/>
							<FiSearch className="fi-search-icon" />
						</div>
						{query ? <button onClick={() => setQuery('')}>Clear</button> : null}
					</div>
					<div className="token-copy">
						<p>
							Use the token{' '}
							<CopyToClipboard text={token}>
								<em style={{ textDecoration: 'underline', cursor: 'pointer' }}>
									{token}
								</em>
							</CopyToClipboard>{' '}
							to share your shopping list
						</p>
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
									urgency={item.urgency}
								/>
							))}
					</ul>
				</>
			)}
		</div>
	);
}
