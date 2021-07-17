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
    this.selectAnswer = this.selectAnswer.bind(this);
  }
  
  // 選択後、次の質問を表示させるための関数
  displayNextQuestion = (nextQuestionId) => {
    const chats = this.state.chats;
    chats.push({
      text: this.state.dataset[nextQuestionId].question,
      type: 'question',
    })

    this.setState({
      answers: this.state.dataset[nextQuestionId].answers,
      chats: chats,
      currentId : nextQuestionId
    })
  }

  // 回答を選択してその回答結果を格納し、次の質問を表示する
  selectAnswer = ( selectedAnswer,nextQuestionId ) => {
    switch (true) {
      // 初回
      case (nextQuestionId === "init"):
        this.displayNextQuestion(nextQuestionId);
        break;

      //初回以外
      default:
        // propsで渡す用の変数用意
        const chats = this.state.chats;

        // chatsを更新 pushする理由は、過去のやつも積み重ねて表示するから　
        chats.push({
          text: selectedAnswer,
          type : 'answer'
        });

        // chatsに今の回答結果を貯めて再レンダリング
        this.setState({
          chats: chats
        })

        // 次の質問を表示
        this.displayNextQuestion(nextQuestionId);

        break;
    }
  }

  // 初回のみ、つまりcurrentIdには"init"が入る
  componentDidMount() {
    const initAnswer = "";
    this.selectAnswer(initAnswer, this.state.currentId);
  }

  render() {
    return (
      <section className="c-section">
        <div className="c-box">
          {/* チャットを表示するコンポーネント */}
          <Chats chats={ this.state.chats }/>

          {/* 回答郡を表示するコンポーネント */}
          <AnswersList
            answers={this.state.answers}
            select={this.selectAnswer} />
        </div>
      </section>
    );
  }
}
