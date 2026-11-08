import { useState } from "react";
import CreateSession from "./components/CreateSession";

function App() {
  const [currentPage, setCurrentPage] = useState("login");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = () => {
    if (
      username.toLowerCase() === "andyround" &&
      password === "workshop"
    ) {
      setErrorMessage("");
      setCurrentPage("dashboard");
    } else {
      setErrorMessage("Invalid Username or Password");
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
          onBack={() => setCurrentPage("dashboard")}
          onReview={() =>
            alert(
              "Review Session page will be connected next."
            )
          }
        />
      </div>
    );
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
          fontFamily: "Inter, sans-serif",
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
              setCurrentPage("createSession")
            }
          />

          <DashboardCard
            title="Session History"
            description="View previous workshops and responses"
          />

          <DashboardCard
            title="Settings"
            description="Configure application settings"
          />

          <DashboardCard
            title="Logout"
            description="Return to login screen"
            onClick={() => {
              setUsername("");
              setPassword("");
              setCurrentPage("login");
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
        overflowX: "hidden",
        backgroundColor: "#005DAA",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "24px",
        boxSizing: "border-box",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <img
        src="/images/RotaryClubLogo.svg"
        alt="Rotary Club Logo"
        style={{
          width: "60vw",
          maxWidth: "220px",
          minWidth: "120px",
          height: "auto",
          marginBottom: "20px",
        }}
      />

      <h1
        style={{
          color: "#FFFFFF",
          fontSize: "clamp(2rem, 4vw, 3rem)",
          marginBottom: "10px",
          fontFamily: "Montserrat, sans-serif",
          textAlign: "center",
        }}
      >
        Workshop Response Hub
      </h1>

      <p
        style={{
          color: "#FFFFFF",
          marginBottom: "30px",
          opacity: 0.9,
          textAlign: "center",
        }}
      >
        Anonymous Audience Engagement Platform
      </p>

      <div
        style={{
          width: "100%",
          maxWidth: "450px",
          backgroundColor: "#FFFFFF",
          borderRadius: "12px",
          padding: "35px",
          boxShadow: "0 8px 30px rgba(0,0,0,0.20)",
        }}
      >
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          style={inputStyle}
        />

        {errorMessage && (
          <p
            style={{
              color: "#D32F2F",
              fontSize: "14px",
              marginBottom: "15px",
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
        borderRadius: "12px",
        padding: "20px",
        cursor: "pointer",
        boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
      }}
    >
      <h3
        style={{
          margin: 0,
          color: "#005DAA",
          fontFamily: "Montserrat, sans-serif",
        }}
      >
        {title}
      </h3>

      <p
        style={{
          marginTop: "8px",
          color: "#666666",
        }}
      >
        {description}
      </p>
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
  fontSize: "16px",
};

const loginButton = {
  width: "100%",
  padding: "14px",
  backgroundColor: "#F7A81B",
  color: "#005DAA",
  border: "none",
  borderRadius: "8px",
  fontWeight: "bold" as const,
  fontSize: "16px",
  cursor: "pointer",
};

export default App;