import { useEffect, useState } from "react";

type Question = {
  id: number;
  question_text: string;
  question_type: string;
  options?: string[];
};

type SessionResponse = {
  session: {
    id: number;
  };
  questions: Question[];
  activeQuestion: number;
};

const pageStyle = {
  minHeight: "100vh",
  backgroundColor: "#005DAA",
  display: "flex",
  flexDirection: "column" as const,
  justifyContent: "center",
  alignItems: "center",
  padding: "24px",
};

const cardStyle = {
  backgroundColor: "#FFFFFF",
  padding: "32px",
  borderRadius: "12px",
  textAlign: "center" as const,
  maxWidth: "500px",
  width: "100%",
};

const logo = (
  <img
    src="/images/RotaryClubLogo.svg"
    alt="Rotary Club Logo"
    style={{
      width: "140px",
      display: "block",
      marginBottom: "20px",
    }}
  />
);

const footer = (
  <p
    style={{
      color: "#FFFFFF",
      marginTop: "16px",
      fontSize: "12px",
      textAlign: "center",
      opacity: 0.9,
    }}
  >
    © Complete Circle Consulting
  </p>
);

export default function JoinSession() {
  const sessionCode = window.location.pathname.split("/").pop() ?? "";

  const [question, setQuestion] = useState<Question | null>(null);
  const [sessionId, setSessionId] = useState<number | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [waiting, setWaiting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  useEffect(() => {
    async function loadQuestion() {
       console.log(
    "LOAD QUESTION RUNNING"
  );
      try {
        const response = await fetch(`/api/session/${sessionCode}`);
        const data: SessionResponse = await response.json();

       setSessionId(data.session?.id ?? null);

if (data.session?.id) {
  console.log(
    "PARTICIPANT JOIN",
    data.session.id
  );

  fetch("/api/participant/join", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sessionId: data.session.id,
    }),
  })
    .then((response) =>
      response.json()
    )
  .then((result) => {
  console.log(
    "JOIN RESULT",
    result
  );

  sessionStorage.setItem(
    "participantId",
    String(result.participantId)
  );

alert(
  "Participant ID = " +
  result.participantId
);

console.log(
  "PARTICIPANT ID SAVED",
  result.participantId
);

})
    .catch((error) =>
      console.error(
        "JOIN ERROR",
        error
      )
    );
}

setTotalQuestions(
  data.questions?.length ?? 0
);

setActiveQuestionIndex(
  data.activeQuestion ?? 0
);

        if (
          data.questions &&
          data.questions.length > 0 &&
          data.activeQuestion >= 0
        ) {
          setQuestion(data.questions[data.activeQuestion]);
        }
      } catch (error) {
        console.error("Failed to load session:", error);
      }
    }

    loadQuestion();
  }, [sessionCode]);

  useEffect(() => {
    if (!waiting || isComplete) {
      return;
    }

    const interval = setInterval(async () => {
      try {
        const response = await fetch(`/api/session/${sessionCode}`);
        const data: SessionResponse = await response.json();

        const nextQuestion = data.questions?.[data.activeQuestion];

        if (nextQuestion && nextQuestion.id !== question?.id) {
          setQuestion(nextQuestion);
          setActiveQuestionIndex(data.activeQuestion);
          setTotalQuestions(data.questions?.length ?? 0);

          setSelectedAnswer("");
          setSelectedAnswers([]);
          setWaiting(false);
        }
      } catch (error) {
        console.error("Failed to refresh session:", error);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [waiting, isComplete, sessionCode, question]);

  const options = question?.options ?? [];

  const isFinalQuestion =
    totalQuestions > 0 &&
    activeQuestionIndex === totalQuestions - 1;

  async function submitResponse() {
    if (!question || !sessionId) {
      return;
    }

    try {
      if (question.question_type === "Word Cloud") {
        const entries = selectedAnswer
          .split("\n")
          .map((item) => item.trim())
          .filter((item) => item.length > 0);

        for (const entry of entries) {
  await fetch("/api/response/save", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sessionId,
      questionId: question.id,
      responseText: entry,
      participantId: sessionStorage.getItem(
        "participantId"
      ),
    }),
  });
}

           } else {
        await fetch("/api/response/save", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sessionId,
            questionId: question.id,
            responseText:
              question.question_type === "Combination Choice"
                ? selectedAnswers.join(" + ")
                : selectedAnswer,
            participantId: sessionStorage.getItem(
              "participantId"
            ),
          }),
        });
      }

      if (isFinalQuestion) {
        setIsComplete(true);
      } else {
        setWaiting(true);
      }
    } catch (error) {
      console.error("Failed to save response:", error);
    }
  }

  if (isComplete) {
    return (
      <div style={pageStyle}>
        {logo}

        <div style={cardStyle}>
          <h1>Thank You</h1>
          <p>Your responses have been recorded.</p>
        </div>

        {footer}
      </div>
    );
  }

  if (waiting) {
    return (
      <div style={pageStyle}>
        {logo}

        <div style={cardStyle}>
          <h1>Response Received</h1>
          <p>Please keep this page open.</p>
          <p>Waiting for the next question...</p>
        </div>

        {footer}
      </div>
    );
  }

  return (
    <div style={pageStyle}>
      {logo}

      <div style={cardStyle}>
        <h1
  style={{
    color: "#005DAA",
    fontWeight: 700,
  }}
>
  Workshop Session
</h1>


        <p>Session</p>

        <h2
  style={{
    color: "#005DAA",
    fontWeight: 700,
  }}
>
  {sessionCode}
</h2>

        <h3>{question?.question_text ?? "Loading question..."}</h3>

        <div
          style={{
            textAlign: "left",
            marginTop: "20px",
          }}
        >
          {question?.question_type === "Free Text" ? (
            <textarea
              placeholder="Enter your response"
              value={selectedAnswer}
              onChange={(e) => setSelectedAnswer(e.target.value)}
              style={{
                width: "100%",
                minHeight: "120px",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #D9D9D6",
                boxSizing: "border-box",
              }}
            />
          ) : question?.question_type === "Word Cloud" ? (
            <textarea
              placeholder={`Enter one word or phrase per line

Example:
Service
Community
Friendship`}
              value={selectedAnswer}
              onChange={(e) => setSelectedAnswer(e.target.value)}
              style={{
                width: "100%",
                minHeight: "120px",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #D9D9D6",
                boxSizing: "border-box",
              }}
            />
          ) : question?.question_type === "Combination Choice" ? (
            options.map((option, index) => (
              <div key={index}>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedAnswers.includes(option)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedAnswers((prev) => [...prev, option]);
                      } else {
                        setSelectedAnswers((prev) =>
                          prev.filter((item) => item !== option)
                        );
                      }
                    }}
                  />{" "}
                  {option}
                </label>
                <br />
                <br />
              </div>
            ))
          ) : (
            options.map((option, index) => (
              <div key={index}>
                <label>
                  <input
                    type="radio"
                    name="question"
                    value={option}
                    checked={selectedAnswer === option}
                    onChange={() => setSelectedAnswer(option)}
                  />{" "}
                  {option}
                </label>
                <br />
                <br />
              </div>
            ))
          )}
        </div>

        <button
          onClick={submitResponse}
          style={{
  marginTop: "20px",
  backgroundColor: "#005DAA",
  color: "#FFFFFF",
  border: "none",
  borderRadius: "8px",
  padding: "14px 32px",
  fontSize: "18px",
  fontWeight: 600,
  cursor: "pointer",
  minWidth: "220px",
}}
        >
          Submit Answer
        </button>
      </div>

      {footer}
    </div>
  );
}