import './Home.css';

export function Home({ onClick }) {
	return (
		<div className="Home">
			<p>
				Hello from the home (<code>/</code>) page!
			</p>
			<button onClick={onClick}>New List</button>
		</div>
	);
}
