import { useState } from "react";

import CreateSession from "./components/CreateSession";
import TemplateLibrary from "./components/TemplateLibrary";
import JoinSession from "./components/JoinSession";
import { questions } from "./data/questions";
import Questionnaire from "./components/Questionnaire";


function App() {
const [selectedTemplate, setSelectedTemplate] =
  useState<any>(null);

 const [currentPage, setCurrentPage] =
  useState(
    window.location.pathname.startsWith(
      "/join/"
    )
      ? "joinSession"
      : "login"
  );


  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [errorMessage, setErrorMessage] =
    useState("");

  const handleLogin = () => {
    if (
      username.toLowerCase() ===
        "andyround" &&
      password === "workshop"
    ) {
      setErrorMessage("");
      setCurrentPage("dashboard");
    } else {
      setErrorMessage(
        "Invalid Username or Password"
      );
    }
  };

  if (currentPage === "createSession") {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#005DAA",
          padding: "24px",
          boxSizing: "border-box",
        }}
      >
        <CreateSession
  templateData={selectedTemplate}
  onBack={() =>
    setCurrentPage("dashboard")
  }
  onReview={() =>
  setCurrentPage("joinSession")
}
  
/>
      </div>
    );
  }
if (currentPage === "joinSession") {
  return <JoinSession />;
}

  if (
    currentPage === "templateLibrary"
  ) {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#005DAA",
          padding: "24px",
          boxSizing: "border-box",
        }}
      >
        <TemplateLibrary
  onBack={() =>
    setCurrentPage("dashboard")
  }
  onOpenTemplate={(data) => {
  console.log(data);

  setSelectedTemplate(data);
  setCurrentPage("createSession");
}}


        />
      </div>
    );
  }

  if (currentPage === "questionnaire") {
  return <Questionnaire />;
}


  if (currentPage === "dashboard") {
    return (
      <div
        style={{
          width: "100vw",
          minHeight: "100vh",
          backgroundColor: "#005DAA",
          padding: "24px",
          boxSizing: "border-box",
          fontFamily:
            "Inter, sans-serif",
        }}
      >
        <img
          src="/images/RotaryClubLogo.svg"
          alt="Rotary Club Logo"
          style={{
            width: "60vw",
            maxWidth: "220px",
            minWidth: "120px",
            display: "block",
            margin:
              "0 auto 20px auto",
          }}
        />

        <h1
          style={{
            color: "#FFFFFF",
            textAlign: "center",
            fontFamily:
              "Montserrat, sans-serif",
            fontSize:
              "clamp(2rem, 4vw, 3rem)",
          }}
        >
          Workshop Response Hub
        </h1>

        <div
          style={{
            maxWidth: "700px",
            margin: "40px auto",
            display: "grid",
            gap: "16px",
          }}
        >
          <DashboardCard
            title="Create Session"
            description="Create a new workshop session"
            onClick={() =>
              setCurrentPage(
                "createSession"
              )
            }
          />

          <DashboardCard
            title="Template Library"
            description="View and manage saved templates"
            onClick={() =>
              setCurrentPage(
                "templateLibrary"
              )
            }
          />

          <DashboardCard
            title="Session History"
            description="Coming soon"
          />

          <DashboardCard
            title="Settings"
            description="Coming soon"
          />

          <DashboardCard
  title="Questionnaire Test"
  description="Run questionnaire prototype"
  onClick={() =>
    setCurrentPage("questionnaire")
  }
/>

          <DashboardCard
            title="Logout"
            description="Return to login screen"
            onClick={() => {
              setUsername("");
              setPassword("");
              setCurrentPage(
                "login"
              );
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        width: "100vw",
        minHeight: "100vh",
        backgroundColor: "#005DAA",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "24px",
        boxSizing: "border-box",
        fontFamily:
          "Inter, sans-serif",
      }}
    >
      <img
        src="/images/RotaryClubLogo.svg"
        alt="Rotary Club Logo"
        style={{
          width: "60vw",
          maxWidth: "220px",
          minWidth: "120px",
          marginBottom: "20px",
        }}
      />

      <h1
        style={{
          color: "#FFFFFF",
          textAlign: "center",
        }}
      >
        Workshop Response Hub
      </h1>

      <p
        style={{
          color: "#FFFFFF",
          marginBottom: "30px",
        }}
      >
        Anonymous Audience
        Engagement Platform
      </p>

      <div
        style={{
          width: "100%",
          maxWidth: "450px",
          backgroundColor: "#FFFFFF",
          borderRadius: "12px",
          padding: "35px",
        }}
      >
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) =>
            setUsername(
              e.target.value
            )
          }
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          style={inputStyle}
        />

        {errorMessage && (
          <p
            style={{
              color: "#D32F2F",
            }}
          >
            {errorMessage}
          </p>
        )}

        <button
          onClick={handleLogin}
          style={loginButton}
        >
          Login
        </button>

        <p
          style={{
            textAlign: "center",
            fontSize: "12px",
            color: "#666666",
            marginTop: "20px",
          }}
        >
          © Complete Circle
          Consulting
        </p>
      </div>
    </div>
  );
}

function DashboardCard({
  title,
  description,
  onClick,
}: {
  title: string;
  description: string;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      style={{
        background: "#FFFFFF",
        padding: "20px",
        borderRadius: "12px",
        cursor: "pointer",
      }}
    >
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "14px",
  marginBottom: "15px",
  borderRadius: "8px",
  border: "1px solid #D9D9D6",
  boxSizing: "border-box" as const,
};

const loginButton = {
  width: "100%",
  padding: "14px",
  backgroundColor: "#F7A81B",
  color: "#005DAA",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};

export default App;