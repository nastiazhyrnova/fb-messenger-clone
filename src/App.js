import { useState, useRef, useEffect } from 'react';
import firebase from 'firebase';
import {
	Button,
	FormControl,
	InputLabel,
	Input,
	FormHelperText,
	Card,
	CardContent,
} from '@material-ui/core';
import db from './firebase';

import styles from './App.module.css';
import Message from './Message/Message';

const App = _ => {
	const inputRef = useRef();
	const [messages, setMessages] = useState([]);
	const [error, setError] = useState(null);
	const [username, setUsername] = useState('');

	// const timeFormat = new Intl.DateTimeFormat('es', {
	// 	timeStyle: 'medium',
	// 	dateStyle: 'short',
	// });

	useEffect(
		_ => {
			db.collection('messages')
				.orderBy('timestamp', 'asc')
				.onSnapshot(snapshot =>
					setMessages(snapshot.docs.map(doc => doc.data()))
				);
			console.log('snapshop');
			//on every change of the db
			// window.scrollTo(0, 0);
		},

		[]
	);

	useEffect(_ => {
		const name = prompt('Please enter your username');
		setUsername(name);
	}, []);

	const sendMessage = e => {
		e.preventDefault();
		if (inputRef.current.value.trim().length > 0) {
			setError(null);

			db.collection('messages').add({
				username: username,
				text: inputRef.current.value,
				timestamp: firebase.firestore.FieldValue.serverTimestamp(),
			});
			console.log('message added');
			inputRef.current.value = '';
		} else {
			setError('Your message is empty');
		}
	};

	const output = messages.map(message => {
		return (
			<Message
				key={Math.random()}
				timestamp={message.timestamp}
				currentUser={username}
				user={message.username}>
				{message.text}
			</Message>
		);
	});

	return (
		<div className={styles.mainContainer}>
			<h1>Facebook Messenger</h1>

			<div className={styles.messagesContainer}>{output}</div>
			<form>
				<FormControl className={styles.formControl}>
					<div className={styles.inputContainer}>
						<InputLabel>Enter a message</InputLabel>
						<Input type='text' inputRef={inputRef} className={styles.input} />
						{error && <FormHelperText>{error}</FormHelperText>}
					</div>

					<Button
						variant='contained'
						color='primary'
						type='submit'
						className={styles.button}
						onClick={sendMessage}>
						Send message
					</Button>
				</FormControl>
			</form>
		</div>
	);
};

export default App;
