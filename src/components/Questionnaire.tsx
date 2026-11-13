import { useState } from "react";
import { questions } from "../data/questions";

function Questionnaire() {
  const [currentQuestion, setCurrentQuestion] =
  useState(0);

const [answers, setAnswers] =
  useState<Record<number, string>>({});

const [showSummary, setShowSummary] =
  useState(false);

const question = questions[currentQuestion];

const handleAnswerChange = (
  value: string
) => {
  setAnswers({
    ...answers,
    [question.id]: value,
  });
};

if (showSummary) {
  return (
    <div
      style={{
        padding: "30px",
        backgroundColor: "#005DAA",
        color: "white",
        minHeight: "100vh",
      }}
    >
      <h1>Questionnaire Summary</h1>

      {questions.map((q) => (
        <div key={q.id}>
          <h3>{q.text}</h3>
          <p>{answers[q.id] || "No answer"}</p>
        </div>
      ))}
    </div>
  );
}

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

      <div
  style={{
    width: "100%",
    height: "12px",
    backgroundColor: "#D9D9D6",
    borderRadius: "10px",
    overflow: "hidden",
    marginBottom: "15px",
  }}
>
  <div
    style={{
      width: `${
        ((currentQuestion + 1) /
          questions.length) *
        100
      }%`,
      height: "100%",
      backgroundColor: "#F7A81B",
      transition:
        "width 0.3s ease",
    }}
  />
</div>

      <p>
        Question {currentQuestion + 1} of {questions.length}
      </p>

      <h2>{question.text}</h2>

{question.type === "text" ? (
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
) : (
  <div
    style={{
  display: "flex",
  justifyContent: "center",
  gap: "12px",
  flexWrap: "wrap",
  marginBottom: "20px",
}}
  >
    {[1, 2, 3, 4, 5].map(
      (score) => (
       <button
  key={score}
  onClick={() =>
    handleAnswerChange(
      score.toString()
    )
  }
  style={{
    width: "60px",
    height: "60px",
    borderRadius: "12px",
    border: "2px solid #FFFFFF",
    fontSize: "20px",
    fontWeight: "bold",
    cursor: "pointer",
    backgroundColor:
      answers[question.id] ===
      score.toString()
        ? "#F7A81B"
        : "#FFFFFF",
    color:
      answers[question.id] ===
      score.toString()
        ? "#005DAA"
        : "#005DAA",
  }}
>
  {score}
</button>
      )
    )}
  </div>
)}
      <button
  onClick={() =>
    setCurrentQuestion(
      Math.max(currentQuestion - 1, 0)
    )
  }
  style={{
    minWidth: "120px",
    height: "55px",
    borderRadius: "10px",
    border: "none",
    backgroundColor: "#D9D9D6",
    color: "#005DAA",
    fontSize: "18px",
    fontWeight: "bold",
    cursor: "pointer",
  }}
>
  Previous
</button>

<button
  onClick={() => {
    if (
      currentQuestion ===
      questions.length - 1
    ) {
      setShowSummary(true);
    } else {
      setCurrentQuestion(
        currentQuestion + 1
      );
    }
  }}
  style={{
    marginLeft: "10px",
    minWidth: "120px",
    height: "55px",
    borderRadius: "10px",
    border: "none",
    backgroundColor: "#F7A81B",
    color: "#005DAA",
    fontSize: "18px",
    fontWeight: "bold",
    cursor: "pointer",
  }}
>
  {currentQuestion ===
  questions.length - 1
    ? "Finish"
    : "Next"}
</button>

</div>
);
}

export default Questionnaire;