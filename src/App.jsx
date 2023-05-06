import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { AddItem, Home, Layout, List } from './views';

import { getItemData, streamListItems } from './api';
import { useStateWithStorage } from './utils';
import { generateToken } from '@the-collab-lab/shopping-list-utils';

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
	);
}
