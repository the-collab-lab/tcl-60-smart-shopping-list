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

				<button>Submit</button>
			</form>
		</>
	);
}
