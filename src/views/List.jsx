import { ListItem } from '../components';
import { useState } from 'react';

export function List({ data }) {
	const [query, setQuery] = useState('');
	const onChange = (e) => {
		setQuery(e.target.value);
	};
	return (
		<>
			<p>
				Hello from the <code>/list</code> page!
				<div>
					<label htmlFor="query">Filter your list</label>
					<input id="query" value={query} onChange={onChange} name="query" />
				</div>
			</p>
			<ul>
				{/*TODO: Filter */}
				{data
					.filter((item) =>
						item.name.toLowerCase().includes(query.toLowerCase()),
					)
					.map((item) => (
						<ListItem key={item.id} name={item.name} />
					))}
			</ul>
		</>
	);
}
