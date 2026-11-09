import { useState } from "react";
import CreateSession from "./components/CreateSession";
import TemplateLibrary from "./components/TemplateLibrary";

function App() {
  const [currentPage, setCurrentPage] =
    useState("login");

  const [selectedTemplate, setSelectedTemplate] =
    useState<any>(null);

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

  const handleOpenTemplate = (
    templateData: any
  ) => {
    setSelectedTemplate(templateData);
    setCurrentPage("createSession");
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
            alert(
              "Review Session page will be connected next."
            )
          }
        />
      </div>
    );
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
          onOpenTemplate={
            handleOpenTemplate
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
                "