import React, { useState } from 'react';
import { addItem } from '../api/firebase';

export function AddItem({ data }) {
	const [formData, setFormData] = useState({
		itemName: '',
		daysUntilNextPurchase: '',
	});
	const [submissionStatus, setSubmissionStatus] = useState('');
	const [showMessage, setShowMessage] = useState(false);

	const itemregex = /[^a-zA-Z0-9]+/g;

	const Notify = (itemName) => {
		const regItem = itemName.toLowerCase().replace(itemregex, '');
		setSubmissionStatus(` ${regItem} is already present in the list`);
	};

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

		const matchItem = data.some((item) => {
			return (
				item.name &&
				item.name.toLowerCase().replaceAll(itemregex, '') ===
					formData.itemName.toLowerCase().replaceAll(itemregex, '')
			);
		});

		if (matchItem) {
			Notify(formData.itemName);
			return;
		}

		if (formData.itemName && formData.daysUntilNextPurchase) {
			try {
				const convertedFormData = {
					itemName: formData.itemName,
					daysUntilNextPurchase: Number(formData.daysUntilNextPurchase),
				};
				await addItem(listToken, convertedFormData);
				setSubmissionStatus('Item has been added to the list');

				// Clear the form after successful submission
				setFormData({
					itemName: '',
					daysUntilNextPurchase: '',
				});
			} catch (err) {
				setSubmissionStatus('An error encountered');
			}
		} else {
			setSubmissionStatus('Please enter valid inputs');
		}

		setTimeout(() => setShowMessage(false), 3000);
	}

	return (
		<>
			<p>
				Hello from the <code>/add-item</code> page!
			</p>
			<form onSubmit={handleSubmit}>
				{/*  TODO: prevent users from entering blank/duplicate items  */}
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
