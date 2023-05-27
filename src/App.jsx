import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AddItem, Home, Layout, List } from './views';

import { getItemData, streamListItems } from './api';
import { useStateWithStorage } from './utils';
import { generateToken } from '@the-collab-lab/shopping-list-utils';
import SwitchList from './views/SwitchList';

export function App() {
	const [data, setData] = useState([]);

	/**
	 * Here, we're using a custom hook to create `listToken` and a function
	 * that can be used to update `listToken` later.
	 * This hook handles saving to and retrieving from localStorage.
	 */
	const [listToken, setListToken] = useStateWithStorage(
		null,
		'tcl-shopping-list-token',
	);

	function setNewToken() {
		setListToken(generateToken());
	}
	
	function clearListToken() {
		setListToken(null);
	}

	useEffect(() => {
		if (!listToken) return;
		/**
		 * streamListItems` takes a `listToken` so it can commuinicate
		 * with our database, then calls a callback function with
		 * a `snapshot` from the database.
		 *
		 * Refer to `api/firebase.js`.
		 */
		return streamListItems(listToken, (snapshot) => {
			/**
			 * Here, we read the documents in the snapshot and do some work
			 * on them, so we can save them in our React state.
			 *
			 * Refer to `api/firebase.js`
			 */
			const nextData = getItemData(snapshot);

			/** Finally, we update our React state. */
			setData(nextData);
		});
	}, [listToken]);

	return (
		<>
			<Toaster
				position="bottom-right"
				reverseOrder={false}
				toastOptions={{
					// Define default options
					className: '',
					duration: 5000,
					style: {
						marginBottom: '9rem',
						background: '#FEFAE0',
						color: '#13310D',
					},

					// Default options for specific types
					success: {
						duration: 3000,
						theme: {
							primary: 'green',
							secondary: 'black',
						},
					},
				}}
			/>
			<Router>
				<Routes>
					<Route path="/" element={<Layout token={listToken} />}>
						<Route
							index
							element={
								<Home
									setNewToken={setNewToken}
									token={listToken}
									setToken={setListToken}
								/>
							}
						/>
						<Route path="/switch-list" element={<SwitchList clearListToken={clearListToken}/>} />
						<Route
							path="/list"
							element={<List data={data} token={listToken} />}
						/>
						<Route
							path="/add-item"
							element={<AddItem data={data} token={listToken} />}
						/>
					</Route>
				</Routes>
			</Router>
		</>
	);
}
