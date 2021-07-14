import React from 'react';
import { Answer } from './index'

// 関数コンポーネントで記述
const AnswersList = (props) => {
	return( 
	    <div className="c-grid__answer"> 
		    {/* 回答の選択肢は複数あるので、answersをmapで展開する */}
			{props.answers.map((value, index) => {
				// Reactでは、複数同じコンポーネントを使う場合は、keyという属性にindexを渡してあげないといけない決まり 
				return <Answer content={value.content} key={ index.toString() } />
			})}
		</div>
	);
}

export default AnswersList;