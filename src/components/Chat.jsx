import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import NoProfile from '../assets/img/no-profile.png';
import Torahack from '../assets/img/torahack.png';

const Chat = (props) => {
	// 質問なのか回答を得た結果を表示するのかを判定するフラグ
	const isQuestion = (props.type === 'question');
	// 左から出るか右から出るか　クラス名を選択
	const classes = isQuestion ? 'p-chat__row' : 'p-chat__reverse';
	return (
		<ListItem className={ classes }>
			<ListItemAvatar>
				{isQuestion ? (
					<Avatar alt="icon" src={ Torahack } />
				): (
					<Avatar alt="icon" src={ NoProfile } />
				)}
			</ListItemAvatar>

			{/* チャット本文の表示 (左から出てくるか右から出てくるかはクラスで制御) */}
			<div className="p-chat__bubble">
				{ props.text}
			</div>
		</ListItem>

	);
}

export default Chat;