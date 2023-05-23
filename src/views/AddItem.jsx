import React, { useState, useEffect } from 'react';
import { addItem } from '../api/firebase';
import { useNavigate } from 'react-router-dom';
import './AddItem.css';
import toast from 'react-hot-toast';

export function AddItem({ data, token }) {
	const navigate = useNavigate();
	useEffect(() => {
		if (!token) navigate('/');
		// disable warning that navigate should be a dependency
		// eslint-disable-next-line
	}, [token]);
	const [formData, setFormData] = useState({
		itemName: '',
		daysUntilNextPurchase: '',
	});

	function normalizeName(itemName) {
		if (!itemName) return '';
		return itemName.toLowerCase().replace(/[^\p{Letter}\p{Mark}0-9]+/gu, '');
	}

	function validateFormData(formData) {
		const matchExistingItem = data.some(
			(item) => normalizeName(item.name) === normalizeName(formData.itemName),
		);

		if (!formData.itemName) {
			return { valid: false, message: 'Please enter an item name' };
		} else if (!formData.daysUntilNextPurchase) {
			return {
				valid: false,
				message: 'Please choose how soon you will need to purchase',
			};
		} else if (matchExistingItem) {
			return {
				valid: false,
				message: `${formData.itemName} is already present in the list`,
			};
		}
		return {
			valid: true,
			data: {
				itemName: formData.itemName,
				daysUntilNextPurchase: Number(formData.daysUntilNextPurchase),
			},
		};
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

	const radioButtons = document.querySelectorAll('.denote');
	const labels = document.querySelectorAll('denote');

	radioButtons.forEach((radioButton) => {
		radioButton.addEventListener('change', () => {
			labels.forEach((label) => {
				if (label.htmlFor === radioButton.id) {
					if (radioButton.checked) {
						label.classList.add('changebg'); // Add the class if the radio button is selected
					} else {
						label.classList.remove('changebg'); // Remove the class if the radio button is not selected
					}
				}
			});
		});
	});

	async function handleSubmit(event) {
		event.preventDefault();
		const validatedData = validateFormData(formData);
		if (!validatedData.valid) {
			toast.error(validatedData.message);
		} else {
			toast.promise(addItem(token, validatedData.data), {
				loading: 'Loading',
				success: `${formData.itemName} has been added to the list`,
				error: 'An error occurred. Please try again later',
			});

			// Clear the form after successful submission
			setFormData({
				itemName: '',
				daysUntilNextPurchase: '',
			});
		}
	}
	if (!token) return <p></p>;
	return (
		<>
			<form className="chooseform" onSubmit={handleSubmit}>
				<label htmlFor="itemName" className="addit">
					Item name:
				</label>
				<br />
				<input
					className="searchname"
					type="text"
					id="itemName"
					onChange={handleChange}
					name="itemName"
					value={formData.itemName}
				/>
				<div className="choose">
					<input
						className="radio"
						id="sevenDays datenday"
						name="daysUntilNextPurchase"
						type="radio"
						value="7"
						checked={formData.daysUntilNextPurchase === '7'}
						onChange={handleChange}
					/>
					<label htmlFor="sevenDays" id="denote" className="denote">
						Soon
					</label>
					<input
						className="radio"
						id="forteenDays datenday"
						name="daysUntilNextPurchase"
						type="radio"
						value="14"
						checked={formData.daysUntilNextPurchase === '14'}
						onChange={handleChange}
					/>
					<label htmlFor="forteenDays" id="denote" className="denote">
						Kind of soon
					</label>
					<input
						className="radio"
						id="thirtyDays datenday"
						name="daysUntilNextPurchase"
						type="radio"
						value="30"
						checked={formData.daysUntilNextPurchase === '30'}
						onChange={handleChange}
					/>
					<label htmlFor="thirtyDays" id="denote" className="denote">
						Not so soon
					</label>
				</div>
				<div className="btn">
					<button>Submit</button>
				</div>
			</form>
		</>
	);
}
