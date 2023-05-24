import { Outlet, NavLink } from 'react-router-dom';

import './Layout.css';

export function Layout({ token }) {
	const handleSwitchToken = () => {
		localStorage.removeItem('tcl-shopping-list-token');
		window.location.replace('/');
	};
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
							<button className="switch-btn" onClick={handleSwitchToken}>
								Switch Token
							</button>
							<NavLink to="/list" className="Nav-link">
								List
							</NavLink>
							<NavLink to="/add-item" className="Nav-link">
								Add Item
							</NavLink>
						</>
					) : (
						<NavLink to="/" className="Nav-link">
							Home
						</NavLink>
					)}
				</nav>
			</div>
		</>
	);
}
