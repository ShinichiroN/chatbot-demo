import React from 'react';
import './assets/styles/style.css';
import defaultDataset from './dataset';
import { AnswersList, Chats } from './components/index';

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
    // datasetに入っている情報をkeyを指定して引っ張ってくる 初回は keyは'init'
    const initDataset = this.state.dataset[this.state.currentId];

    // currentIdに対応するanswersのデータを格納する
    const initAnswer = initDataset.answers;

    this.setState({
      answers : initAnswer
    })
  }

  // chatsにデータを格納する関数
  initChats = () => {
    // datasetに入っている情報をkeyを指定して引っ張ってくる 初回は keyは'init'
    const initDataset = this.state.dataset[this.state.currentId];

    // questionとanswersのどちらを取得すればいいのか
    const chat = {
      text: initDataset.question,
      type: 'question' 
    };

    // propsで渡す用の変数用意
    const chats = this.state.chats;

    // chatsを更新 pushする理由は、過去のやつも積み重ねて表示するから　
    chats.push(chat)
    this.setState({
      chats : chats
    })
  }
  
  // initAnswerの呼び出し レンダリング走った後、実行される
  // stateが変わるのでレンダリングが走り、initAnswerによって、stateのanswersの中身が更新される
  componentDidMount() {
    this.initChats();
    this.initAnswer();

  }

  render() {
    return (
      <section className="c-section">
        <div className="c-box">
          {/* チャットを表示するコンポーネント */}
          <Chats chats={ this.state.chats }/>

          {/* 回答郡を表示するコンポーネント */}
          <AnswersList answers={this.state.answers}/>

        </div>
      </section>
    );
  }
}
