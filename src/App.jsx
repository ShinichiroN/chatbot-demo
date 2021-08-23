import React from 'react';
import './assets/styles/style.css';
import defaultDataset from './dataset';
import { AnswersList, Chats, FormDialog } from './components/index';

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
    // コンポーネントにコールバック関数を渡す際のルール
    this.selectAnswer = this.selectAnswer.bind(this);

		// 再レンダリングされた時にpropsに渡すとき毎度関数が生成されてしまうのを防ぐ
		this.handleClickOpen = this.handleClickOpen.bind(this);
		this.handleClose = this.handleClose.bind(this);
  }
  
  // 次の質問を表示させるための関数
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

      // 問い合わせるが選択された時は、モーダルを表示する
      case (nextQuestionId === 'contact'):
        this.handleClickOpen();
        break;

      // nextQuestionIdの値が、先頭'https:'で始まる場合は、設定されている外部リンクに飛ばす
      case (/^https:.*/.test(nextQuestionId)):
        // aタグを生成し、そのaタグをクリックしたことにして別タブでページ遷移する
        const a = document.createElement('a');
        a.href = nextQuestionId;
        a.target = '_blank';
        a.click();
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

        console.log('chats state更新後');

        // 次の質問を表示
        setTimeout(() => { this.displayNextQuestion(nextQuestionId) },500);

        console.log('質問表示関数後');
        break;
    }
  }

	handleClickOpen = () => {
		this.setState({
			'open': true
		});
	}

	handleClose = () => {
		this.setState({
			'open': false 
		});
	}

  // 初回のみ、つまりcurrentIdには"init"が入る
  componentDidMount() {
    const initAnswer = "";
    console.log('didMount');
    this.selectAnswer(initAnswer, this.state.currentId);
  }

  componentDidUpdate(prevProps,prevState,snapshot) {
    const scrollArea = document.getElementById('scroll-area');
    if (scrollArea) {
      scrollArea.scrollTop = scrollArea.scrollHeight;
    }
  }

  render() {
    { console.log('bbb') }
    return (
      <section className="c-section">
        <div className="c-box">
          {/* チャットを表示するコンポーネント */}
          <Chats chats={ this.state.chats }/>

          {/* 回答郡を表示するコンポーネント */}
          { console.log('ddd',this.state.answers)}
          <AnswersList
            answers={this.state.answers}
            select={this.selectAnswer} />

          {/* フォームを開くためのコンポーネント*/ }
          <FormDialog open={this.state.open} handleClose={this.handleClose }/>

        </div>
      </section>
    );
  }
}
