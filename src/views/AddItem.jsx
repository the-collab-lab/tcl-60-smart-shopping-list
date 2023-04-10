import React from 'react';

export function AddItem() {
	const [formData, setFormData] = React.useState({
		itemName: '',
		daysUntilNextPurchase: '',
	});

	function handleChange(event) {
		const { name, value, type } = event.target;

		setFormData((prevFormData) => {
			return {
				...prevFormData,
				[name]: value,
			};
		});
	}
	console.log(formData);

	//handle submit function here

	return (
		<>
			<p>
				Hello from the <code>/add-item</code> page!
			</p>
			<form>
				<input
					type="text"
					onChange={handleChange}
					name="itemName"
					value={formData.itemName}
				/>

				<div>
					<label>
						<input
							id="7days"
							name="daysUntilNextPurchase"
							type="radio"
							value="7"
							checked={formData.daysUntilNextPurchase === '7'}
							onChange={handleChange}
						/>
						Soon
					</label>
					<label>
						<input
							id="14days"
							name="daysUntilNextPurchase"
							type="radio"
							value="14"
							checked={formData.daysUntilNextPurchase === '14'}
							onChange={handleChange}
						/>
						Kind of soon
					</label>
					<label>
						<input
							id="30days"
							name="daysUntilNextPurchase"
							type="radio"
							value="30"
							checked={formData.daysUntilNextPurchase === '30'}
							onChange={handleChange}
						/>
						Not so soon
					</label>
				</div>

				<button>Submit</button>
			</form>
		</>
	);
}
