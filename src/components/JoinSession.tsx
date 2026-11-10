import { useEffect, useState } from "react";

export default function JoinSession() {
  const sessionCode =
  window.location.pathname
    .split("/")
    .pop();

    const [question, setQuestion] =
  useState<any>(null);

  const [selectedAnswer, setSelectedAnswer] =
  useState("");

  useEffect(() => {
  async function loadQuestion() {
    const response =
      await fetch(
        `/api/session/${sessionCode}`
      );

    const data =
      await response.json();

    if (
      data.questions &&
      data.questions.length > 0
    ) {
      setQuestion(
        data.questions[0]
      );
    }
  }

  loadQuestion();
}, [sessionCode]);

const options =
  question?.options || [];

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#005DAA",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "24px",
      }}
    >
      <div
        style={{
          backgroundColor: "#FFFFFF",
          padding: "32px",
          borderRadius: "12px",
          textAlign: "center",
          maxWidth: "500px",
          width: "100%",
        }}
      >
        <h1>Workshop Response Hub</h1>

        <p>
          Connected to Session
        </p>

        <h2>{sessionCode}</h2>

    <h3>
  {question?.question_text ||
    "Loading question..."}
</h3>
<div
  style={{
    textAlign: "left",
    marginTop: "20px",
  }}
>
  {options.map(
  (option: string, index: number) => (
    <div key={index}>
      <label>
       <input
  type="radio"
  name="question1"
  value={option}
  checked={selectedAnswer === option}
  onChange={() =>
    setSelectedAnswer(option)
  }
/>
        {" "}
        {option}
      </label>

      <br />
      <br />
    </div>
  )
)}

</div>

<button
  onClick={async () => {
    const response =
      await fetch(
        "/api/response/save",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            sessionId: 1,
            questionId: 1,
            responseText:
              "Youth Programs",
          }),
        }
      );

    const result =
      await response.json();

    console.log(result);

    alert(
      "Response received. Please keep this page open. The facilitator will release the next question shortly."
    );
  }}
  style={{
    marginTop: "20px",
  }}
>
  Submit Answer
</button>
      </div>
    </div>
  );
}