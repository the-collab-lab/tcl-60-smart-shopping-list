import { Outlet, NavLink } from 'react-router-dom';
import { useState } from 'react';
import './Layout.css';
import { DarkMode } from '../components/DarkModeToggle';

export function Layout({ token }) {
	const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)');
	const [isChecked, setChecked] = useState(prefersDarkMode.matches);
	const onChange = () => {
		setChecked((prevChecked) => !prevChecked);
	};
	return (
		<>
			<div className="Layout" id={isChecked ? 'theme-dark' : 'theme-light'}>
				<header className="Layout-header">
					<h1>Smart shopping list</h1>
					<div id="dark-mode-switcher">
						<DarkMode isChecked={isChecked} onChange={onChange} />
					</div>
				</header>
				<main className="Layout-main">
					<Outlet />
				</main>
				<nav className="Nav">
					<NavLink to="/" className="Nav-link">
						Home
					</NavLink>
					{token ? (
						<>
							<NavLink to="/list" className="Nav-link">
								List
							</NavLink>
							<NavLink to="/add-item" className="Nav-link">
								Add Item
							</NavLink>
						</>
					) : null}
				</nav>
			</div>
		</>
	);
}
