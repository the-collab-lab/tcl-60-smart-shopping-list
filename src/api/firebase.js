import {
	collection,
	onSnapshot,
	addDoc,
	getDocs,
	getDoc,
	updateDoc,
	doc,
} from 'firebase/firestore';
import { db } from './config';
import { getFutureDate, getDaysBetweenDates } from '../utils';
import { calculateEstimate } from '@the-collab-lab/shopping-list-utils';

/**
 * Subscribe to changes on a specific list in the Firestore database (listId), and run a callback (handleSuccess) every time a change happens.
 * @param {string} listId The user's list token
 * @param {Function} handleSuccess The callback function to call when we get a successful update from the database.
 * @returns {Function}
 *
 * @see https://firebase.google.com/docs/firestore/query-data/listen
 */
export function streamListItems(listId, handleSuccess) {
	const listCollectionRef = collection(db, listId);
	return onSnapshot(listCollectionRef, handleSuccess);
}

/**
 * Read the information from the provided snapshot and return an array
 * that can be stored in our React state.
 * @param {Object} snapshot A special Firebase document with information about the current state of the database.
 * @returns {Object[]} An array of objects representing the user's list.
 */
export function getItemData(snapshot) {
	/**
	 * Firebase document snapshots contain a `.docs` property that is an array of
	 * document references. We use `.map()` to iterate over them.
	 * @see https://firebase.google.com/docs/reference/js/firestore_.documentsnapshot
	 */
	let result = snapshot.docs.map((docRef) => {
		/**
		 * We call the `.data()` method to get the data
		 * out of the referenced document
		 */
		const data = docRef.data();

		/**
		 * The document's ID is not part of the data, but it's very useful
		 * so we get it from the document reference.
		 */
		data.id = docRef.id;

		return data;
	});
	comparePurchaseUrgency(result);
	return result;
}

/**
 * Add a new item to the user's list in Firestore.
 * @param {string} listId The id of the list we're adding to.
 * @param {Object} itemData Information about the new item.
 * @param {string} itemData.itemName The name of the item.
 * @param {number} itemData.daysUntilNextPurchase The number of days until the user thinks they'll need to buy the item again.
 */
export async function addItem(listId, { itemName, daysUntilNextPurchase }) {
	const listCollectionRef = collection(db, listId);
	// TODO: Replace this call to console.log with the appropriate
	// Firebase function, so this information is sent to your database!
	return addDoc(listCollectionRef, {
		dateCreated: new Date(),
		// NOTE: This is null because the item has just been created.
		// We'll use updateItem to put a Date here when the item is purchased!
		dateLastPurchased: null,
		dateNextPurchased: getFutureDate(daysUntilNextPurchase),
		name: itemName,
		totalPurchases: 0,
	});
}

export async function updateItem(listId, itemId) {
	/**
	 * Firestore function to update an existing item.
	 */
	const itemRef = doc(db, listId, itemId);
	const itemSnap = await getDoc(itemRef);
	let { totalPurchases, dateLastPurchased, dateCreated, dateNextPurchased } =
		itemSnap.data();

	function calculateDateNextPurchased() {
		const dateLastUpdated = dateLastPurchased || dateCreated;
		const previousEstimate = getDaysBetweenDates(
			dateNextPurchased.toDate(),
			dateLastUpdated.toDate(),
		);
		const daysSinceLastPurchase = getDaysBetweenDates(
			new Date(),
			dateLastUpdated.toDate(),
		);
		const calculatedDateNextPurchased = new Date(
			new Date().getTime() +
				calculateEstimate(
					previousEstimate,
					daysSinceLastPurchase,
					totalPurchases,
				) *
					86400000,
		);
		return calculatedDateNextPurchased;
	}

	await updateDoc(itemRef, {
		totalPurchases: totalPurchases + 1,
		dateLastPurchased: new Date(),
		dateNextPurchased: calculateDateNextPurchased(),
	});
}

export async function deleteItem() {
	/**
	 * TODO: Fill this out so that it uses the correct Firestore function
	 * to delete an existing item. You'll need to figure out what arguments
	 * this function must accept!
	 */
}

export async function checkItem(listId) {
	const listCollectionRef = collection(db, listId);
	const existingList = await getDocs(listCollectionRef, undefined);
	return existingList.empty ? false : true;
}

export async function comparePurchaseUrgency(shoppingList) {
	shoppingList.forEach((item) => {
		// create urgency indicator
		if (item.dateNextPurchased != null) {
			let daysDiff = getDaysBetweenDates(
				item.dateNextPurchased.toDate().getTime(),
				new Date().getTime(),
			);
			if (daysDiff >= 30) {
				item.urgency = 'Not soon';
			} else if (daysDiff >= 7) {
				item.urgency = 'Kind of Soon';
			} else if (daysDiff >= 0) {
				item.urgency = 'Soon';
			} else if (daysDiff <= -1) {
				item.urgency = 'Overdue';
			}
		}

		if (item.dateLastPurchased != null) {
			if (
				getDaysBetweenDates(
					new Date().getTime(),
					item.dateLastPurchased.toDate().getTime(),
				) >= 60
			) {
				item.urgency = 'inactive';
			}
		}
	});
}
