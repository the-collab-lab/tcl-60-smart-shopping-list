import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function SwitchList() {
	const navigate = useNavigate();

	React.useEffect(() => {
		setTimeout(() => {
			localStorage.removeItem('tcl-shopping-list-token');
			navigate('/');
		}, 3000);
	}, []);

	return <p>Redirecting to home...</p>;
}
