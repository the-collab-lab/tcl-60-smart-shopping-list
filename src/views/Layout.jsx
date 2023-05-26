import { Outlet, NavLink } from 'react-router-dom';
import { useState } from 'react';
import './Layout.css';
import { DarkMode } from '../components/DarkModeToggle';

export function Layout({ token }) {
	const handleSwitchToken = () => {
		localStorage.removeItem('tcl-shopping-list-token');
		window.location.replace('/');
	};

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
					{token ? (
						<>
							<button
								className="switch-btn Nav-link"
								onClick={handleSwitchToken}
							>
								Switch List
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
