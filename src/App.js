import {
	Button,
	FormControl,
	InputLabel,
	Input,
	FormHelperText,
} from '@material-ui/core';
import { useState, useRef } from 'react';

import styles from './App.module.css';
import Message from './Message/Message';

const App = _ => {
	const inputRef = useRef();
	const [messages, setMessages] = useState([]);
	const [error, setError] = useState(null);
	const [userName, setUserName] = useState('');

	const sendMessage = e => {
		e.preventDefault();
		if (inputRef.current.value.trim().length > 0) {
			setError(null);
			setMessages([...messages, inputRef.current.value]);
			inputRef.current.value = '';
		} else {
			setError('Your message is empty');
		}
	};

	const output = messages.map(message => {
		const timeStamp = new Date();
		return (
			<Message key={Math.random()} timeStamp={timeStamp}>
				{message}
			</Message>
		);
	});

	return (
		<div className='App'>
			<h1>Facebook Messenger</h1>

			<div className={styles.messagesContainer}>{output}</div>
			<form>
				<FormControl>
					<InputLabel>Enter a message</InputLabel>
					<Input type='text' inputRef={inputRef} />
					{error && <FormHelperText>{error}</FormHelperText>}
					<Button
						variant='contained'
						color='primary'
						type='submit'
						onClick={sendMessage}>
						Send message
					</Button>
				</FormControl>
			</form>
		</div>
	);
};

export default App;
