import { ListItem } from '../components';
import { useState } from 'react';

export function List({ data, token }) {
	const [query, setQuery] = useState('');
	const handleChange = (event) => {
		setQuery(event.target.value);
	};
	return (
		<>
			<p>
				Hello from the <code>/list</code> page!
			</p>
			<div>
				<label htmlFor="query">Filter your list</label>
				<input id="query" value={query} onChange={handleChange} name="query" />
				{query ? <button onClick={() => setQuery('')}>Clear</button> : null}
			</div>
			<ul>
				{data
					.filter((item) =>
						item.name.toLowerCase().includes(query.toLowerCase()),
					)
					.map((item) => (
						<ListItem key={item.id} name={item.name} />
					))}
			</ul>
			<div>
				<p>
					Use the token <em style={{ textDecoration: 'underline' }}>{token}</em>{' '}
					to share your shopping list
				</p>
			</div>
		</>
	);
}
