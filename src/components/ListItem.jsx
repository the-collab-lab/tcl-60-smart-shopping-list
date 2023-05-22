import { updateItem } from '../api/firebase';
import './ListItem.css';
import { useState, useEffect } from 'react';
import { deleteItem } from '../api/firebase';

import Modal from 'react-modal';
Modal.setAppElement('#root');

export function ListItem({ name, itemId, dateLastPurchased, urgency }) {
	const [checked, setChecked] = useState(false);
	const [modalStatus, setModalStatus] = useState(false);

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
	const openModal = async () => {
		setModalStatus(true);
	};

	const closeModal = async () => {
		setModalStatus(false);
	};

	const handleDelete = async () => {
		console.log(modalStatus);

		try {
			await deleteItem(listId, itemId);
			setModalStatus(false);
		} catch (error) {
			console.error('An error occurred while deleting the item: ', error);
		}
	};

	return (
		<li className={`ListItem ${checked ? 'checked' : ''}`}>
			<input
				value={name}
				id={name}
				type="checkbox"
				onChange={handlecheck}
				checked={checked}
				disabled={checked}
			/>

			<label htmlFor={name}>{name}</label>
			<button type="button" onClick={openModal}>
				Delete
			</button>
			{/* modal  */}
			<Modal
				style={{
					content: {
						color: 'black', // Add the desired color here
					},
				}}
				isOpen={modalStatus}
				onRequestClose={closeModal}
			>
				<h2>Are you sure you want to delete?</h2>
				<p>Press confirm if yes, press cancel to go back</p>
				<div>
					<button onClick={handleDelete}>Confirm</button>
					<button onClick={closeModal}>Cancel</button>
				</div>
			</Modal>
		</li>
	);
}
