import { forwardRef } from 'react';
import PropTypes from 'prop-types';

import styles from './Message.module.css';

const Message = forwardRef((props, ref) => {
	// const timeFormat = new Intl.DateTimeFormat('es', {
	// 	timeStyle: 'medium',
	// 	dateStyle: 'short',
	// });

	const isUser = props.currentUser === props.user;

	const containerStyles = [styles.messageContainer];
	if (isUser) {
		containerStyles.push(styles.isUser);
	}
	return (
		<div className={containerStyles.join(' ')} ref={ref}>
			<div className={styles.infoContainer}>
				<span className={styles.user}>{!isUser && props.user}</span>
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
