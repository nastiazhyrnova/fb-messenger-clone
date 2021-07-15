import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
	apiKey: 'AIzaSyBTlWwXrWEJbvJdQHbSGnZ1_IyWOOtW_pc',
	authDomain: 'fb-messenger-clone-41cdf.firebaseapp.com',
	projectId: 'fb-messenger-clone-41cdf',
	storageBucket: 'fb-messenger-clone-41cdf.appspot.com',
	messagingSenderId: '422369358087',
	appId: '1:422369358087:web:2b95b5224ea642a52055a2',
});

const db = firebaseApp.firestore();

export default db;
