import { useEffect, useState } from "react";
import { saveTemplate } from "../services/saveTemplate";
import QRCode from "react-qr-code";

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
  templateData?: any;
}

export default function CreateSession({
  onBack,
  onReview,
  templateData,
}: CreateSessionProps) {
  const [sessionName, setSessionName] = useState("");
  const [sessionDescription, setSessionDescription] =
    useState("");
    const [sessionCode, setSessionCode] =
  useState("");
  const [responseCount, setResponseCount] =
  useState(0);
  const [results, setResults] =
  useState<any[]>([]);
   
  useEffect(() => {
  console.log("AUTO REFRESH STARTED");

  const interval = setInterval(() => {
    console.log("AUTO REFRESH TICK");
    loadResults();
  }, 5000);

  return () =>
    clearInterval(interval);
}, []);
  
  async function loadResults() {
  const response =
    await fetch(
      "/api/response/results"
    );

  const data =
    await response.json();

console.log("RESULTS DATA");
console.log(data);

  setResults(
    data.results || []
  );
}

  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 1,
      text: "",
      type: "Free Text",
      options: [],
    },
  ]);

  const [isSavingTemplate, setIsSavingTemplate] =
    useState(false);

  const [saveMessage, setSaveMessage] = useState("");
  useEffect(() => {
    console.log(templateData);
    
  if (!templateData) return;

  setSessionName(
    templateData.template?.template_name || ""
  );

  setSessionDescription(
    templateData.template?.description || ""
  );

  if (
    templateData.questions &&
    templateData.questions.length > 0
  ) {
    setQuestions(
      templateData.questions.map(
        (question: any, index: number) => ({
          id: question.id || index + 1,
          text: question.question_text,
          type:
            question.question_type as QuestionType,
          options:
            question.options || [],
        })
      )
    );
  }
}, [templateData]);

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
        ? {
            ...question,
            [field]: value,
          }
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
        if (question.id !== questionId) {
          return question;
        }

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
              options: [
                ...question.options,
                "",
              ],
            }
          : question
      )
    );
  };

  const handleSaveTemplate = async () => {
    try {
      setSaveMessage("");

      if (!sessionName.trim()) {
        setSaveMessage(
          "Please enter a session name before saving."
        );
        return;
      }

      setIsSavingTemplate(true);

      await saveTemplate({
        templateName: sessionName,
        description: sessionDescription,
        questions: questions.map((question) => ({
          text: question.text,
          type: question.type,
          options: question.options,
        })),
      });

      setSaveMessage(
        "Template saved successfully."
      );
    } catch (error) {
      console.error(error);

      setSaveMessage(
        "Unable to save template. Please try again."
      );
    } finally {
      setIsSavingTemplate(false);
    }
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
            fontFamily:
              "Montserrat, sans-serif",
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
          <strong>
            Session Description
          </strong>
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
            fontFamily:
              "Montserrat, sans-serif",
          }}
        >
          Questions
        </h2>

        {questions.map(
          (question, index) => (
            <div
              key={question.id}
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
                      (
                        currentQuestion
                      ) =>
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
                        key={
                          optionIndex
                        }
                        type="text"
                        placeholder={`Option ${
                          optionIndex + 1
                        }`}
                        value={option}
                        onChange={(
                          e
                        ) =>
                          updateOption(
                            question.id,
                            optionIndex,
                            e.target
                              .value
                          )
                        }
                        style={
                          inputStyle
                        }
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
                  Default scale: 1-5
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
          )
        )}

        <button
          onClick={addQuestion}
          style={primaryButton}
        >
          Add Question
        </button>

        {saveMessage && (
          <div
            style={{
              marginTop: "20px",
              padding: "12px",
              borderRadius: "8px",
              backgroundColor:
                saveMessage.includes(
                  "successfully"
                )
                  ? "#E8F5E9"
                  : "#FFEBEE",
              color:
                saveMessage.includes(
                  "successfully"
                )
                  ? "#2E7D32"
                  : "#C62828",
              fontWeight: "bold",
            }}
          >
            {saveMessage}
          </div>
        )}

{sessionCode && (
  <div
    style={{
      backgroundColor: "#FFFFFF",
      padding: "16px",
      borderRadius: "8px",
      marginTop: "20px",
      marginBottom: "20px",
      fontWeight: "bold",
    }}
  >
    Session Code: {sessionCode}

    <br />
    <br />

    Responses Received: {responseCount}

    <br />
  <br />

  <QRCode
    value={`https://rotaryquestionnaires.pages.dev/join/${sessionCode}`}
    size={180}
  />
  </div>
)}

{results.length > 0 && (
  <div
    style={{
      backgroundColor: "#FFFFFF",
      padding: "16px",
      borderRadius: "8px",
      marginBottom: "20px",
    }}
  >
    <h3>Results</h3>

    {results.map(
      (result: any, index: number) => (
        <div key={index}>
          {result.response_text}
          {" : "}
          {result.total}
        </div>
      )
    )}
  </div>
)}

<br />
<br />
Join URL:
https://rotaryquestionnaires.pages.dev/join/{sessionCode}
        <div
          style={{
            marginTop: "30px",
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={
              handleSaveTemplate
            }
            disabled={
              isSavingTemplate
            }
            style={{
              ...secondaryButton,
              opacity:
                isSavingTemplate
                  ? 0.7
                  : 1,
            }}
          >
            {isSavingTemplate
              ? "Saving..."
              : "Save Template"}
          </button>

          <button
            onClick={onBack}
            style={
              secondaryButton
            }
          >
            Back
          </button>

      <button
  onClick={async () => {
    const response = await fetch(
      "/api/session/start",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          templateId:
            templateData?.template?.id,
          audienceName:
            sessionName,
        }),
      }
    );

    const result =
      await response.json();

   setSessionCode(
  result.sessionCode
);
const countResponse =
  await fetch(
    "/api/response/count"
  );

const countData =
  await countResponse.json();

setResponseCount(
  countData.count
);
await loadResults();

alert(
  `Session Code: ${result.sessionCode}`
);
    console.log(
      "START SESSION TEST"
    );
    console.log(result);
  }}
  style={primaryButton}
>
  Start Session
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

const removeButton = {
  padding: "12px 18px",
  backgroundColor: "#D32F2F",
  color: "#FFFFFF",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};