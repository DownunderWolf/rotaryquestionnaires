import { useState } from "react";
import { questions } from "../data/questions";

function Questionnaire() {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const question = questions[currentQuestion];

  return (
    <div
      style={{
        padding: "30px",
        color: "white",
        backgroundColor: "#005DAA",
        minHeight: "100vh",
      }}
    >
      <h1>Questionnaire Test</h1>

      <p>
        Question {currentQuestion + 1} of {questions.length}
      </p>

      <h2>{question.text}</h2>

      <button
        onClick={() =>
          setCurrentQuestion(
            Math.max(currentQuestion - 1, 0)
          )
        }
      >
        Previous
      </button>

      <button
        onClick={() =>
          setCurrentQuestion(
            Math.min(
              currentQuestion + 1,
              questions.length - 1
            )
          )
        }
        style={{ marginLeft: "10px" }}
      >
        Next
      </button>
    </div>
  );
}

export default Questionnaire;