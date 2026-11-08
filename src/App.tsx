function App() {
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
          style={{
            width: "100%",
            padding: "14px",
            marginBottom: "15px",
            borderRadius: "8px",
            border: "1px solid #D9D9D6",
            boxSizing: "border-box",
            fontSize: "16px",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          style={{
            width: "100%",
            padding: "14px",
            marginBottom: "25px",
            borderRadius: "8px",
            border: "1px solid #D9D9D6",
            boxSizing: "border-box",
            fontSize: "16px",
          }}
        />

        <button
          style={{
            width: "100%",
            padding: "14px",
            backgroundColor: "#F7A81B",
            color: "#005DAA",
            border: "none",
            borderRadius: "8px",
            fontWeight: "bold",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default App;