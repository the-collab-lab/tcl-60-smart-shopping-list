import React, { useState } from 'react';
import { addItem } from '../api/firebase';

export function AddItem({ data }) {
	const [formData, setFormData] = useState({
		itemName: '',
		daysUntilNextPurchase: '',
	});
	const [submissionStatus, setSubmissionStatus] = useState('');
	const [showMessage, setShowMessage] = useState(false);

	function normalizeName(itemName) {
		if (!itemName) return '';
		return itemName.toLowerCase().replace(/[^a-zA-Z0-9]+/g, '');
	}

	function handleChange(event) {
		const { name, value } = event.target;

		setFormData((prevFormData) => {
			return {
				...prevFormData,
				[name]: value,
			};
		});
	}

	const listToken = localStorage.getItem('tcl-shopping-list-token');

	async function handleSubmit(event) {
		event.preventDefault();
		setShowMessage(true);

		const matchExistingItem = data.some(
			(item) => normalizeName(item.name) === normalizeName(formData.itemName),
		);

		if (matchExistingItem) {
			setSubmissionStatus(
				`${formData.itemName} is already present in the list`,
			);
		} else if (!formData.itemName) {
			setSubmissionStatus('Please enter an item name');
		} else if (!formData.daysUntilNextPurchase) {
			setSubmissionStatus('Please choose how soon you will need to purchase');
		} else {
			try {
				const convertedFormData = {
					itemName: formData.itemName,
					daysUntilNextPurchase: Number(formData.daysUntilNextPurchase),
				};
				await addItem(listToken, convertedFormData);
				setSubmissionStatus(`${formData.itemName} has been added to the list`);

				// Clear the form after successful submission
				setFormData({
					itemName: '',
					daysUntilNextPurchase: '',
				});
			} catch (err) {
				setSubmissionStatus('An error occurred. Please try again later');
			}
		}

		setTimeout(() => setShowMessage(false), 3000);
	}

	return (
		<>
			<p>
				Hello from the <code>/add-item</code> page!
			</p>
			<form onSubmit={handleSubmit}>
				<label htmlFor="itemName">Item name:</label>
				<br />
				<input
					type="text"
					id="itemName"
					onChange={handleChange}
					name="itemName"
					value={formData.itemName}
				/>
				<div>
					<input
						id="sevenDays"
						name="daysUntilNextPurchase"
						type="radio"
						value="7"
						checked={formData.daysUntilNextPurchase === '7'}
						onChange={handleChange}
					/>
					<label htmlFor="sevenDays">Soon</label>
					<input
						id="forteenDays"
						name="daysUntilNextPurchase"
						type="radio"
						value="14"
						checked={formData.daysUntilNextPurchase === '14'}
						onChange={handleChange}
					/>
					<label htmlFor="forteenDays">Kind of soon</label>
					<input
						id="thirtyDays"
						name="daysUntilNextPurchase"
						type="radio"
						value="30"
						checked={formData.daysUntilNextPurchase === '30'}
						onChange={handleChange}
					/>
					<label htmlFor="thirtyDays">Not so soon</label>
				</div>
				<div>
					{showMessage ? <p>{submissionStatus}</p> : null}
					<button>Submit</button>
				</div>
			</form>
		</>
	);
}
