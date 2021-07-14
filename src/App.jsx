import React from 'react';
import './assets/styles/style.css';
import defaultDataset from './dataset';
import { AnswersList } from './components/index';

export default class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      answers: [],              //回答を表示するデータ
      chats:[],                 // チャットコンポーネントに表示するデータ
      currentId: "init",        // 現在の質問ID
      dataset: defaultDataset,  // 質問と回答のデータセット　DBから取得したデータを想定
      open: false               // 問い合わせフォーム用モーダルの開閉
    }
  }
  
  // answerにデータを格納する関数
  initAnswer = () => {
    // datasetに入っているanswersの情報をkeyを指定して引っ張ってくる 初回は keyは'init'
    const initDataset = this.state.dataset[this.state.currentId];

    // currentIdに対応するanswersのデータを格納する
    const initAnswer = initDataset.answers;

    this.setState({
      answers : initAnswer
    })
  }
  
  // initAnswerの呼び出し レンダリング走った後、実行される
  // stateが変わるのでレンダリングが走り、initAnswerによって、stateのanswersの中身が更新される
  componentDidMount() {
    this.initAnswer()

  }

  render() {
    return (
      <section className="c-section">
        <div className="c-box">
          {/* 回答郡を表示するコンポーネント */}
          <AnswersList answers={this.state.answers}/>

          {/* チャットを表示するコンポーネント */}

        </div>
      </section>
    );
  }
}
