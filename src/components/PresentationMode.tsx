import { useEffect, useState } from "react";
import QRCode from "react-qr-code";

interface PresentationModeProps {
  sessionCode?: string;
}

export default function PresentationMode({
  sessionCode,
}: PresentationModeProps) {

 const [activeItem, setActiveItem] =
  useState("Join Participants");

const [participantCount, setParticipantCount] =
  useState(0);

const [questionText, setQuestionText] =
  useState("");

const [_questionType, setQuestionType] =
  useState("");


const [results, setResults] =
  useState<any[]>([]);


  useEffect(() => {
  if (!sessionCode) {
    return;
  }

  async function loadSession() {
    const response = await fetch(
      `/api/session/${sessionCode}`
    );

    const data =
      await response.json();

    setParticipantCount(
      data.participantCount ?? 0
    );


const activeQuestion =
  data.questions?.[data.activeQuestion];

if (activeQuestion) {
  setQuestionText(
    activeQuestion.question_text
  );

  setQuestionType(
  activeQuestion.question_type
);

console.log(activeQuestion);

  const resultsResponse =
    await fetch(
      `/api/response/results?sessionId=${data.session.id}&questionId=${activeQuestion.id}`
    );

  const resultsData =
    await resultsResponse.json();

  setResults(
    resultsData.results || []
  );
}

  }

  loadSession();

  const interval = setInterval(
    loadSession,
    3000
  );

  return () =>
    clearInterval(interval);
}, [sessionCode]);

  const questions = [
    "Join Participants",
    "Question 1",
    "Question 2",
    "Question 3",
    "Question 4",
    "Question 5",
  ];

  if (activeItem === "Thank Participants") {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#005DAA",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "Inter, sans-serif",
          color: "#FFFFFF",
          padding: "20px",
          boxSizing: "border-box",
        }}
      >
        <img
          src="/images/RotaryClubLogo.svg"
          alt="Rotary Club Logo"
          style={{
            width: "220px",
            marginBottom: "40px",
          }}
        />

        <h1>Thank You</h1>

        <p
          style={{
            fontSize: "20px",
          }}
        >
          Thank you for participating today.
        </p>

        <p
          style={{
            marginTop: "40px",
            fontSize: "12px",
          }}
        >
          © Complete Circle Consulting
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#005DAA",
        padding: "20px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <img
        src="/images/RotaryClubLogo.svg"
        alt="Rotary Club Logo"
        style={{
          width: "220px",
          margin: "0 auto 20px auto",
          display: "block",
        }}
      />

      <div
        style={{
          flex: 1,
          border: "2px solid #808080",
          borderRadius: "12px",
          padding: "10px",
          display: "flex",
          overflow: "hidden",
          minHeight: "75vh",
        }}
      >
        {/* LEFT COLUMN */}

        <div
          style={{
            width: "30%",
            padding: "20px",
            borderRight: "1px solid #808080",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h2
            style={{
              color: "#FFFFFF",
              marginTop: 0,
            }}
          >
            Presentation Mode
          </h2>

          {questions.map((question) => (
            <div
              key={question}

   onClick={() =>
  setActiveItem(question)
}

              style={{
                padding: "14px",
                marginBottom: "8px",
                borderRadius: "8px",
                border:
                  activeItem === question
                    ? "2px solid #FFFFFF"
                    : "1px solid #808080",
                color:
                  activeItem === question
                    ? "#FFFFFF"
                    : "#C0C0C0",
                cursor: "pointer",
              }}
            >
              {question}
            </div>
          ))}

          <div style={{ flexGrow: 1 }} />

          <div
            onClick={() =>
              setActiveItem(
                "Thank Participants"
              )
            }
            style={{
              padding: "14px",
              borderRadius: "8px",
              backgroundColor: "#F7A81B",
              color: "#005DAA",
              fontWeight: "bold",
              textAlign: "center",
              cursor: "pointer",
            }}
          >
            Thank Participants
          </div>
        </div>

        {/* RIGHT COLUMN */}

        <div
          style={{
            width: "70%",
            padding: "20px",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          {activeItem ===
          "Join Participants" ? (
            <div
              style={{
                flex: 1,
                backgroundColor: "#0C6DB7",
                borderRadius: "12px",
                padding: "40px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                color: "#FFFFFF",
              }}
            >
             <h1
  style={{
    color: "#FFFFFF",
    marginBottom: "20px",
  }}
>
  Join This Session
</h1>

             <div
  style={{
    backgroundColor: "#FFFFFF",
    padding: "15px",
    borderRadius: "12px",
    margin: "20px 0",
  }}
>
                <QRCode
  value={`https://rotaryquestionnaires.pages.dev/join/${sessionCode}`}
  size={220}
/>

              </div>

<h2
  style={{
    color: "#FFFFFF",
  }}
>
  Session Code: {sessionCode}
</h2>

<h3
  style={{
    color: "#FFFFFF",
  }}
>
  Participants Joined: {participantCount}
</h3>

            </div>
          ) : (
            <>
              <div
                style={{
                  backgroundColor:
                    "#0C6DB7",
                  borderRadius: "12px",
                  padding: "20px",
                }}
              >
                <h2
                  style={{
                    color: "#FFFFFF",
                    marginTop: 0,
                  }}
                >
                  {activeItem}
                </h2>

 

                <p
  style={{
    color: "#FFFFFF",
    fontSize: "20px",
    fontWeight: 600,
  }}
>
  {questionText}
</p>
              </div>

              <div
                style={{
                  flex: 1,
                  backgroundColor:
                    "#0C6DB7",
                  borderRadius: "12px",
                  padding: "20px",
                  overflowY: "auto",
                  color: "#FFFFFF",
                }}
              >
        <h3>
  Participants Joined: {participantCount}
</h3>

              <h3>
  Responses Received: {
    results.reduce(
      (total, result) =>
        total + Number(result.total),
      0
    )
  }
</h3>

               

  {results.map((result, index) => (
<div
  key={index}
  style={{
    textAlign: "center",
    marginBottom: "10px",
    fontSize: "22px",
    fontWeight: "bold",
  }}
>
  {result.response_text}: {result.total}
</div>
))}
              </div>

              <div
                style={{
                  height: "250px",
                  backgroundColor:
                    "#0C6DB7",
                  borderRadius: "12px",
                  padding: "20px",
                  color: "#FFFFFF",
                }}
              >

<p
  style={{
    textAlign: "center",
    color: "#FFFFFF",
  }}
>
  Question Type: {_questionType}
</p>

                <h3>Visualisation</h3>

               <div
 style={{
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  alignContent: "center",
  gap: "20px",
  marginTop: "20px",
  minHeight: "160px",
}}

>
  {results.map((result, index) => (
    <span
      key={index}
      style={{
        fontSize: `${24 + result.total * 20}px`,
        fontWeight: "bold",
        color: "#FFFFFF",
        padding: "4px",
      }}
    >
      {result.response_text}
    </span>
  ))}
</div>
              </div>
            </>
          )}
        </div>
      </div>

      <p
        style={{
          color: "#FFFFFF",
          textAlign: "center",
          marginTop: "15px",
          fontSize: "12px",
        }}
      >
        © Complete Circle Consulting
      </p>
    </div>
  );
}