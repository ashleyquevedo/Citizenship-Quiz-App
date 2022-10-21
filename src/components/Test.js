import React, { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import { CSSTransition } from "react-transition-group";
import {
  fetchRandomQuestion,
  setRandomQuestion,
} from "../redux/singleQuestion";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./Home";
import { firestore } from "./Home";

function Test(props) {
  const [questionCount, setQuestionCount] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  // currently unused: incorrectCount:
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [showFront, setShowFront] = useState(true);
  const [showScore, setShowScore] = useState(false);
  const [showFinish, setShowFinish] = useState(false);
  const [scoreButtons, setScoreButtons] = useState(true);
  const grq = props.getRandomQuestion;
  const clear = props.clearRandomQuestion;
  const [user] = useAuthState(auth);

  useEffect(() => {
    setShowScore(false);
    return () => {
      clear();
      setShowScore(false);
    };
  }, [clear]);

  const handleClick = useCallback(async () => {
    grq();
    setQuestionCount(questionCount + 1);
    setShowFront(true);
    setScoreButtons(true);
  }, [questionCount, grq]);

  const handleScoring = useCallback(async () => {
    setShowScore(true);
    let testsList = firestore.collection("tests");
    await testsList.add({
      uid: user.uid,
      date: firebase.firestore.Timestamp.fromDate(new Date()).toDate(),
      score: correctCount,
    });
    setShowFinish(false);
  }, [correctCount, user.uid]);

  const handleNew = useCallback(async () => {
    setQuestionCount(0);
    setShowFront(true);
    setScoreButtons(true);
    setShowScore(false);
    setCorrectCount(0);
    setIncorrectCount(0);
    clear();
  }, [clear]);

  const question = props.randomQuestion;

  return (
    <div>
      <div className="test-container">
        {questionCount === 0 && !showScore && (
          <button onClick={handleClick}>➡️ Begin Test ➡️</button>
        )}
        {question.id && (
          <CSSTransition in={showFront} timeout={500} classNames="flip">
            <div className="card-container">
              <div className="test-card-front">
                <h3>Question {questionCount}/10</h3>
                <p>Topic: {question.topic}</p>
                <div className="question">
                  <h2>{question.question}</h2>
                </div>
                <button
                  className="flip-button"
                  onClick={() => {
                    setShowFront((curr) => !curr);
                  }}
                >
                  See Answer!
                </button>
              </div>
              <div className="test-card-back">
                <h3>Question {questionCount}/10</h3>
                <p>{question.question}</p>
                <div className="question-back">
                  <h2>{question.answer}</h2>
                </div>
                {scoreButtons ? (
                  <span className="scoring-buttons">
                    <button
                      className="correct-button"
                      onClick={() => {
                        setCorrectCount((correctCount) => correctCount + 1);
                        setScoreButtons(false);
                        if (questionCount === 10) {
                          setShowFinish(true);
                        }
                      }}
                    >
                      ✅ Correct ✅
                    </button>
                    <button
                      className="incorrect-button"
                      onClick={() => {
                        setIncorrectCount(
                          (incorrectCount) => incorrectCount + 1
                        );
                        setScoreButtons(false);
                        if (questionCount === 10) {
                          setShowFinish(true);
                        }
                      }}
                    >
                      ❌ Incorrect ❌
                    </button>
                  </span>
                ) : showFinish ? (
                  <button
                    className="finish-button scoring-buttons"
                    onClick={handleScoring}
                  >
                    Finish Test
                  </button>
                ) : (
                  !showScore && (
                    <button onClick={handleClick} className="scoring-buttons">
                      ➡️ See Next Question ➡️
                    </button>
                  )
                )}
              </div>
            </div>
          </CSSTransition>
        )}
      </div>
      {showScore && (
        <div className="score">
          <h2>{correctCount}/10</h2>
          <button className="new-button" onClick={handleNew}>
            New Test
          </button>
        </div>
      )}
    </div>
  );
}

const mapState = (state) => {
  return {
    randomQuestion: state.question,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getRandomQuestion: () => dispatch(fetchRandomQuestion()),
    clearRandomQuestion: () => dispatch(setRandomQuestion({})),
  };
};

export default connect(mapState, mapDispatch)(Test);
