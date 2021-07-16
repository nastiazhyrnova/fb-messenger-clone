import { useState, useRef, useEffect } from 'react';
import firebase from 'firebase';
import FlipMove from 'react-flip-move';
import Message from './Message/Message';
import { IconButton } from '@material-ui/core';
import db from './firebase';

import SendIcon from '@material-ui/icons/Send';
import styles from './App.module.css';

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
					setMessages(
						snapshot.docs.map(doc => ({ id: doc.id, message: doc.data() }))
					)
				);
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
			inputRef.current.value = '';
		} else {
			setError('Your message is empty');
		}
	};

	const output = messages.map(({ id, message }) => {
		return (
			<Message
				key={id}
				timestamp={message.timestamp}
				currentUser={username}
				user={message.username}>
				{message.text}
			</Message>
		);
	});

	return (
		<>
			<div className={styles.mainContainer}>
				<header>
					<h1>Facebook Messenger</h1>
				</header>

				<div className={styles.messagesContainer}>
					<FlipMove>{output}</FlipMove>
				</div>
				<form>
					<div className={styles.inputWrapper}>
						<input type='text' ref={inputRef} className={styles.input} />
						<button
							variant='contained'
							color='primary'
							type='submit'
							className={styles.button}
							onClick={sendMessage}>
							<IconButton className={styles.iconButton}>
								<SendIcon fontSize='small' className={styles.icon} />
							</IconButton>
						</button>
					</div>
				</form>
				{error && <p className={styles.error}>{error}</p>}
			</div>
		</>
	);
};

export default App;
