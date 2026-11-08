import { useState } from "react";

export type QuestionType =
  | "Free Text"
  | "Single Choice"
  | "Multiple Choice"
  | "Rating Scale";

export interface Question {
  id: number;
  text: string;
  type: QuestionType;
  options: string[];
}

interface CreateSessionProps {
  onBack: () => void;
  onReview: () => void;
}

export default function CreateSession({
  onBack,
  onReview,
}: CreateSessionProps) {
  const [sessionName, setSessionName] = useState("");
  const [sessionDescription, setSessionDescription] =
    useState("");

  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 1,
      text: "",
      type: "Free Text",
      options: [],
    },
  ]);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: Date.now(),
        text: "",
        type: "Free Text",
        options: [],
      },
    ]);
  };

  const removeQuestion = (id: number) => {
    setQuestions(
      questions.filter(
        (question) => question.id !== id
      )
    );
  };

  const updateQuestionField = (
    id: number,
    field: keyof Question,
    value: any
  ) => {
    setQuestions(
      questions.map((question) =>
        question.id === id
          ? { ...question, [field]: value }
          : question
      )
    );
  };

  const updateOption = (
    questionId: number,
    optionIndex: number,
    value: string
  ) => {
    setQuestions(
      questions.map((question) => {
        if (question.id !== questionId)
          return question;

        const updatedOptions = [
          ...question.options,
        ];

        updatedOptions[optionIndex] = value;

        return {
          ...question,
          options: updatedOptions,
        };
      })
    );
  };

  const addOption = (questionId: number) => {
    setQuestions(
      questions.map((question) =>
        question.id === questionId
          ? {
              ...question,
              options: [...question.options, ""],
            }
          : question
      )
    );
  };

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
        Create Session
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

        <label>
          <strong>Session Name</strong>
        </label>

        <input
          type="text"
          value={sessionName}
          onChange={(e) =>
            setSessionName(e.target.value)
          }
          style={inputStyle}
        />

        <label>
          <strong>Session Description</strong>
        </label>

        <textarea
          value={sessionDescription}
          onChange={(e) =>
            setSessionDescription(
              e.target.value
            )
          }
          style={{
            ...inputStyle,
            minHeight: "100px",
          }}
        />

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
            tion.id}
            style={{
              border:
                "1px solid #D9D9D6",
              borderRadius: "12px",
              padding: "20px",
              marginBottom: "20px",
            }}
          >
            <h3
              style={{
                color: "#005DAA",
              }}
            >
              Question {index + 1}
            </h3>

            <input
              type="text"
              placeholder="Enter question"
              value={question.text}
              onChange={(e) =>
                updateQuestionField(
                  question.id,
                  "text",
                  e.target.value
                )
              }
              style={inputStyle}
            />

            <select
              value={question.type}
              onChange={(e) => {
                const selectedType =
                  e.target
                    .value as QuestionType;

                const defaultOptions =
                  selectedType ===
                    "Single Choice" ||
                  selectedType ===
                    "Multiple Choice"
                    ? ["", ""]
                    : [];

                setQuestions(
                  questions.map(
                    (currentQuestion) =>
                      currentQuestion.id ===
                      question.id
                        ? {
                            ...currentQuestion,
                            type:
                              selectedType,
                            options:
                              defaultOptions,
                          }
                        : currentQuestion
                  )
                );
              }}
              style={inputStyle}
            >
              <option>
                Free Text
              </option>
              <option>
                Single Choice
              </option>
              <option>
                Multiple Choice
              </option>
              <option>
                Rating Scale
              </option>
            </select>

            {(question.type ===
              "Single Choice" ||
              question.type ===
                "Multiple Choice") && (
              <>
                <h4>Options</h4>

                {question.options.map(
                  (
                    option,
                    optionIndex
                  ) => (
                    <input
                      key={optionIndex}
                      type="text"
                      placeholder={`Option ${
                        optionIndex + 1
                      }`}
                      value={option}
                      onChange={(e) =>
                        updateOption(
                          question.id,
                          optionIndex,
                          e.target.value
                        )
                      }
                      style={inputStyle}
                    />
                  )
                )}

                <button
                  onClick={() =>
                    addOption(
                      question.id
                    )
                  }
                  style={
                    secondaryButton
                  }
                >
                  Add Option
                </button>
              </>
            )}

            {question.type ===
              "Rating Scale" && (
              <p>
                Default scale:
                1–5
              </p>
            )}

            {questions.length >
              1 && (
              <button
                onClick={() =>
                  removeQuestion(
                    question.id
                  )
                }
                style={
                  removeButton
                }
              >
                Remove Question
              </button>
            )}
          </div>
        ))}

        <button
          onClick={addQuestion}
          style={primaryButton}
        >
          Add Question
        </button>

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
            Back
          </button>

          <button
            onClick={onReview}
            style={primaryButton}
          >
            Review Session
          </button>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "8px",
  marginBottom: "16px",
  borderRadius: "8px",
  border: "1px solid #D9D9D6",
  boxSizing: "border-box" as const,
};

const primaryButton = {
  padding: "12px 18px",
  backgroundColor: "#F7A81B",
  color: "#005DAA",
  border: "none",
  borderRadius: "8px",
  fontWeight: "bold",
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

const removeButton = {
  padding: "12px 18px",
  backgroundColor: "#D32F2F",
  color: "#FFFFFF",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};