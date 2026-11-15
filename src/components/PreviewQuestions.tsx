type Question = {
  id: number;
  text: string;
  type: string;
  options: string[];
};
interface ReviewSessionProps {
  sessionName: string;
  sessionDescription: string;
  questions: Question[];
  onBack: () => void;
  onPublish: () => void;
}

export default function ReviewSession({
  sessionName,
  sessionDescription,
  questions,
  onBack,
  onPublish,
}: ReviewSessionProps) {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: "900px",
        margin: "0 auto",
        padding: "24px",
        boxSizing: "border-box",
      }}
    >
      <img
        src="/images/RotaryClubLogo.svg"
        alt="Rotary Club Logo"
        style={{
          width: "180px",
          display: "block",
          margin: "0 auto 20px auto",
        }}
      />

      <h1
        style={{
          color: "#FFFFFF",
          textAlign: "center",
          fontFamily: "Montserrat, sans-serif",
          fontSize: "clamp(2rem, 4vw, 3rem)",
        }}
      >
        Review Session
      </h1>

      <div
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: "12px",
          padding: "24px",
          marginTop: "24px",
        }}
      >
        <h2
          style={{
            color: "#005DAA",
            fontFamily: "Montserrat, sans-serif",
          }}
        >
          Session Details
        </h2>

        <div style={reviewBlock}>
          <strong>Session Name</strong>
          <p>{sessionName || "Not entered"}</p>
        </div>

        <div style={reviewBlock}>
          <strong>Session Description</strong>
          <p>{sessionDescription || "Not entered"}</p>
        </div>

        <h2
          style={{
            color: "#005DAA",
            marginTop: "40px",
            fontFamily: "Montserrat, sans-serif",
          }}
        >
          Questions
        </h2>

        {questions.map((question, index) => (
          <div
            key={question.id}
            style={{
              border: "1px solid #D9D9D6",
              borderRadius: "12px",
              padding: "20px",
              marginBottom: "20px",
            }}
          >
            <h3
              style={{
                marginTop: 0,
                color: "#005DAA",
              }}
            >
              Question {index + 1}
            </h3>

            <p>
              <strong>Question:</strong> {question.text}
            </p>

            <p>
              <strong>Type:</strong> {question.type}
            </p>

            {(question.type === "Single Choice" ||
              question.type === "Multiple Choice") && (
              <>
                <strong>Options:</strong>

                <ul>
                  {question.options.map((option, optionIndex) => (
                    <li key={optionIndex}>
                      {option || `(Option ${optionIndex + 1} empty)`}
                    </li>
                  ))}
                </ul>
              </>
            )}

            {question.type === "Rating Scale" && (
              <p>
                <strong>Scale:</strong> 1 to 5
              </p>
            )}
          </div>
        ))}

        <div
          style={{
            marginTop: "30px",
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={onBack}
            style={secondaryButton}
          >
            Back to Edit
          </button>

          <button
            onClick={onPublish}
            style={primaryButton}
          >
            Publish Session
          </button>
        </div>
      </div>
    </div>
  );
}

const reviewBlock = {
  marginBottom: "20px",
};

const primaryButton = {
  padding: "12px 18px",
  backgroundColor: "#F7A81B",
  color: "#005DAA",
  border: "none",
  borderRadius: "8px",
  fontWeight: "bold" as const,
  cursor: "pointer",
};

const secondaryButton = {
  padding: "12px 18px",
  backgroundColor: "#FFFFFF",
  color: "#005DAA",
  border: "1px solid #005DAA",
  borderRadius: "8px",
  cursor: "pointer",
};