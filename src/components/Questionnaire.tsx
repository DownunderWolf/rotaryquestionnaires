import { useState } from "react";
import { questions } from "../data/questions";

function Questionnaire() {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [answers, setAnswers] = useState<
  Record<number, string>
>({});

  const question = questions[currentQuestion];

  const handleAnswerChange = (
  value: string
) => {
  setAnswers({
    ...answers,
    [question.id]: value,
  });
};

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

      <input
  type="text"
  value={answers[question.id] || ""}
  onChange={(e) =>
    handleAnswerChange(
      e.target.value
    )
  }
  style={{
    width: "100%",
    padding: "12px",
    marginBottom: "20px",
  }}
/>

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