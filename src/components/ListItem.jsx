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
		try {
			await updateItem(listId, itemId);
			setChecked(true);
		} catch (error) {
			console.error('Failed to update item:', error);
			setChecked(false);
		}
	};

	const handleDelete = async () => {
		try {
			const confirmDelete = window.confirm('Are you sure?');
			if (confirmDelete) {
				await deleteItem(listId, itemId);
			}
		} catch (error) {
			console.error('An error occurred while deleting the item: ', error);
		}
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
			<button type="button" onClick={handleDelete}>
				Delete
			</button>
		</li>
	);
}
