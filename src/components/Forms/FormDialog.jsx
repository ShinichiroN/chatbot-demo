import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextInput from './TextInput';

export default class FormDialog extends React.Component{
	/* functional componentの記述なので使えない
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
	  setOpen(true);
	};
  
	const handleClose = () => {
	  setOpen(false);
	};
	*/

	// stateの定義
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			email: "",
			description: ""
		}

		this.inputName = this.inputName.bind(this);
		this.inputEmail = this.inputEmail.bind(this);
		this.inputDescription = this.inputDescription.bind(this);
	}

	inputName = (event) => {
		console.log(event.target.value);
		this.setState({
			name: event.target.value
		})
	}

	inputEmail = (event) => {
		this.setState({
			email: event.target.value
		})
	}

	inputDescription = (event) => {
		this.setState({
			description: event.target.value
		})
	}

	// フォームを送信するときの処理
	submitForm = () => {
		const name = this.state.name;
		const email = this.state.email;
		const description = this.state.description;
		
		// Slack通知
		// 送付する内容 object型で詰める
		const payload = {
			text:
				'お問い合わせがありました\n' +
				'お名前：' + name + '\n' +
				'Email：' + email + '\n' +
				'お問い合わせ内容：' + description
		};

		// slackのwebhookURL
		const url = 'https://hooks.slack.com/services/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';

		// SlackAPIに内容を送信
		fetch(
			url,
			{
				method: "POST",
				body: JSON.stringify(payload)
			}
		).then(
			() => {
				// ブラウザ上　画面上部にダイアログが表示される
				alert('送信が完了しました');

				// 再度開いた時に入力値が保持されてしまっているので初期化する
				this.setState({
					name: "",
					email: "",
					description: ""
				});
				return this.props.handleClose();
			}
		)
	}

	render() {
		return (
			<Dialog
			    // open: trueの時に開く
				// onClose: その関数が実行された時に閉じる
				open={this.props.open}
				onClose={this.props.handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
            >
				<DialogTitle id="alert-dialog-title">問い合わせフォーム</DialogTitle>
				<DialogContent>
					<TextInput label={'お名前(必須)'} multiline={false} rows={1}
						value={this.state.name} type={"text"} onChange={this.inputName}
					/>
					<TextInput label={'メールアドレス（必須）'} multiline={false} rows={1}
						value={this.state.email} type={"email"} onChange={this.inputEmail}
					/>
					<TextInput label={'お問い合わせ内容(必須)'} multiline={true} rows={3}
						value={this.state.description} type={"text"} onChange={this.inputDescription}
					/>
				</DialogContent>
				<DialogActions>
				<Button onClick={this.props.handleClose} color="primary">
					キャンセル
				</Button>
				<Button onClick={this.submitForm} color="primary" autoFocus>
					送信する
				</Button>
				</DialogActions>
            </Dialog>

		)
	}
}
