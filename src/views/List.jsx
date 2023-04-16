import { ListItem } from '../components';
import { useState } from 'react';

export function List({ data }) {
	const [filter, setFilter] = useState();
	const onChange = (e) => {
		setFilter(e.target.value);
	};
	return (
		<>
			<p>
				Hello from the <code>/list</code> page!
				<div>
					<label htmlFor="filter">Filter your list</label>
					<input id="filter" value={filter} onChange={onChange} name="filter" />
				</div>
			</p>
			<ul>
				{/*TODO: Filter */}
				{data.map((item, index) => (
					<ListItem key={index} name={item.name} />
				))}
			</ul>
		</>
	);
}
