import React from 'react';

export function AddItem() {
	const [formData, setFormData] = React.useState({
		itemName: '',
		daysUntilNextPurchase: '',
	});

	function handleChange(event) {
		event.preventDefault();

		console.log('Something changed');
	}
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
							type="radio"
							value="14"
							checked={formData.daysUntilNextPurchase === '14'}
							name=""
							onChange={handleChange}
						/>
						Kind of soon
					</label>
					<label>
						<input
							id="30days"
							type="radio"
							value="30"
							checked={formData.daysUntilNextPurchase === '30'}
							name="soon"
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
