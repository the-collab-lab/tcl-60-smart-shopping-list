import { ListItem } from '../components';

export function List({ data, token }) {
	return (
		<>
			<p>
				Hello from the <code>/list</code> page!
			</p>
			<ul>
				{data.map((item, index) => (
					<ListItem key={index} name={item.name} />
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
