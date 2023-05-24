import './DarkModeToggle.css';
import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs';

export function DarkMode({ isChecked, onChange }) {
	return (
		<>
			<label id="switch">
				<input
					type="checkbox"
					id="dark-mode"
					onChange={onChange}
					checked={isChecked}
					aria-checked={isChecked}
					role="switch"
					aria-labelledby="switch-label"
				/>
				<span id="slider">
					<BsFillMoonFill data-icon="dark" />
					<BsFillSunFill data-icon="light" />
				</span>
			</label>
			<span id="switch-label">{isChecked ? 'Dark Mode' : 'Light Mode'}</span>
		</>
		// <label htmlFor="dark-mode" className="switch">
		// 	<input
		// 		id="dark-mode"
		// 		type="checkbox"
		// 		role="switch"
		// 		data-on="Dark"
		// 		checked={isChecked}
		// 		data-off="Light"
		// 		onChange={onChange}
		// 		aria-checked={isChecked}
		// 	/>
		// 	<span id="slider">
		// 		<BsFillMoonFill />
		// 		<BsFillSunFill />
		// 	</span>
		// 	{isChecked ? 'Dark Mode' : 'Light Mode'}
		// </label>
	);
}
