import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

const Chat = (props) => {
	return (
		<ListItem>
			<ListItemAvatar>
				<Avatar alt="icon" src="/static/images/avatar/1.jpg" />
			</ListItemAvatar>

			{/* チャット本文の表示 (左から出てくるか右から出てくるかはクラスで制御) */}
			<div className="p-chat__bubble">
				{ props.text}
			</div>
		</ListItem>

	);
}

export default Chat;