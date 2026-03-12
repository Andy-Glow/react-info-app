import { useState } from "react";
import questions from "./QuizData/Questions";
import BackToPortfolioButton from "../../app/BackToPortfolioButton/BackToPortfolioButton";
import styles from "./Quiz.module.scss";

function Result({ correct }) {
  return (
    <div className={styles.result}>
      <img src='https://cdn-icons-png.flaticon.com/512/2278/2278992.png' />
      <h2>
        Вы отгадали {correct} ответа из {questions.length}{" "}
      </h2>
      <button onClick={() => window.location.reload()}>Попробовать снова</button>
    </div>
  );
}

function Game({ question, onClickVariant, step }) {
  const percentage = Math.round((step / questions.length) * 100);
  return (
    <>
      <div className={styles.progress}>
        <div style={{ width: `${percentage}%` }} className={styles.inner}></div>
      </div>
      <h1>{question.title}</h1>
      <ul>
        {question.variants.map((text, index) => (
          <li onClick={() => onClickVariant(index)} key={text}>
            {text}
          </li>
        ))}
      </ul>
    </>
  );
}

function Quiz() {
  const [step, setStep] = useState(0);
  const [correct, setCorrect] = useState(0);
  const question = questions[step];

  const onClickVariant = (index) => {
    console.log(step, index);
    setStep(step + 1);

    if (index === question.correct) {
      setCorrect(correct + 1);
    }
  };

  return (
    <div className={styles.quizPage}>
      <div className={styles.backBtn}>
        <BackToPortfolioButton />
      </div>
      <div className={styles.quiz}>
        {step !== questions.length ? (
          <Game step={step} question={question} onClickVariant={onClickVariant} />
        ) : (
          <Result correct={correct} />
        )}
      </div>
    </div>
  );
}

export default Quiz;
