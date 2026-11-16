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
          <div
            style={{
              backgroundColor: "#0C6DB7",
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
              }}
            >
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
              color: "#FFFFFF",
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
              color: "#FFFFFF",
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