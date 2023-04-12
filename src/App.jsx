import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { AddItem, Home, Layout, List } from './views';

import { getItemData, streamListItems } from './api';
import { useStateWithStorage } from './utils';
import { generateToken } from '@the-collab-lab/shopping-list-utils';

/*
->We need to allow users to start new lists, so they can save the things they need to buy. We need to generate a unique token, save it to localstorage and show the list view to the user.
->For the users already having a token will automatically redirect to the list view.
->For the users not having a token, a button in the home component will allow them to create a new list by generating a token and saving it to localstorage along with redirecting to the list view.
*/

export function App() {
	const [data, setData] = useState([]);

	/**
	 * Here, we're using a custom hook to create `listToken` and a function
	 * that can be used to update `listToken` later.
	 *
	 * `listToken` is `my test list` by default so you can see the list
	 * of items that was prepopulated for this project.
	 * You'll later set it to `null` by default (since new users do not
	 * have tokens), and use `setListToken` when you allow a user
	 * to create and join a new list.
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
	}, [listToken, setListToken]);

	return (
		<Router>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route
						index
						element={<Home setNewToken={setNewToken} token={listToken} />}
					/>
					<Route path="/list" element={<List data={data} />} />
					<Route path="/add-item" element={<AddItem />} />
				</Route>
			</Routes>
		</Router>
	);
}
