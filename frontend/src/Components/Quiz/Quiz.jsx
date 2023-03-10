import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./Quiz.css";
import { useTimer } from "react-timer-hook";

const Quiz = ({ expiryTimestamp }) => {
  const now = new Date();
  now.setSeconds(now.getSeconds() + 30);
  const { seconds, restart, pause } = useTimer({
    expiryTimestamp,
    onExpire: () => setIsStart(false),
  });

  const [question, setQuestion] = useState([]);
  const [questionNo, setQuestionNo] = useState(1);
  const [selectedAns, setSelectedAns] = useState(false);
  const [isStart, setIsStart] = useState(false);
  const [isAnsFalse, setIsAnsFalse] = useState(false);

  const ansRef1 = useRef(null);
  const ansRef2 = useRef(null);
  const ansRef3 = useRef(null);
  const ansRef4 = useRef(null);
  var ansRef = useRef(null);

  const playAgain = () => {
    setQuestionNo(1);
    setIsAnsFalse(false);
    setSelectedAns(false);
    loadQuestion();
  };

  const loadQuestion = async () => {
    if (questionNo <= 14) {
      axios
        .get(
          `https://quiz-app-backend-as2c.onrender.com/api/question/${questionNo}`
        )
        .then((res) => {
          setQuestion(res.data);
          setIsStart(true);
          const time = new Date();
          time.setSeconds(time.getSeconds() + 30);
          restart(time);
        })
        .catch((e) => console.log(e));
    }
  };

  const checkAns = (ans, ref) => {
    if (!selectedAns) {
      setSelectedAns(true);
      pause();
      ansRef = ref;
      ansRef.current.style.transition = "0.2s";
      ansRef.current.style.backgroundColor = "#ff6700";

      setTimeout(() => {
        if (ans.isTrue) {
          ansRef.current.style.transition = "0.2s";
          ansRef.current.style.backgroundColor = "#4bb543";
          setSelectedAns(true);
          setTimeout(() => {
            setQuestionNo((num) => {
              if (num < 15) return num + 1;
              else return 15;
            });
            setSelectedAns(false);
            loadQuestion();
            ansRef.current.style.backgroundColor = "#f3ecff";
          }, 1000);
        } else {
          setQuestionNo(1);
          ansRef.current.style.backgroundColor = "#F32013";
          setIsAnsFalse(true);
        }
      }, 1000);
    }
  };

  const timerSvg = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="50"
      height="50"
      fill="currentColor"
      className="bi bi-stopwatch-fill"
      viewBox="0 0 16 16"
    >
      <path d="M6.5 0a.5.5 0 0 0 0 1H7v1.07A7.001 7.001 0 0 0 8 16a7 7 0 0 0 5.29-11.584.531.531 0 0 0 .013-.012l.354-.354.353.354a.5.5 0 1 0 .707-.707l-1.414-1.415a.5.5 0 1 0-.707.707l.354.354-.354.354a.717.717 0 0 0-.012.012A6.973 6.973 0 0 0 9 2.071V1h.5a.5.5 0 0 0 0-1h-3zm2 5.6V9a.5.5 0 0 1-.5.5H4.5a.5.5 0 0 1 0-1h3V5.6a.5.5 0 1 1 1 0z" />
    </svg>
  );
  return (
    <>
      {isStart ? (
        <div className="quiz_wrapper">
          {!isAnsFalse ? (
            <div className="quiz_section">
              <div className="quiz_timer">
                <button className="timer_button">
                  {timerSvg}
                  {`${seconds}`}
                </button>
                <button className="timer_button">
                  {`Qs. ${questionNo}/15`}
                </button>
              </div>
              <div className="quiz_question">
                <p>{`${questionNo}. ${question.question}`}</p>
              </div>
              <div className="quiz_ans">
                <div className="first_qs">
                  <div
                    ref={ansRef1}
                    onClick={() => checkAns(question.a, ansRef1)}
                    style={{ backgroundColor: " #f3ecff" }}
                    className="q1 a"
                  >
                    <p className="option">A.</p>
                    <p className="qs">{question.a.ans}</p>
                  </div>
                  <div
                    ref={ansRef2}
                    onClick={() => checkAns(question.b, ansRef2)}
                    style={{ backgroundColor: " #f3ecff" }}
                    className="q1 b"
                  >
                    <p className="option">B .</p>
                    <p className="qs">{question.b.ans}</p>
                  </div>
                </div>
                <div className="second_qs">
                  <div
                    ref={ansRef3}
                    onClick={() => checkAns(question.c, ansRef3)}
                    style={{ backgroundColor: " #f3ecff" }}
                    className="q1 c"
                  >
                    <p className="option"> C.</p>
                    <p className="qs">{question.c.ans}</p>
                  </div>
                  <div
                    ref={ansRef4}
                    onClick={() => checkAns(question.d, ansRef4)}
                    style={{ backgroundColor: " #f3ecff" }}
                    className="q1 d"
                  >
                    <p className="option">D.</p>
                    <p className="qs">{question.d.ans}</p>
                  </div>
                </div>
                <div className="created_name_wrapper">
                  <a href="https://www.instagram.com/antony_jaison__/">
                    Antony Jaison
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="quiz_section try_again_section">
                <h3>Oops! That’s not quite right</h3>
                <p>Don’t worry, you’ll get the next one!</p>
                <button
                  onClick={() => {
                    setQuestionNo(1);
                    playAgain();
                  }}
                  className="next_button try_again_btn"
                >
                  Play Again
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="quiz_wrapper">
          <button
            onClick={() => {
              setQuestionNo(1);
              loadQuestion();
            }}
            className="start_button"
          >
            Start Quiz
          </button>
        </div>
      )}
    </>
  );
};

export default Quiz;
