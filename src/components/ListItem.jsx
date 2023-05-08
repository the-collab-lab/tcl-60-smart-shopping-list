import { updateItem } from '../api/firebase';
import './ListItem.css';
import { useState, useEffect } from 'react';
import { deleteItem } from '../api/firebase';

export function ListItem({ name, itemId, dateLastPurchased }) {
	const [checked, setChecked] = useState(false);
	const listId = localStorage.getItem('tcl-shopping-list-token');

	useEffect(() => {
		let purchasedonDate = dateLastPurchased
			? dateLastPurchased.toDate()
			: dateLastPurchased;
		const currentTime = Date.now();
		const diff = currentTime - purchasedonDate;
		if (diff > 1000 * 60 * 60 * 24) {
			setChecked(false);
		} else setChecked(true);
	}, [dateLastPurchased]);

	const handlecheck = async () => {
		setChecked((ischeck) => {
			updateItem(listId, itemId);
			return !ischeck;
		});
	};

	return (
		<li className="ListItem">
			<input
				value={name}
				id={name}
				type="checkbox"
				onChange={handlecheck}
				checked={checked}
				disabled={checked}
			/>
			<label htmlFor={name}>{name}</label>
			<button
				onClick={() => {
					const confirmDelete = window.confirm('are you sure?');
					if (confirmDelete) deleteItem(listId, itemId);
				}}
			>
				Delete
			</button>
		</li>
	);
}
