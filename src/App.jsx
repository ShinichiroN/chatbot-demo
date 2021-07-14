import React from 'react';
import './assets/styles/style.css';
import defaultDataset from './dataset';

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
  render() {
    return (
      <section className="c-section">
        <div className="c-box">
          { this.state.currentId }
        </div>
      </section>
    );
  }
}
