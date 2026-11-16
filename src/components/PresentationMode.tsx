import { useState } from "react";

export default function PresentationMode() {
  const [activeItem, setActiveItem] =
    useState("Question 1");

  const questions = [
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
          color: "#FFFFFF",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          fontFamily: "Inter, sans-serif",
        }}
      >
        <h1>Thank You</h1>
        <p>Thank you for participating today.</p>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#005DAA",
        color: "#FFFFFF",
        fontFamily: "Inter, sans-serif",
      }}
    >
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
        <h2>Presentation Mode</h2>

        {questions.map((question) => (
          <div
            key={question}
            onClick={() => setActiveItem(question)}
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
        <div
          style={{
            backgroundColor: "#0C6DB7",
            borderRadius: "12px",
            padding: "20px",
          }}
        >
          <h2>{activeItem}</h2>
          <p>
            Placeholder question text
          </p>
        </div>

        <div
          style={{
            flex: 1,
            backgroundColor: "#0C6DB7",
            borderRadius: "12px",
            padding: "20px",
            overflowY: "auto",
          }}
        >
          <h3>
            Participants Joined: 12
          </h3>

          <h3>
            Responses Received: 9
          </h3>

          <hr />

          <p>Response 1</p>
          <p>Response 2</p>
          <p>Response 3</p>
          <p>Response 4</p>
          <p>Response 5</p>
        </div>

        <div
          style={{
            height: "250px",
            backgroundColor: "#0C6DB7",
            borderRadius: "12px",
            padding: "20px",
          }}
        >
          <h3>Visualisation</h3>

          <p>
            Chart / Word Cloud
            placeholder
          </p>
        </div>
      </div>
    </div>
  );
}