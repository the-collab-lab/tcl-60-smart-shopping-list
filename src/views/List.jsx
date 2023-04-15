import { ListItem } from '../components';

export function List({ data }) {
	return (
		<>
			<p>
				Hello from the <code>/list</code> page!
				{/*TODO: Input Field */}
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
