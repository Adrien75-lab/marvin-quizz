import React, { Component, Fragment } from "react";
import { QuizMarvel } from '../QuizMarvel';
import Levels from '../Levels';
import ProgressBar from '../ProgressBar';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import QuizOver from "../QuizOver/Index";


class Quiz extends Component {
  state = {
    levelNames: ["debutant", "confirme", "expert"],
    quizLevel: 0,
    maxQuestions: 10,
    storedQuestions: [],
    question: null,
    options: [],
    idQuestion: 0,
    btnDisabled: true,
    userAnswer: null,
    score: 0,
    showWelcomeMsg: false,
    quizEnd: false

  }

  storedDataRef = React.createRef();

  loadQuestions = level => {
    //console.log(level);
    const fetchedArrayQuiz = QuizMarvel[0].quizz[level]
    console.log(fetchedArrayQuiz);
    if (fetchedArrayQuiz.length >= this.state.maxQuestions) {
      this.storedDataRef.current = fetchedArrayQuiz;
      console.log(this.storedDataRef.current);

      const newArray = fetchedArrayQuiz.map(({ answer, ...keepRest }) => keepRest);

      this.setState({
        storedQuestions: newArray
      })
    }
    else {
      console.log("pas assez de questions")
    }
  }
  showWelcomeMsg = pseudo => {
    if (!this.state.showWelcomeMsg) {
      this.setState({
        showWelcomeMsg: true
      })


      toast.warn(`Bienvenue ${pseudo}, et bonne chance!`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "colored",
      });
    }
  }

  componentDidMount() {
    this.loadQuestions(this.state.levelNames[this.state.quizLevel])
  }

  nextQuestion = () => {
    if (this.state.idQuestion === this.state.maxQuestions - 1) {
      this.gameOver();

    } else {
      this.setState(prevState => ({
        idQuestion: prevState.idQuestion + 1
      }))
    }

    // + 1
    const goodAnswer = this.storedDataRef.current[this.state.idQuestion].answer;
    if (this.state.userAnswer === goodAnswer) {
      this.setState(prevState => ({
        score: prevState.score + 1
      }))
      toast.success('Bravo +1', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.error('Raté !', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

    }

  }



  componentDidUpdate(prevProps, prevState) {
    if (this.state.storedQuestions !== prevState.storedQuestions) {
      // console.log(this.state.storedQuestions[0].question)
      this.setState({
        question: this.state.storedQuestions[this.state.idQuestion].question,
        options: this.state.storedQuestions[this.state.idQuestion].options
      })
    }
    if (this.state.idQuestion !== prevState.idQuestion) {
      this.setState({
        question: this.state.storedQuestions[this.state.idQuestion].question,
        options: this.state.storedQuestions[this.state.idQuestion].options,
        userAnswer: null,
        btnDisabled: true

      })
    }
    if (this.props.userData.pseudo) {
      this.showWelcomeMsg(this.props.userData.pseudo)
    }
  }
  submitAnswer = selectedAnswer => {
    this.setState({
      userAnswer: selectedAnswer,
      btnDisabled: false
    })
  }

  getPercent = (maxQuest, ourScore) => (ourScore / maxQuest) * 100;

  gameOver = () => {
    const gradePercent = this.getPercent(this.state.maxQuestions, this.state.score);

    if (gradePercent >= 50) {
      this.setState({
        quizLevel: this.state.quizLevel + 1,
        percent: gradePercent,
        quizEnd: true
      })
    } else {
      this.setState({
        percent: gradePercent,
        quizEnd: true
      })

    }

  }
  render() {
    //const { pseudo } = this.props.userData;
    const displayOptions = this.state.options.map((option, index) => {
      return (
        <p key={index}
          className={`answerOptions ${this.state.userAnswer === option ? "selected" : null}`}
          onClick={() => this.submitAnswer(option)}
        >
          {option}</p>
      )
    })
    return this.state.quizEnd ? (
      <QuizOver
        ref={this.storedDataRef}
        levelNames={this.state.levelNames}
        score={this.state.score}
        maxQuestions={this.state.maxQuestions}
        quizLevel={this.state.quizLevel}
        percent={this.state.percent}

      />
    )
      :
      (
        <Fragment>
          <Levels />
          <ProgressBar
            idQuestion={this.state.idQuestion}
            maxQuestions={this.state.maxQuestions}
          />
          <h2>{this.state.question}</h2>
          {displayOptions}

          <button disabled={this.state.btnDisabled}
            className="btnSubmit"
            onClick={this.nextQuestion}
          >
            {this.state.idQuestion < this.state.maxQuestions - 1 ? "Suivant" : " terminer"}
          </button>
        </Fragment>
      )

  }
}

export default Quiz
