import { updateItem } from '../api/firebase';
import './ListItem.css';
import { useState, useEffect } from 'react';
//TODO: mark as purchased feature
export function ListItem({ name, itemId, dateLastPurchased }) {
	const [checked, setChecked] = useState(false);

	useEffect(() => {
		const date = new Date();
		let purchasedonDate = dateLastPurchased
			? dateLastPurchased.toDate()
			: dateLastPurchased;
		const currentTime = Date.now();
		const diff = currentTime - purchasedonDate;
		if (diff > 1000 * 60 * 60 * 24) {
			setChecked(false);
		}
	}, [dateLastPurchased]);

	const handlecheck = async (err) => {
		const listId = localStorage.getItem('tcl-shopping-list-token');
		setChecked((ischeck) => {
			updateItem(listId, itemId, !ischeck, dateLastPurchased);
			return !ischeck;
		});
	};

	return (
		<li className="ListItem">
			<label>
				<input
					value={name}
					type="checkbox"
					onChange={handlecheck}
					checked={checked}
					disabled={checked}
				/>
			</label>
			{name}
		</li>
	);
}
