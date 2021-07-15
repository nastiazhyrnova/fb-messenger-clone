import React from 'react';
import PropTypes from 'prop-types';

const Message = props => {
	return <h2>{props.children}</h2>;
};

Message.propTypes = {
	// timeStamp: PropTypes.object,
};

export default Message;
