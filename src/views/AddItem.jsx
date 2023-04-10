import React from 'react';

export function AddItem() {
	const [formData, setFormData] = React.useState({
		itemName: '',
		daysUntilNextPurchase: '',
	});
	const [submissionStatus, setSubmissionStatus] = React.useState('');
	// const [isSubmitted, setIsSubmitted] = React.useState(false)

	function handleChange(event) {
		const { name, value } = event.target;

		setFormData((prevFormData) => {
			return {
				...prevFormData,
				[name]: value,
			};
		});
	}
	console.log(formData);

	//handle submit function here

	function handleSubmit(event) {
		event.preventDefault();
		if (formData.itemName !== '' && formData.daysUntilNextPurchase !== '') {
			console.log('SUbmitted');
			setSubmissionStatus('Form submitted');
			// setIsSubmitted(true)
		} else {
			setSubmissionStatus('invalid Inputs');
		}

		// setTimeout(() => setIsSubmitted(false), 5000)
	}

	return (
		<>
			<p>
				Hello from the <code>/add-item</code> page!
			</p>
			<form onSubmit={handleSubmit}>
				<label>
					Item name:
					<input
						type="text"
						onChange={handleChange}
						name="itemName"
						value={formData.itemName}
					/>
				</label>

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
				{submissionStatus === 'Form submitted' && (
					<p>Item has been added to list</p>
				)}
				{submissionStatus === 'invalid Inputs' && (
					<p>Please enter valid inputs</p>
				)}
				<button>Submit</button>
			</form>
		</>
	);
}
