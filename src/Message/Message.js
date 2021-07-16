import { forwardRef } from 'react';
import PropTypes from 'prop-types';

import { Card, CardContent, Typography } from '@material-ui/core';

import styles from './Message.module.css';

const Message = forwardRef((props, ref) => {
	// const timeFormat = new Intl.DateTimeFormat('es', {
	// 	timeStyle: 'medium',
	// 	dateStyle: 'short',
	// });

	const containerStyles = [styles.messageContainer];
	if (props.currentUser === props.user) {
		containerStyles.push(styles.isUser);
	}
	return (
		<div className={containerStyles.join(' ')} ref={ref}>
			<div className={styles.infoContainer}>
				<span className={styles.user}>{props.user}</span>
				{/* <span className={styles.timestamp}>{props.timestamp}</span> */}
			</div>

			<div className={styles.messageCard}>
				<span className={styles.text}>{props.children}</span>
			</div>
		</div>
	);
});

Message.propTypes = {
	user: PropTypes.string,
};

export default Message;
