import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function SwitchList({clearListToken}) {
	const navigate = useNavigate();
    
	React.useEffect(() => {
		setTimeout(() => {
			clearListToken()
			navigate('/');
		}, 1000);
	}, [navigate]);

	return <p style={{textAlign: "center"}}>Redirecting to home...</p>;
}
