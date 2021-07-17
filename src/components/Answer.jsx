import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
	root: {

	},
}));

const Answer = (props) => {
	// const classes = useStyles();
	return (
		<Button variant="contained" color="primary" onClick={ ()=> props.select(props.content, props.nextId) }>
			{/* propsで受け取った回答名を挿入 */}
			{props.content}
		</Button>
	);
}

export default Answer;