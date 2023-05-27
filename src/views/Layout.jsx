import { Outlet, NavLink } from 'react-router-dom';

import './Layout.css';

export function Layout({ token }) {
	return (
		<>
			<div className="Layout">
				<header className="Layout-header">
					<h1>Smart shopping list</h1>
				</header>
				<main className="Layout-main">
					<Outlet />
				</main>
				<nav className="Nav">
					{token ? (
						<>
							<NavLink to="/switch-list" className="Nav-link">
								Switch List
							</NavLink>
							<NavLink to="/list" className="Nav-link">
								List
							</NavLink>
							<NavLink to="/add-item" className="Nav-link">
								Add Item
							</NavLink>
						</>
					) : <NavLink to="/" className="Nav-link">
						Home
					</NavLink>}
				</nav>
			</div>
		</>
	);
}
