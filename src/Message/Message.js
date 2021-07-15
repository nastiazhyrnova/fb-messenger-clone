import PropTypes from 'prop-types';

import { Card, CardContent, Typography } from '@material-ui/core';

import styles from './Message.module.css';

const Message = props => {
	// const timeFormat = new Intl.DateTimeFormat('es', {
	// 	timeStyle: 'medium',
	// 	dateStyle: 'short',
	// });

	const containerStyles = [styles.messageCard];
	if (props.currentUser === props.user) {
		containerStyles.push(styles.isUser);
	}
	return (
		<>
			<div className={containerStyles.join(' ')}>
				<div className={styles.infoContainer}>
					<span className={styles.user}>{props.user}</span>
					{/* <span className={styles.timestamp}>{props.timestamp}</span> */}
				</div>

				<Card className={styles.messageCard}>
					<CardContent className={styles.cardContent}>
						<Typography className={styles.typography}>
							<span className={styles.text}>{props.children}</span>
						</Typography>
					</CardContent>
				</Card>
			</div>
		</>
	);
};

Message.propTypes = {
	user: PropTypes.string,
};

export default Message;
